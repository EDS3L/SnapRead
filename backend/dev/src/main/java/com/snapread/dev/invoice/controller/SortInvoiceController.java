package com.snapread.dev.invoice.controller;

import com.snapread.dev.invoice.service.InvoiceSorting;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/invoice/sort")
public class SortInvoiceController {


    private final InvoiceSorting invoiceSorting;

    public SortInvoiceController(InvoiceSorting invoiceSorting) {
        this.invoiceSorting = invoiceSorting;
    }

    @GetMapping("")
    public ResponseEntity<?> sortById(@RequestParam Sort.Direction direction, @RequestParam String value) {
        try {
            return ResponseEntity.ok(invoiceSorting.invoiceByID(direction, value));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("company")
    public ResponseEntity<?> sortByCompany(
            @RequestParam(required = false, defaultValue = "") String supplierName,
            @RequestParam(required = false, defaultValue = "") String supplierNip,
            @RequestParam(required = false, defaultValue = "2025-01-01") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false, defaultValue = "#{T(java.time.LocalDate).now()}") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        try {
            return ResponseEntity.ok(invoiceSorting.sortCompanyByName(startDate, endDate, supplierName, supplierNip));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
