package com.snapread.dev.invoice.controller;

import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.service.InvoiceService;
import com.snapread.dev.invoice.service.InvoiceSorting;
import com.snapread.dev.invoice.service.UsersInvoiceService;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/invoice/sort")
public class SortInvoiceController {


    private final InvoiceSorting invoiceSorting;
    private final UsersInvoiceService usersInvoiceService;

    public SortInvoiceController(InvoiceSorting invoiceSorting, UsersInvoiceService usersInvoiceService) {
        this.invoiceSorting = invoiceSorting;
        this.usersInvoiceService = usersInvoiceService;
    }

    @PostMapping("")
    public ResponseEntity<?> sortById(@RequestBody List<Invoice> invoiceList, @RequestParam Sort.Direction direction, @RequestParam String value) {
        try {
            return ResponseEntity.ok(invoiceSorting.sortASCDSC(invoiceList, direction, value));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("company")
    public ResponseEntity<?> sortByCompany(
            @RequestParam(required = false, defaultValue = "") String supplierName,
            @RequestParam(required = false, defaultValue = "") String supplierNip,
            @RequestParam(required = false, defaultValue = "2025-01-01") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false, defaultValue = "#{T(java.time.LocalDate).now()}") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam String username)
    {

        try {
            if(supplierName == null && supplierNip == null && startDate == null && endDate == null) {
                return ResponseEntity.ok(usersInvoiceService.getAllUsersInvoices(username));
            } else {
                return ResponseEntity.ok(invoiceSorting.sortCompanyByName(startDate, endDate, supplierName, supplierNip));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
