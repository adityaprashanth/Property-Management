package com.propms.controller;

import com.propms.entity.Payment;
import com.propms.repository.PaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import java.time.LocalDate;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @PutMapping("/{id}")
    public Payment updatePayment(
            @PathVariable Integer id,
            @RequestBody Payment updates) {

        Payment payment =
                paymentRepository.findById(id)
                        .orElseThrow();

        payment.setAmount(updates.getAmount());
        payment.setType(updates.getType());
        payment.setWay(updates.getWay());
        payment.setPaymentDate(
                updates.getPaymentDate()
        );
        // if (updates.getPaymentDate() != null) {
        //     payment.setPaymentDate(
        //         updates.getPaymentDate()
        //     );
        // }

        return paymentRepository.save(payment);
    }

    @PostMapping
    public Payment addPayment(
            @RequestBody Payment payment) {

        return paymentRepository.save(payment);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(
            @PathVariable Integer id) {

        paymentRepository.deleteById(id);
    }

    // @GetMapping("/filter")
    // public ResponseEntity<List<Payment>> filterPayments(
    //         @RequestParam Integer customerId,
    //         @RequestParam String fromDate,
    //         @RequestParam String toDate
    // ) {
    //     return ResponseEntity.ok(
    //             paymentRepository
    //                     .findByCustomerCustomerIdAndPaymentDateBetween(
    //                             customerId,
    //                             LocalDate.parse(fromDate),
    //                             LocalDate.parse(toDate)
    //                     )
    //     );
    // }
    @GetMapping("/filter")
    public ResponseEntity<List<Payment>> filterPayments(
            @RequestParam Integer customerId,
            @RequestParam String fromDate,
            @RequestParam String toDate
    ) {
        LocalDateTime start =
                LocalDate.parse(fromDate)
                        .atStartOfDay();
        LocalDateTime end =
                LocalDate.parse(toDate)
                        .atTime(23, 59, 59);
        return ResponseEntity.ok(
                paymentRepository
                        .findByCustomerCustomerIdAndPaymentDateBetween(
                                customerId,
                                start,
                                end
                        )
        );
    }

}
