import { TLoanRequest, TLoanResponse } from "@/app/resource/type"
import { AXIOS_PUBLIC } from "@/shared/config/axios-public"

export const computeLoanEligibility = async (
	data: TLoanRequest
): Promise<TLoanResponse> => {
	return (await AXIOS_PUBLIC.post("/loan", data)).data as TLoanResponse
}
