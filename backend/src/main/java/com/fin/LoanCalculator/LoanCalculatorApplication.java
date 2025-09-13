package com.fin.LoanCalculator;

import com.fin.LoanCalculator.logic.io.entity.LoanEligibilityEntity;
import com.fin.LoanCalculator.logic.io.repo.LoanEligibilityRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class LoanCalculatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoanCalculatorApplication.class, args);

    }

    @Bean
    CommandLineRunner seedDatabase(LoanEligibilityRepo repo) {
        return _ -> {
            if (repo.count() == 0) {

                // Eligible next steps
                repo.save(
                        LoanEligibilityEntity.builder()
                                .eligible(true)
                                .message("Congratulations! You qualify for a loan with Fin Africa")
                                .nextSteps(List.of(
                                        "Contact our loan officers to start your application",
                                        "Prepare your income documentation",
                                        "Choose your preferred loan terms"
                                ))
                                .build()

                );

                // Not eligible tips
                repo.save(
                        LoanEligibilityEntity.builder()
                                .eligible(false)
                                .message(
                                        "Unfortunately, your current income doesn't meet our minimum loan requirements.")
                                .nextSteps(List.of(
                                        "Reduce monthly deductions where possible",
                                        "Increase your income through side jobs or salary review",
                                        "Reapply after 3–6 months once financial situation improves"
                                ))
                                .build()

                );

            }
        };
    }

}
