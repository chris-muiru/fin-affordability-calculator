package com.fin.LoanCalculator.logic.io.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Builder
@AllArgsConstructor
@Entity
@Table(name = "sys_loan_eligibility")
public class LoanEligibilityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private List<String> nextSteps;
    private boolean eligible;
    private String message;
}
