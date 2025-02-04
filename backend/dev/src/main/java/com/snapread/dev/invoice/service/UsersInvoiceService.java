package com.snapread.dev.invoice.service;

import com.snapread.dev.auth.model.User;
import com.snapread.dev.auth.repository.UserRepository;
import com.snapread.dev.invoice.controller.request.InvoiceDTO;
import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.repository.InvoiceRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
public class UsersInvoiceService {

    private final InvoiceService invoiceService;
    private final UserRepository userRepository;
    private final InvoiceRepository invoiceRepository;

    public UsersInvoiceService(InvoiceService invoiceService, UserRepository userRepository, InvoiceRepository invoiceRepository) {
        this.invoiceService = invoiceService;
        this.userRepository = userRepository;
        this.invoiceRepository = invoiceRepository;
    }

    public Invoice generateUsersInvoices(String username, MultipartFile file) throws IOException {
        try {
            User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User with username " + username + " is not found"));

            Invoice invoice = invoiceService.createInvoice(file);

            List<Invoice> invoices = new ArrayList<>();
            invoices.add(invoice);
            user.setInvoices(invoices);

            invoice.setUser(user);
            invoiceRepository.save(invoice);
            userRepository.save(user);
            return invoice;

        } catch (Exception e) {
            throw new IOException(e.getMessage());
        }
    }

    @Transactional
    public List<Invoice> getAllUsersInvoices(String username) {
        try {
            User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User with username " + username + " is not found"));
            return user.getInvoices();
        } catch (Exception e) {
            throw new RuntimeException("Error getting invoices for user: " + e.getMessage());
        }
    }

    public Invoice getUsersInvoiceById(String username, Long invoiceId) {
        try {
            User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchElementException("User with username " + username + " is not found"));
            List<Invoice> invoices = user.getInvoices();
            Invoice foundInvoice = null;

            for (Invoice inv : invoices) {
                if (inv.getId().equals(invoiceId)) {
                    foundInvoice = inv;
                    break;
                }
            }
            if (foundInvoice == null) {
                throw new NoSuchElementException("Invoice with id " + invoiceId + " not found for user " + username);
            }

            return foundInvoice;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }


    public Invoice editInvoice(InvoiceDTO invoiceDTO) {
        try {
            Invoice invoice = invoiceRepository.findById(invoiceDTO.getId()).orElseThrow(() -> new NoSuchElementException("Invoice with id " + invoiceDTO.getId() + " not found"));

            invoice.setSupplierName(invoiceDTO.getSupplierName());
            invoice.setSupplierNip(invoiceDTO.getSupplierNip());
            invoice.setSupplierAddress(invoiceDTO.getSupplierAddress());
            invoice.setInvoiceNumber(invoiceDTO.getInvoiceNumber());
            invoice.setAmountNet(invoiceDTO.getAmountNet());
            invoice.setAmountVat(invoiceDTO.getAmountVat());
            invoice.setAmountGross(invoiceDTO.getAmountGross());
            List<String> vatList = new ArrayList<String>(invoiceDTO.getVatPercent());
            invoice.setVatPercent(vatList);
            invoice.setDescription(invoiceDTO.getDescription());
            invoice.setInvoiceDate(invoiceDTO.getInvoiceDate());
            invoice.setDueDate(invoiceDTO.getDueDate());


            return invoiceRepository.save(invoice);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}