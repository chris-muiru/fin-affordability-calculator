package com.fin.LoanCalculator.logic.model.response;

import lombok.Builder;

import java.util.List;

@Builder
public record LoanResponse(
        Double netIncome,
        Double maxLoan,
        boolean eligible,
        String message,
        List<String> nextStep
) {
}
