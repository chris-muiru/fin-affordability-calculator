package com.fin.LoanCalculator.logic.controller;

import com.fin.LoanCalculator.logic.dto.LoanDTO;
import com.fin.LoanCalculator.logic.model.request.LoanRequest;
import com.fin.LoanCalculator.logic.model.response.LoanResponse;
import com.fin.LoanCalculator.logic.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class LoanController {
    private final LoanService loanService;

    @PostMapping("loan")
    public LoanResponse getLoanEligibility(@RequestBody LoanRequest loanRequest) {
        LoanDTO loanDTO = loanService.calculateLoanEligibility(LoanDTO.builder()
                .grossIncome(loanRequest.grossIncome())
                .totalDeduction(loanRequest.deductions())
                .build());

        return LoanResponse.builder()
                .eligible(loanDTO.eligible())
                .netIncome(loanDTO.netIncome())
                .maxLoan(loanDTO.maxLoan())
                .message(loanDTO.message())
                .nextStep(loanDTO.nextStep())
                .build();
    }
}
