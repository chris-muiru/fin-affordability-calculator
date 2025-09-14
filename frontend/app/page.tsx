"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Loader2, Calculator } from "lucide-react"
import { useLoanCalculatorMutation } from "@/app/resource/hook"
import {
	LoanRequestSchema,
	TLoanRequest,
	TLoanResponse,
} from "@/app/resource/type"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { formatCurrency } from "@/app/util"
import { sleep } from "@/lib/utils"

interface CalculationResult {
	net_income: number
	max_loan: number
	eligible: boolean
	message: string
}

export default function AffordabilityCalculator() {
	// mutation functions
	const loanCalculatorMutation = useLoanCalculatorMutation()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoanRequestSchema),
		mode: "onChange",
	})

	const [result, setResult] = useState<TLoanResponse | null>(null)
	const [loading, setLoading] = useState(false)
	const handleLoanCalculation = async (data: TLoanRequest) => {
		try {
			setLoading(true)
			// await sleep(3000) // simulate network delay because the API is too fast
			const result: TLoanResponse = await loanCalculatorMutation.mutateAsync(
				data
			)
			setResult(result)
		} catch (e) {
			console.error("Error occurred during loan calculation:", e)
			toast.error("Error", {
				description: "An Error occurred while calculating loan eligibility:",
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-2xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center mb-4">
						<div className="w-12 h-12 bg-[#00A859] rounded-lg flex items-center justify-center">
							<Calculator className="w-6 h-6 text-white" />
						</div>
					</div>
					<h1 className="text-3xl font-bold text-slate-800 mb-2">
						Loan Affordability Calculator
					</h1>
					<p className="text-slate-600 text-lg">
						Discover how much you can borrow with Fin Africa
					</p>
				</div>

				{/* Calculator Form */}
				<Card className="mb-8 shadow-lg border-0">
					<CardHeader className="bg-white rounded-t-lg">
						<CardTitle className="text-slate-800">
							Calculate Your Loan Eligibility
						</CardTitle>
						<CardDescription className="text-slate-600">
							Enter your financial details to see your maximum loan amount
						</CardDescription>
					</CardHeader>
					<CardContent className="p-6 bg-white rounded-b-lg">
						<form
							onSubmit={handleSubmit(handleLoanCalculation)}
							className="space-y-6"
						>
							<div className="space-y-2">
								<Label
									htmlFor="grossIncome"
									className="text-slate-700 font-medium"
								>
									Gross Monthly Income (KES)
								</Label>
								<Input
									id="grossIncome"
									type="number"
									placeholder="e.g., 80,000"
									className={`h-12 text-lg ${
										errors.grossIncome ? "border-red-500" : "border-slate-300"
									}`}
									disabled={loading}
									{...register("grossIncome")}
									// prevent scientific notation and +/-
									onKeyDown={(e) => {
										if (["e", "E", "+", "-"].includes(e.key)) {
											e.preventDefault()
										}
									}}
									onPaste={(e) => e.preventDefault()}
								/>
								{errors.grossIncome && (
									<p className="text-red-500 text-sm">
										{errors.grossIncome.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="deductions"
									className="text-slate-700 font-medium"
								>
									Total Monthly Deductions (KES)
								</Label>
								<Input
									id="deductions"
									type="number"
									placeholder="e.g., 25,000"
									className={`h-12 text-lg ${
										errors.deductions ? "border-red-500" : "border-slate-300"
									}`}
									{...register("deductions")}
									// prevent scientific notation and +/-
									onKeyDown={(e) => {
										if (["e", "E", "+", "-"].includes(e.key)) {
											e.preventDefault()
										}
									}}
									onPaste={(e) => e.preventDefault()}
									disabled={loading}
								/>
								{errors.deductions && (
									<p className="text-red-500 text-sm">
										{errors.deductions.message}
									</p>
								)}
								<p className="text-slate-500 text-sm">
									Include taxes, insurance, existing loans, and other monthly
									commitments
								</p>
							</div>

							<Button
								type="submit"
								disabled={loading}
								className="w-full h-12 bg-[#00A859] hover:bg-[#008A4A] text-white font-semibold text-lg rounded-lg transition-colors duration-200"
							>
								{loading ? (
									<>
										<Loader2 className="w-5 h-5 mr-2 animate-spin" />
										Calculating...
									</>
								) : (
									"Calculate My Loan Eligibility"
								)}
							</Button>
						</form>
					</CardContent>
				</Card>

				{/* Results */}
				{result && (
					<Card
						className={`shadow-lg border-0 animate-in slide-in-from-bottom-4 duration-500 ${
							result.eligible
								? "border-l-4 border-l-[#00A859]"
								: "border-l-4 border-l-red-500"
						}`}
					>
						<CardHeader className="pb-4">
							<div className="flex items-center space-x-3">
								{result.eligible ? (
									<CheckCircle className="w-8 h-8 text-[#00A859]" />
								) : (
									<XCircle className="w-8 h-8 text-red-500" />
								)}
								<div>
									<CardTitle
										className={`text-xl ${
											result.eligible ? "text-[#00A859]" : "text-red-600"
										}`}
									>
										{result.eligible ? "You're Eligible!" : "Not Eligible"}
									</CardTitle>
									<CardDescription className="text-slate-600 mt-1">
										{result.message}
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="bg-slate-50 p-4 rounded-lg">
									<p className="text-slate-600 text-sm font-medium">
										Net Monthly Income
									</p>
									<p className="text-2xl font-bold text-slate-800">
										{formatCurrency(result.netIncome)}
									</p>
								</div>
								<div className="bg-slate-50 p-4 rounded-lg">
									<p className="text-slate-600 text-sm font-medium">
										Maximum Loan Amount
									</p>
									<p
										className={`text-2xl font-bold ${
											result.eligible ? "text-[#00A859]" : "text-red-600"
										}`}
									>
										{formatCurrency(result.maxLoan)}
									</p>
								</div>
								<div className="bg-slate-50 p-4 rounded-lg">
									<p className="text-slate-600 text-sm font-medium">
										Loan Calculation
									</p>
									<p className="text-sm text-slate-600 mt-1">
										50% of net income
									</p>
									<p className="text-sm text-slate-500">Minimum: KES 20,000</p>
								</div>
							</div>

							{result && (
								<div
									className={
										result.eligible
											? "bg-[#00A859]/5 border border-[#00A859]/20 p-4 rounded-lg"
											: "bg-red-500/5 border border-red-500/20 p-4 rounded-lg"
									}
								>
									<p
										className={
											result.eligible
												? "text-[#00A859] font-medium mb-2"
												: "text-red-300 font-medium mb-2"
										}
									>
										Next Steps:
									</p>

									<ul className="text-slate-700 text-sm space-y-1">
										{result.nextStep.map((step, index) => (
											<li key={`${step}-${index}`}>{step}</li>
										))}
									</ul>
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{/* Footer */}
				<div className="text-center mt-12 text-slate-500">
					<p className="text-sm">
						This calculator provides an estimate. Final loan approval is subject
						to Fin Africa's credit assessment.
					</p>
				</div>
			</div>
		</div>
	)
}
