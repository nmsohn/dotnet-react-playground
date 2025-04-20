import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
    const { state } = useLocation();
    return (
        <Paper>
            {state.error ? (
                <>
                    <Typography variant="h3" gutterBottom
                        sx={{
                            px: 4,
                            pt: 2
                        }}>
                        {state.error.message || "There is an error"}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" gutterBottom
                        sx={{
                            p: 4
                        }}>
                        {state.error.details || "Internal server error"}
                    </Typography>
                </>
            ) : (
                <Typography variant="h5">
                    Server error
                </Typography>
            )}
        </Paper>
    )
}
