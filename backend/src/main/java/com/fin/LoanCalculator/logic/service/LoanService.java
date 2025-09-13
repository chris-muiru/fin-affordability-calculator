package com.fin.LoanCalculator.logic.service;

import com.fin.LoanCalculator.logic.dto.LoanDTO;

public interface LoanService {

    LoanDTO calculateLoanEligibility(LoanDTO loanDTO);
}
