package com.snapread.dev.invoice.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.service.InvoiceService;
import com.snapread.dev.invoice.service.UsersInvoiceService;
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

    private final UsersInvoiceService usersInvoiceService;


    public InvoiceController(UsersInvoiceService usersInvoiceService) {
        this.usersInvoiceService = usersInvoiceService;
    }

    @PostMapping(value = "" ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> doOcr(@RequestParam("file")MultipartFile file,@RequestParam String username) {
        try {
            return ResponseEntity.ok(usersInvoiceService.generateUsersInvoices(username, file));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


    @GetMapping("/usersInvoice")
    public ResponseEntity<?> getUsersInvoice(@RequestParam String username) {
        try {
            return ResponseEntity.ok(usersInvoiceService.getAllUsersInvoices(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/invoiceByID")
    public ResponseEntity<?> getInvoiceById(@RequestParam String username, @RequestParam Long id) {
        try {
            return ResponseEntity.ok(usersInvoiceService.getUsersInvoiceById(username,id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
