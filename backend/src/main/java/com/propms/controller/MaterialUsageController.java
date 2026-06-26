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

    @PostMapping
    public MaterialUsage addMaterial(
            @RequestBody MaterialUsage m) {

        return repository.save(m);
    }

    @PutMapping("/{id}")
    public MaterialUsage updateMaterial(
            @PathVariable Integer id,
            @RequestBody MaterialUsage updates
    ) {
        MaterialUsage m =
            repository
            .findById(id)
            .orElseThrow();

        m.setMaterialName(
            updates.getMaterialName()
        );
        m.setQuantity(
            updates.getQuantity()
        );
        m.setUnit(
            updates.getUnit()
        );
        return repository.save(m);
    }

    @DeleteMapping("/{id}")
    public void deleteMaterial(
            @PathVariable Integer id
    ) {
        repository.deleteById(id);
    }

}
