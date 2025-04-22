import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginSchema } from "../schemas/LoginSchema"
import agent from "../agent"

export const useAccount = () => {
    const queryClient = useQueryClient()
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post("/login?useCookies=true", creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user"] })
        }
    })

    const { data: currentUser } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await agent.get<User>("/account/user-info")
            return data
        },
        retry: false,
        refetchOnWindowFocus: false,
    })

    return {
        loginUser,
        currentUser,
    }
}