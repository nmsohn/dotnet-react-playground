import { useForm } from "react-hook-form"
import { useAccount } from "../../lib/hooks/useAccount"
import { loginSchema, LoginSchema } from "../../lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
    const [notVerified, setNotVerified] = useState(false)
    const { loginUser, resendEmail } = useAccount()
    const navigate = useNavigate()
    const location = useLocation()
    const { control, handleSubmit, formState: { isValid, isSubmitting }, watch } = useForm<LoginSchema>({
        mode: "onTouched",
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || "/activities", { replace: true })
            },
            onError: (error) => {
                if (error.message === "NotVerified") {
                    setNotVerified(true)
                }
            }
        })
    }
    const email = watch("email")

    const handleResendEmail = async () => {
        try {
            await resendEmail.mutateAsync({ email })
            setNotVerified(false)
        } catch (error) {
            console.log(error)
            toast.error("Failed to resend email")
        }
    }

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 3,
                borderRadius: 3,
                maxWidth: "medium",
                mx: "auto"
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={3}
                color="secondary.main"
            >
                <LockOpen fontSize="large" />
                <Typography variant="h4">
                    Sign in
                </Typography>
            </Box>
            <TextInput
                label="Email"
                name="email"
                control={control}
            />
            <TextInput
                label="Password"
                name="password"
                control={control}
                type="password"
            />
            <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            >
                Sign in
            </Button>
            {
                notVerified ? (
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                    >
                        <Typography
                            textAlign={"center"}
                            color={"error.main"}
                        >
                            Your email address has not been verified yet. Please check your email for the verification link.
                        </Typography>
                        <Button
                            disabled={resendEmail.isPending}
                            onClick={handleResendEmail}
                        >
                            Re-send verification email
                        </Button>
                    </Box>
                ) : (
                    <Typography
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        Don't have an account?
                        <Typography
                            sx={{
                                ml: 2
                            }}
                            component={Link}
                            to="/register"
                            color="primary"
                        >
                            Sign Up
                        </Typography>
                    </Typography>
                )
            }
        </Paper>
    )
}
