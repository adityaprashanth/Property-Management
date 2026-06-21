package com.propms.controller;

import com.propms.entity.Payment;
import com.propms.repository.PaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
//@CrossOrigin(origins = "http://localhost:3000")
// @CrossOrigin(origins = {
//     "http://localhost:3000",
//     "http://192.168.0.65:3000"
// })
public class PaymentController {

    private final PaymentRepository paymentRepository;

    public PaymentController(
            PaymentRepository paymentRepository
    ) {
        this.paymentRepository = paymentRepository;
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {

        return ResponseEntity.ok(
                paymentRepository.findAll()
        );
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Payment>> getPaymentsByCustomer(
        @PathVariable Integer customerId) {

        return ResponseEntity.ok(
                paymentRepository.findByCustomerCustomerId(customerId)
        );
    }
}
