package com.snapread.dev.invoice.service;

import com.snapread.dev.auth.model.User;
import com.snapread.dev.auth.repository.UserRepository;
import com.snapread.dev.invoice.model.Invoice;
import com.snapread.dev.invoice.repository.InvoiceRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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

    public Invoice getUsersInvoiceById(Long invoiceId) {
        try {
            return invoiceRepository.findById(invoiceId).orElseThrow(() -> new NoSuchElementException("Invoice with id " + invoiceId + " is not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error getting invoice: " + e.getMessage());
        }
    }
}