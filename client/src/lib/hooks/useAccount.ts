import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginSchema } from "../schemas/LoginSchema"
import agent from "../agent"
import { useLocation, useNavigate } from 'react-router';
import { RegisterSchema } from '../schemas/RegisterSchema';
import { toast } from 'react-toastify';

export const useAccount = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const location = useLocation()
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

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await agent.get<User>("/account/user-info")
            return data
        },
        enabled: !queryClient.getQueryData(["user"]) && location.pathname !== "/login" && location.pathname !== "/register",
        retry: false,
        refetchOnWindowFocus: false,
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }
}