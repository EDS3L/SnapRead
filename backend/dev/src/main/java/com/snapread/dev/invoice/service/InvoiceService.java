package com.snapread.dev.invoice.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.repository.InvoiceRepository;
import com.snapread.dev.ocr.service.JsonService;
import com.snapread.dev.ocr.service.PythonService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
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

    public InvoiceService(InvoiceRepository invoiceRepository, PythonService pythonService, JsonService jsonService, ObjectMapper objectMapper,
                          @Value("${cloudinary.url}") String cloudinaryUrl) {
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
            byte[] imageBytes = Files.readAllBytes(pythonService.getTempFile().toPath());
            Map uploadResult = cloudinary.uploader().upload(imageBytes, ObjectUtils.emptyMap());
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            throw new IOException("Error uploading file" + e.getMessage());
        }
    }





}