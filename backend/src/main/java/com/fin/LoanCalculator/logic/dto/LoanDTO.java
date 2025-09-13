package com.fin.LoanCalculator.logic.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record LoanDTO(
        Double grossIncome,
        Double totalDeduction,
        Double netIncome,
        Double maxLoan,
        boolean eligible,
        String message,
        List<String> nextStep

) {

}
