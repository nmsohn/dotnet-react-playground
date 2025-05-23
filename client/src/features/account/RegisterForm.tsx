import { useForm } from "react-hook-form"
import { useAccount } from "../../lib/hooks/useAccount"
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../shared/components/TextInput";
import { Link } from "react-router";
import { registerSchema, RegisterSchema } from "../../lib/schemas/RegisterSchema";
import { useState } from "react";
import RegisterSuccess from "./RegisterSuccess";

export default function RegisterForm() {
    const { registerUser } = useAccount()
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const { control, handleSubmit, formState: { isValid, isSubmitting, }, setError, watch } = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema),
    });

    const email = watch("email")

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onSuccess: () => setRegisterSuccess(true),
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err) => {
                        if (err.includes("Email")) {
                            setError("email", {
                                type: "manual", message: err
                            })
                        } else if (err.includes("Password")) {
                            setError("password", {
                                type: "manual", message: err
                            })
                        }
                    })
                }
            }
        })
    }

    return (
        <>
            {registerSuccess ? (
                <RegisterSuccess email={email} />
            ) : (
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
                        label="Display Name"
                        name="displayName"
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
                        Register
                    </Button>
                    <Typography
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        Already have an account?
                        <Typography
                            sx={{
                                ml: 2
                            }}
                            component={Link}
                            to="/login"
                            color="primary"
                        >
                            Sign in
                        </Typography>
                    </Typography>
                </Paper>
            )}
        </>
    )
}
