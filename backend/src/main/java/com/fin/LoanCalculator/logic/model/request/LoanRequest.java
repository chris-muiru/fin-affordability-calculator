package com.fin.LoanCalculator.logic.model.request;

public record LoanRequest(
        Double grossIncome,
        Double deductions
) {
}
