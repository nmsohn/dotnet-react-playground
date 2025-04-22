import { Navigate, Outlet, useLocation } from "react-router"
import { useAccount } from "../../lib/hooks/useAccount"
import { Typography } from "@mui/material"

export default function RequiredAuth() {
    const { currentUser, loadingUserInfo } = useAccount()
    const location = useLocation()

    if(loadingUserInfo)
        return <Typography variant="h2">Loading...</Typography>

    if(!currentUser) return <Navigate to="/login" state={{ from: location }} replace />

    return (
        <Outlet />
    )
}
