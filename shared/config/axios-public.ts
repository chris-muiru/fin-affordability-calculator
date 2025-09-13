import { SERVER_API } from "@/shared/variable"
import axios from "axios"

// can only be used in client
export const AXIOS_PUBLIC = axios.create({
	baseURL: `${SERVER_API}`,
	headers: {
		"Content-Type": "application/json",
	},
})
