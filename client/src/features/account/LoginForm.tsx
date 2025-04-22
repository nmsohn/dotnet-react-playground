import { useForm } from "react-hook-form"
import { useAccount } from "../../lib/hooks/useAccount"
import { loginSchema, LoginSchema } from "../../lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../shared/components/TextInput";

export default function LoginForm() {
    const { loginUser } = useAccount()
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: "onTouched",
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data)
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
        </Paper>
    )
}
