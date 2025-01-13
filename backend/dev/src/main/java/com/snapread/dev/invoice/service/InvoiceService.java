package com.snapread.dev.invoice.service;

import com.fasterxml.jackson.core.type.TypeReference;
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
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final PythonService pythonService;
    private final JsonService jsonService;
    private final ObjectMapper objectMapper;
    @Value("${prompt.InvoicePath}")
    private String promptPath;

    public InvoiceService(InvoiceRepository invoiceRepository, PythonService pythonService, JsonService jsonService, ObjectMapper objectMapper) {
        this.invoiceRepository = invoiceRepository;
        this.pythonService = pythonService;
        this.jsonService = jsonService;
        this.objectMapper = objectMapper;
    }

    public Invoice createInvoice(MultipartFile file) {
        File tempFile = null;
        try {
            String responseBody = pythonService.doOcr(
                    file, promptPath
            );
            String extractJson = jsonService.extractJSON(responseBody);
            JsonNode jsonNode = jsonService.parseJson(extractJson);

            Invoice invoice = objectMapper.treeToValue(jsonNode, Invoice.class);
            invoice.setCreated_at(LocalDate.now());

            tempFile = pythonService.getTempFile();
            byte[] imageBytes = Files.readAllBytes(tempFile.toPath());
            invoice.setInvoice_image(imageBytes);

            return invoiceRepository.save(invoice);
        } catch (Exception e) {
            throw new RuntimeException("Error creating invoice" + e);
        }finally {
            if (tempFile != null && tempFile.exists()) {
                if (!tempFile.delete()) {
                    System.err.println("Failed to delete temp file: " + tempFile.getAbsolutePath());
                }
            }
        }
    }


    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }


}