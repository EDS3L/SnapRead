package com.snapread.dev.invoice.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.repository.InvoiceRepository;
import com.snapread.dev.ocr.service.JsonService;
import com.snapread.dev.ocr.service.PythonService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Base64;
import java.util.Map;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final PythonService pythonService;
    private final JsonService jsonService;
    private final ObjectMapper objectMapper;
    private final Cloudinary cloudinary;
    @Value("${prompt.InvoicePath}")
    private String promptPath;

    public InvoiceService(InvoiceRepository invoiceRepository, PythonService pythonService, JsonService jsonService, ObjectMapper objectMapper, @Value("${cloudinary.url}") String cloudinaryUrl) {
        this.invoiceRepository = invoiceRepository;
        this.pythonService = pythonService;
        this.jsonService = jsonService;
        this.objectMapper = objectMapper;
        this.cloudinary = new Cloudinary(cloudinaryUrl);
    }

    public Invoice createInvoice(MultipartFile file) {
        File tempFile = null;
        try {
            String responseBody = pythonService.doOcr(file, promptPath);
            String extractJson = jsonService.extractJSON(responseBody);
            JsonNode jsonNode = jsonService.parseJson(extractJson);

            Invoice invoice = objectMapper.treeToValue(jsonNode, Invoice.class);
            invoice.setCreated_at(LocalDate.now());

            String url = saveImg();
            invoice.setInvoice_image(url);

            return invoice;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private String saveImg() throws IOException {
        try {
            Map uploadResult = cloudinary.uploader().upload(convertToPDF(pythonService.getTempFile()), ObjectUtils.emptyMap());
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new IOException("Error uploading file" + e.getMessage());
        }
    }


    private byte[] convertToPDF(File file) throws IOException {
        if (file.getName().endsWith(".pdf")) {
            return Files.readAllBytes(Path.of(file.getPath()));
        }

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document doc = new Document();
            PdfWriter writer = PdfWriter.getInstance(doc, outputStream);
            doc.open();

            if (isImage(file)) {
                Image img = Image.getInstance(Files.readAllBytes(file.toPath()));

                float documentWidth = doc.getPageSize().getWidth() - doc.leftMargin() - doc.rightMargin();
                float documentHeight = doc.getPageSize().getHeight() - doc.topMargin() - doc.bottomMargin();

                float scaleFactor = Math.min(documentWidth / img.getWidth(), documentHeight / img.getHeight());
                img.scalePercent(scaleFactor * 100);

                System.out.println(img.getColorspace());
                img.setAlignment(Image.ALIGN_CENTER)  ;
                img.simplifyColorspace();
                System.out.println(img.getColorspace());


                doc.add(img);

            } else {
                String content = Files.readString(Path.of(file.getPath()));
                doc.add(new Paragraph(content));
            }
            doc.close();
            writer.close();

            return outputStream.toByteArray();

        } catch (DocumentException e) {
            throw new RuntimeException(e.getMessage());
        }

    }


    private boolean isImage(File file) {
        String[] imageExtensions = {"jpg", "png", "jpeg", "tiff"};
        String fileName = file.getName().toLowerCase();
        for (String ext : imageExtensions) {
            if (fileName.endsWith(ext)) {
                return true;
            }
        }
        return false;
    }


}