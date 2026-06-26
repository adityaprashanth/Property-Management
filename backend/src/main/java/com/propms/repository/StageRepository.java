package com.propms.repository;

import com.propms.entity.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository
        extends JpaRepository<Stage, Integer> {
}
