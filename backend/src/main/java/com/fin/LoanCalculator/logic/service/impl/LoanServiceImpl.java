package com.fin.LoanCalculator.logic.service.impl;

import com.fin.LoanCalculator.logic.dto.LoanDTO;
import com.fin.LoanCalculator.logic.io.entity.LoanEligibilityEntity;
import com.fin.LoanCalculator.logic.io.repo.LoanEligibilityRepo;
import com.fin.LoanCalculator.logic.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class LoanServiceImpl implements LoanService {
    private final LoanEligibilityRepo loanEligibilityRepo;

    @Override
    public LoanDTO calculateLoanEligibility(LoanDTO loanDTO) {

//        net_income = gross_income - deductions
//        max_loan = 0.5 * net_income
//        eligible = max_loan >= 20000

        Double netIncome = Math.max(0, loanDTO.grossIncome() - loanDTO.totalDeduction());
        Double maxLoan = (0.5 * netIncome);
        boolean eligible = maxLoan >= 20000;


        LoanEligibilityEntity loanEligibilityEntity = loanEligibilityRepo.findByEligible(eligible);

        return LoanDTO.builder()
                .netIncome(netIncome)
                .maxLoan(maxLoan)
                .eligible(eligible)
                .message(loanEligibilityEntity.getMessage())
                .nextStep(loanEligibilityEntity.getNextSteps())
                .build();

    }
}
