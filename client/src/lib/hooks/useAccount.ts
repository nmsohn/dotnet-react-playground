import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginSchema } from "../schemas/LoginSchema"
import agent from "../agent"
import { useNavigate } from 'react-router';
import { RegisterSchema } from '../schemas/RegisterSchema';
import { toast } from 'react-toastify';

export const useAccount = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post("/login?useCookies=true", creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user"] })
        }
    })

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post("/account/register", creds)
        },
        onSuccess: async () => {
            toast.success("Registration successful, please login")
            navigate("/login")
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

    const verifyEmail = useMutation({
        mutationFn: async ({ userId, code }: { userId: string, code: string }) => {
            //NOTE: check if the url can be customisable
            await agent.post(`/confirmEmail?userId=${userId}&code=${code}`)
        }
    })

    const resendEmail = useMutation({
        mutationFn: async ({ email, userId }: { email?: string, userId?: string | null }) => {
            await agent.get(`/resend-confirm-email`, {
                params: {
                    email,
                    userId
                }
            })
        },
        onSuccess: () => {
            toast.success("Please check your email for the confirmation link")
        }
    })

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
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
        logoutUser,
        loadingUserInfo,
        registerUser,
        verifyEmail,
        resendEmail
    }
}