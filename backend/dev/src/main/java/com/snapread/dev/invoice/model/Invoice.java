package com.snapread.dev.invoice.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.snapread.dev.auth.model.User;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String invoiceNumber;
    private String supplierName;
    private String supplierNip;
    private String supplierAddress;
    private double amountNet;
    private double amountVat;
    private double amountGross;
    private List<String> vatPercent;
    private String invoiceDate;
    private String dueDate;
    private String description;
    @Lob
    private String invoiceImage;
    private LocalDate createdAt;
    @Lob
    private String attachedImage;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


    public Invoice() {
    }

    public Invoice(String invoiceNumber, String supplierName, String supplierNip, String supplierAddress, double amountNet, double amountVat, double amountGross, String invoiceDate, String dueDate, String description) {
        this.invoiceNumber = invoiceNumber;
        this.supplierName = supplierName;
        this.supplierNip = supplierNip;
        this.supplierAddress = supplierAddress;
        this.amountNet = amountNet;
        this.amountVat = amountVat;
        this.amountGross = amountGross;
        this.invoiceDate = invoiceDate;
        this.dueDate = dueDate;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getSupplierNip() {
        return supplierNip;
    }

    public void setSupplierNip(String supplierNip) {
        this.supplierNip = supplierNip;
    }

    public String getSupplierAddress() {
        return supplierAddress;
    }

    public void setSupplierAddress(String supplierAddress) {
        this.supplierAddress = supplierAddress;
    }

    public double getAmountNet() {
        return amountNet;
    }

    public void setAmountNet(double amountNet) {
        this.amountNet = amountNet;
    }

    public double getAmountVat() {
        return amountVat;
    }

    public void setAmountVat(double amountVat) {
        this.amountVat = amountVat;
    }

    public double getAmountGross() {
        return amountGross;
    }

    public void setAmountGross(double amountGross) {
        this.amountGross = amountGross;
    }

    public List<String> getVatPercent() {
        return vatPercent;
    }

    public void setVatPercent(List<String> vatPercent) {
        this.vatPercent = vatPercent;
    }

    public String getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(String invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInvoiceImage() {
        return invoiceImage;
    }

    public void setInvoiceImage(String invoiceImage) {
        this.invoiceImage = invoiceImage;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getAttachedImage() {
        return attachedImage;
    }

    public void setAttachedImage(String attachedImage) {
        this.attachedImage = attachedImage;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
