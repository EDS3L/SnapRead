package com.snapread.dev.invoice.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.service.InvoiceService;
import com.snapread.dev.ocr.service.JsonService;
import com.snapread.dev.ocr.service.PythonService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping(value = "" ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> doOcr(@RequestParam("file")MultipartFile file) {
        try {
            return ResponseEntity.ok(invoiceService.createInvoice(file));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("getAll")
    public List<Invoice> getAll() {
        return invoiceService.getAllInvoices();
    }
}
