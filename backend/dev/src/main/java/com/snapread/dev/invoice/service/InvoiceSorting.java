package com.snapread.dev.invoice.service;

import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.repository.InvoiceRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceSorting {

    private final InvoiceRepository invoiceRepository;


    public InvoiceSorting(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }


    public List<Invoice> invoiceByID(Sort.Direction direction, String value) {
        if (direction == Sort.Direction.ASC || direction == Sort.Direction.DESC) {
            if (value != null && !value.isEmpty()) {
                return invoiceRepository.findAll(Sort.by(direction, value));
            } else {
                throw new IllegalArgumentException("Value cannot be null or empty");
            }
        }
        throw new IllegalArgumentException("Invalid sort direction: " + direction);
    }

    public List<Invoice> sortCompanyByName(LocalDate startDate, LocalDate endDate, String supplierName, String supplierNip) {


        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
        if (supplierNip == null || supplierNip.isEmpty()) {
            return invoiceRepository.findByCreatedAtBetweenAndSupplierNameContainingIgnoreCaseOrderBySupplierNameAsc(
                    startDate, endDate, supplierName);
        }

        return invoiceRepository.findByCreatedAtBetweenAndSupplierNameContainingIgnoreCaseAndSupplierNipContainingIgnoreCaseOrderBySupplierNameAsc(
                startDate, endDate, supplierName, supplierNip);
    }
}
