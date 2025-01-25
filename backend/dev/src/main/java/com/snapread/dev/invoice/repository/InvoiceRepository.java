package com.snapread.dev.invoice.repository;

import com.snapread.dev.invoice.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long> {

    List<Invoice> findBySupplierNameContainingIgnoreCaseOrderBySupplierNameAsc(String value);
}
