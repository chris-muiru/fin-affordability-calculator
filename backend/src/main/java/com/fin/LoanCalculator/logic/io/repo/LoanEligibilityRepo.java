package com.fin.LoanCalculator.logic.io.repo;

import com.fin.LoanCalculator.logic.io.entity.LoanEligibilityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanEligibilityRepo extends JpaRepository<LoanEligibilityEntity, Long> {
    LoanEligibilityEntity findByEligible(boolean eligible);
}
