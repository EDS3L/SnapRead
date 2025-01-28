package com.snapread.dev.invoice.service;

import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.repository.InvoiceRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceSorting {

    private final InvoiceRepository invoiceRepository;


    public InvoiceSorting(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }


    public List<Invoice> sortASCDSC(List<Invoice> invoices, Sort.Direction direction, String value) {
        if (direction == Sort.Direction.ASC || direction == Sort.Direction.DESC) {
            if (value != null && !value.isEmpty()) {

                Comparator<Invoice> comparator = createComparator(value);

                if (direction == Sort.Direction.DESC) {
                    comparator = comparator.reversed();
                }


                return invoices.stream()
                        .sorted(comparator)
                        .collect(Collectors.toList());

            } else {
                throw new IllegalArgumentException("Value cannot be null or empty");
            }
        }
        throw new IllegalArgumentException("Invalid sort direction: " + direction);
    }

    private Comparator<Invoice> createComparator(String fieldName) {
        return switch (fieldName) {
            case "id" -> Comparator.comparing(Invoice::getId);
            case "supplierName" -> Comparator.comparing(Invoice::getSupplierName);
            case "amountNet" -> Comparator.comparing(Invoice::getAmountNet);
            case "amountVat" -> Comparator.comparing(Invoice::getAmountVat);
            case "amountGross" -> Comparator.comparing(Invoice::getAmountGross);
            case "createdAt" -> Comparator.comparing(Invoice::getCreatedAt);
            default -> throw new IllegalArgumentException("Invalid field name: " + fieldName);
        };
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
