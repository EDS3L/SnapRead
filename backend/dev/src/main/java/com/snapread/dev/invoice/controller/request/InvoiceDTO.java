package com.snapread.dev.invoice.controller.request;

import jakarta.persistence.Lob;

import java.time.LocalDate;
import java.util.List;

public class InvoiceDTO {

    private final Long id;
    private final String supplierName;
    private final String supplierNip;
    private final String supplierAddress;
    private final String invoiceNumber;
    private final double amountNet;
    private final double amountVat;
    private final double amountGross;
    private final List<String> vatPercent;
    private final String description;
    private final String invoiceDate;
    private final String dueDate;

    public InvoiceDTO(Long id, String supplierName, String supplierNip, String supplierAddress, String invoiceNumber, double amountNet, double amountVat, double amountGross, List<String> vatPercent, String description, String invoiceDate, String dueDate) {
        this.id = id;
        this.supplierName = supplierName;
        this.supplierNip = supplierNip;
        this.supplierAddress = supplierAddress;
        this.invoiceNumber = invoiceNumber;
        this.amountNet = amountNet;
        this.amountVat = amountVat;
        this.amountGross = amountGross;
        this.vatPercent = vatPercent;
        this.description = description;
        this.invoiceDate = invoiceDate;
        this.dueDate = dueDate;
    }

    public Long getId() {
        return id;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public String getSupplierNip() {
        return supplierNip;
    }

    public String getSupplierAddress() {
        return supplierAddress;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public double getAmountNet() {
        return amountNet;
    }

    public double getAmountVat() {
        return amountVat;
    }

    public double getAmountGross() {
        return amountGross;
    }

    public List<String> getVatPercent() {
        return vatPercent;
    }

    public String getDescription() {
        return description;
    }

    public String getInvoiceDate() {
        return invoiceDate;
    }

    public String getDueDate() {
        return dueDate;
    }
}
