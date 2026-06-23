package com.propms.repository;

import com.propms.entity.CustomerStage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerStageRepository
        extends JpaRepository<CustomerStage, Integer> {

    CustomerStage findByCustomerCustomerId(
            Integer customerId
    );
}
