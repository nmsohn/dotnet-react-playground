import { Grid2, Typography } from "@mui/material"
import { useParams } from "react-router"
import { useActivities } from "../../../lib/hooks/useActivities"
import ActivityDetailsHeader from "./ActivityDetailsHeader"
import AcitivityDetailsInfo from "./AcitivityDetailsInfo"
import AcitivityDetailsChat from "./AcitivityDetailsChat"
import AcitivityDetailsSidebar from "./AcitivityDetailsSidebar"

export default function ActivityDetailPage() {
    const { id } = useParams()
    const { activity, isLoadingActivity } = useActivities(id)

    if (isLoadingActivity) return <Typography variant="h2">Loading...</Typography>
    if (!activity) return <Typography variant="h5">Activity not found</Typography>

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityDetailsHeader activity={activity} />
                <AcitivityDetailsInfo activity={activity} />
                <AcitivityDetailsChat />
            </Grid2>
            <Grid2 size={4}>
                <AcitivityDetailsSidebar/>
            </Grid2>
        </Grid2>
    )
}
