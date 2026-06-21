package com.propms.repository;

import com.propms.entity.CustomerDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerDocumentRepository
        extends JpaRepository<CustomerDocument, Integer> {

    List<CustomerDocument>
    findByCustomerCustomerId(Integer customerId);
}
