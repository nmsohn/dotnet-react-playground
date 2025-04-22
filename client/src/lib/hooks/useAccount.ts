import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginSchema } from "../schemas/LoginSchema"
import agent from "../agent"
import { useNavigate } from 'react-router';

export const useAccount = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post("/login?useCookies=true", creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user"] })
            await navigate("/activities")
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post("/account/logout")
        },
        onSuccess: async () => {
            await queryClient.removeQueries({ queryKey: ["user", "activities"] })
            await navigate("/")
        }
    })

    const { data: currentUser } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await agent.get<User>("/account/user-info")
            return data
        },
        enabled: !queryClient.getQueryData(["user"]),
        retry: false,
        refetchOnWindowFocus: false,
    })

    return {
        loginUser,
        currentUser,
        logoutUser
    }
}