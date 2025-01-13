package com.snapread.dev.invoice.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("invoice_number")
    private String invoice_number;
    @JsonProperty("supplier_name")
    private String supplier_name;
    @JsonProperty("supplier_nip")
    private String supplier_nip;
    //    @JsonProperty("supplier_address")
    private String supplier_address;
    @JsonProperty("amount_net")
    private String amount_net;
    @JsonProperty("amount_vat")
    private String amount_vat;
    @JsonProperty("amount_gross")
    private String amount_gross;
    private List<String> vat_percent;
    @JsonProperty("invoice_date")
    private String invoice_date;
    @JsonProperty("due_date")
    private String due_date;
    //    @JsonProperty("description")
    private String description;
    @Lob
    private byte[] invoice_image;
    private LocalDate created_at;
    @Lob
    private byte[] attached_image;

    public Invoice() {
    }

    public Invoice(String invoice_number, String supplier_name, String supplier_nip, String supplier_address, String amount_net, String amount_vat, String amount_gross, String invoice_date, String due_date, String description) {
        this.invoice_number = invoice_number;
        this.supplier_name = supplier_name;
        this.supplier_nip = supplier_nip;
        this.supplier_address = supplier_address;
        this.amount_net = amount_net;
        this.amount_vat = amount_vat;
        this.amount_gross = amount_gross;
        this.invoice_date = invoice_date;
        this.due_date = due_date;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvoice_number() {
        return invoice_number;
    }

    public void setInvoice_number(String invoice_number) {
        this.invoice_number = invoice_number;
    }

    public String getSupplier_name() {
        return supplier_name;
    }

    public void setSupplier_name(String supplier_name) {
        this.supplier_name = supplier_name;
    }

    public String getSupplier_nip() {
        return supplier_nip;
    }

    public void setSupplier_nip(String supplier_nip) {
        this.supplier_nip = supplier_nip;
    }

    public String getSupplier_address() {
        return supplier_address;
    }

    public void setSupplier_address(String supplier_address) {
        this.supplier_address = supplier_address;
    }

    public String getAmount_net() {
        return amount_net;
    }

    public void setAmount_net(String amount_net) {
        this.amount_net = amount_net;
    }

    public String getAmount_vat() {
        return amount_vat;
    }

    public void setAmount_vat(String amount_vat) {
        this.amount_vat = amount_vat;
    }

    public String getAmount_gross() {
        return amount_gross;
    }

    public void setAmount_gross(String amount_gross) {
        this.amount_gross = amount_gross;
    }

    public List<String> getVat_percent() {
        return vat_percent;
    }

    public void setVat_percent(List<String> vat_percent) {
        this.vat_percent = vat_percent;
    }

    public String getInvoice_date() {
        return invoice_date;
    }

    public void setInvoice_date(String invoice_date) {
        this.invoice_date = invoice_date;
    }

    public String getDue_date() {
        return due_date;
    }

    public void setDue_date(String due_date) {
        this.due_date = due_date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getInvoice_image() {
        return invoice_image;
    }

    public void setInvoice_image(byte[] invoice_image) {
        this.invoice_image = invoice_image;
    }

    public LocalDate getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDate created_at) {
        this.created_at = created_at;
    }

    public byte[] getAttached_image() {
        return attached_image;
    }

    public void setAttached_image(byte[] attached_image) {
        this.attached_image = attached_image;
    }
}
