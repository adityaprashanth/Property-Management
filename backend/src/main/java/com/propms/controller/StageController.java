package com.propms.controller;

import com.propms.entity.CustomerStage;
import com.propms.repository.CustomerStageRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stages")
@CrossOrigin(origins = "http://localhost:3000")
public class StageController {

    private final CustomerStageRepository repository;

    public StageController(
            CustomerStageRepository repository
    ) {
        this.repository = repository;
    }

    @GetMapping("/customer/{customerId}")
    public CustomerStage getStage(
            @PathVariable Integer customerId
    ) {
        return repository.findByCustomerCustomerId(
                customerId
        );
    }
}
