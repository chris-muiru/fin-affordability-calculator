import { computeLoanEligibility } from "@/app/resource/trans"
import { TLoanRequest } from "@/app/resource/type"
import { useMutation } from "@tanstack/react-query"

export const useLoanCalculatorMutation = () => {
	return useMutation({
		mutationFn: (data: TLoanRequest) => {
			return computeLoanEligibility(data)
		},
	})
}
