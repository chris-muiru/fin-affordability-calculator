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

interface CalculationResult {
	net_income: number
	max_loan: number
	eligible: boolean
	message: string
}

export default function AffordabilityCalculator() {
	const [grossIncome, setGrossIncome] = useState("")
	const [deductions, setDeductions] = useState("")
	const [result, setResult] = useState<CalculationResult | null>(null)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<{
		grossIncome?: string
		deductions?: string
	}>({})

	const validateInputs = () => {
		const newErrors: { grossIncome?: string; deductions?: string } = {}

		if (!grossIncome || isNaN(Number(grossIncome)) || Number(grossIncome) < 0) {
			newErrors.grossIncome = "Please enter a valid gross income (≥ 0)"
		}

		if (!deductions || isNaN(Number(deductions)) || Number(deductions) < 0) {
			newErrors.deductions = "Please enter valid deductions (≥ 0)"
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateInputs()) return

		setLoading(true)

		try {
			// Simulate API call - todo: replace with actual backend endpoint
			await new Promise((resolve) => setTimeout(resolve, 1500))

			const gross = Number(grossIncome)
			const totalDeductions = Number(deductions)
			const netIncome = gross - totalDeductions
			const maxLoan = netIncome * 0.5
			const eligible = maxLoan >= 20000

			const calculationResult: CalculationResult = {
				net_income: netIncome,
				max_loan: maxLoan,
				eligible,
				message: eligible
					? "Congratulations! You qualify for a loan with Fin Africa."
					: "Unfortunately, your current income doesn't meet our minimum loan requirements.",
			}

			setResult(calculationResult)
		} catch (error) {
			console.error("Calculation error:", error)
		} finally {
			setLoading(false)
		}
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-KE", {
			style: "currency",
			currency: "KES",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount)
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
						<form onSubmit={handleSubmit} className="space-y-6">
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
									value={grossIncome}
									onChange={(e) => setGrossIncome(e.target.value)}
									className={`h-12 text-lg ${
										errors.grossIncome ? "border-red-500" : "border-slate-300"
									}`}
									disabled={loading}
								/>
								{errors.grossIncome && (
									<p className="text-red-500 text-sm">{errors.grossIncome}</p>
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
									value={deductions}
									onChange={(e) => setDeductions(e.target.value)}
									className={`h-12 text-lg ${
										errors.deductions ? "border-red-500" : "border-slate-300"
									}`}
									disabled={loading}
								/>
								{errors.deductions && (
									<p className="text-red-500 text-sm">{errors.deductions}</p>
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
										{formatCurrency(result.net_income)}
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
										{formatCurrency(result.max_loan)}
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

							{result.eligible && (
								<div className="bg-[#00A859]/5 border border-[#00A859]/20 p-4 rounded-lg">
									<p className="text-[#00A859] font-medium mb-2">Next Steps:</p>
									<ul className="text-slate-700 text-sm space-y-1">
										<li>
											• Contact our loan officers to start your application
										</li>
										<li>• Prepare your income documentation</li>
										<li>• Choose your preferred loan terms</li>
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
