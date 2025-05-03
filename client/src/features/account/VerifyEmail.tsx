import { useEffect, useRef, useState } from "react"
import { useAccount } from "../../lib/hooks/useAccount"
import { useSearchParams } from 'react-router';
import { Box, Button, Divider, Paper, Typography } from "@mui/material"
import { EmailRounded } from "@mui/icons-material";

export default function VerifyEmail() {
    const { verifyEmail, resendEmail } = useAccount()
    const [status, setStatus] = useState("verifying")
    const [searchParams] = useSearchParams()
    const userId = searchParams.get("userId")
    const code = searchParams.get("code")
    const hasRun = useRef(false)

    useEffect(() => {
        if (code && userId && !hasRun.current) {
            hasRun.current = true
            verifyEmail.mutateAsync({
                userId, code
            })
                .then(() => setStatus("verified"))
                .catch(() => setStatus("failed"))
        }
    }, [code, userId, verifyEmail])

    const getBody = () => {
        switch (status) {
            case "verifying":
                return <Typography>Verifying...</Typography>
            case "failed":
                return (
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                        justifyContent={"center"}
                    >
                        <Typography>Failed to verify email</Typography>
                        <Button
                            onClick={() => resendEmail.mutate({ userId })}
                            disabled={resendEmail.isPending}
                        >
                            Resend Verification Email
                        </Button>
                    </Box>
                )
            default:
                break
        }
    }

    return (
        <Paper
            sx={{
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 6
            }}
        >
            <EmailRounded
                sx={{
                    fontSize: 100,
                    color: "primary"
                }}
            />
            <Typography
                gutterBottom
                variant="h3"
            >
                Email Verification
            </Typography>
            <Divider />
            {getBody()}
        </Paper>
    )
}
