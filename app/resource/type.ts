import z from "zod"

export const LoanRequestSchema = z.object({
	grossIncome: z
		.number()
		.refine((value) => typeof value === "number", {
			message: "Gross income must be a number",
		})
		.min(1, { message: "Gross income must be greater than 0" }),
	deductions: z.number().min(0, { message: "Deductions must be 0 or greater" }),
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

// TS type
export type TLoanRequest = z.infer<typeof LoanRequestSchema>
export type TLoanResponse = z.infer<typeof LoanReponseSchema>
