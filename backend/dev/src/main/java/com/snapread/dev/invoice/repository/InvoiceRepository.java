package com.snapread.dev.invoice.repository;

import com.snapread.dev.invoice.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long> {
    List<Invoice> findByCreatedAtBetweenAndSupplierNameContainingIgnoreCaseAndSupplierNipContainingIgnoreCaseOrderBySupplierNameAsc(
            LocalDate startDate, LocalDate endDate, String supplierName, String supplierNip);

}
