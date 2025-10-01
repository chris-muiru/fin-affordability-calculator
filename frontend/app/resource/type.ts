import { z } from "zod"

export const LoanRequestSchema = z.object({
	grossIncome: z
		.preprocess((val) => val, z.any()) // after pre-processing,accpet any type
		.refine(
			// custom validator
			(val) =>
				!isNaN(Number(val)) && val !== "" && val !== null && val !== undefined,
			{
				message: "Gross income cannot be empty and must be a valid number",
			}
		)
		.transform((val) => Number(val))
		.refine((val) => val > 0, {
			message: "Gross income must be greater than 0",
		}),
	deductions: z
		.preprocess((val) => val, z.any())
		.refine(
			(val) =>
				!isNaN(Number(val)) && val !== "" && val !== null && val !== undefined,
			{
				message: "Deductions cannot be empty and must be a valid number",
			}
		)
		.transform((val) => Number(val))
		.refine((val) => val > -1, {
			message: "Deductions must be greater or equal to 0",
		}),
})

export const LoanReponseSchema = z
	.object({
		netIncome: z.number(),
		maxLoan: z.number(),
		eligible: z.boolean(),
		message: z.string(),
		nextStep: z.array(z.string()).min(1),
	})
	.strict()
 // convert to number after validation
// TS type
export type TLoanRequest = z.infer<typeof LoanRequestSchema>
export type TLoanResponse = z.infer<typeof LoanReponseSchema>
