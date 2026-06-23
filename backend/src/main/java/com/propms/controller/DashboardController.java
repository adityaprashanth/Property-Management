package com.propms.controller;

import com.propms.dto.DashboardStatsDto;
import com.propms.repository.CustomerRepository;
import com.propms.repository.PaymentRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final CustomerRepository customerRepository;
    private final PaymentRepository paymentRepository;

    public DashboardController(
            CustomerRepository customerRepository,
            PaymentRepository paymentRepository
    ) {
        this.customerRepository = customerRepository;
        this.paymentRepository = paymentRepository;
    }

    @GetMapping("/stats")
    public DashboardStatsDto getStats() {

        Long totalCustomers =
                customerRepository.countActualCustomers();

        Double totalPayments =
                paymentRepository.getTotalPayments();

        Long projectsRunning =
                customerRepository.countActualCustomers();

        return new DashboardStatsDto(
                totalCustomers,
                totalPayments,
                projectsRunning
        );
    }
}
