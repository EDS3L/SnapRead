package com.snapread.dev.invoice.controller;

import com.snapread.dev.invoice.service.InvoiceSorting;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> sortByCompany(@RequestParam String value) {
        return ResponseEntity.ok(invoiceSorting.sortCompanyByName(value));
    }
}
