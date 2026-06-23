package com.propms.controller;

import com.propms.entity.MaterialUsage;
import com.propms.repository.MaterialUsageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialUsageController {

    private final MaterialUsageRepository repository;

    public MaterialUsageController(
            MaterialUsageRepository repository
    ) {
        this.repository = repository;
    }

    @GetMapping("/customer/{customerId}")
    public List<MaterialUsage> getMaterials(
            @PathVariable Integer customerId
    ) {
        return repository.findByCustomerCustomerId(
                customerId
        );
    }
}
