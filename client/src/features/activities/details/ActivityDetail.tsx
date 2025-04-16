import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate, Link } from "react-router"
export default function ActivityDetail() {
    const activity = {} as Activity
    const navigate = useNavigate()

    if (!activity) return <Typography variant="h5">Activity not found</Typography>

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component="img"
                src={`/images/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1">{activity.date}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    color="primary"
                    onClick={() => {}}>Edit</Button>
                <Button
                    color="inherit"
                    onClick={() => navigate('/activities')}>Cancel</Button>
            </CardActions>
        </Card>
    )
}
