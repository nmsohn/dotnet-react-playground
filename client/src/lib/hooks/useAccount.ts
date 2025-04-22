import { useMutation } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/LoginSchema"
import agent from "../agent"

export const useAccount = () => {
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post("/login?useCookies=true", creds)
        },
    })

    return {
        loginUser
    }
}