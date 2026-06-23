package com.propms.repository;

import com.propms.entity.MaterialUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialUsageRepository
        extends JpaRepository<MaterialUsage, Integer> {

    List<MaterialUsage> findByCustomerCustomerId(
            Integer customerId
    );
}
