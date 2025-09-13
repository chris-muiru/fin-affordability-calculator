import axios from "axios"

// can only be used in client
export const AXIOS_PUBLIC = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SERVER_API}`,
	headers: {
		"Content-Type": "application/json",
	},
})
