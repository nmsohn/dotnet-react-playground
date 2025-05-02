import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile"
import { Box } from "@mui/system"
import { Card, CardContent, CardMedia, Grid2, Tab, Tabs, Typography } from "@mui/material"
import { format } from "date-fns"

export default function ProfileActivities() {
    const [activeTab, setActiveTab] = useState(0)
    const { id } = useParams()
    const { userActivities, loadingUserActivities, setFilter } = useProfile(id)

    useEffect(() => {
        setFilter("future")
    }, [setFilter])

    const tabs = [
        { menuItem: "Future events", key: "future" },
        { menuItem: "Past events", key: "past" },
        { menuItem: "Hosting", key: "hosting" }
    ]

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
        setFilter(tabs[newValue].key)
    }

    return (
        <Box>
            <Grid2
                container
                spacing={2}
            >
                <Grid2
                    size={12}
                >
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                label={tab.menuItem}
                                key={index}
                            />
                        ))}
                    </Tabs>
                </Grid2>
            </Grid2>
            {
                (!userActivities || userActivities.length === 0) && !loadingUserActivities ?
                    (
                        <Typography
                            mt={2}
                        >
                            No activities found
                        </Typography>
                    ) : null
            }
            <Grid2
                container
                spacing={2}
                sx={{
                    marginTop: 2,
                    height: 400,
                    overflow: "auto"
                }}
            >
                {
                    userActivities && userActivities.map((activity: Activity) => (
                        <Grid2
                            size={2}
                            key={activity.id}
                        >
                            <Link
                                to={`/activities/${activity.id}`}
                                style={{
                                    TextDecoration: "none",
                                }}
                            />
                            <Card
                                elevation={4}
                            >
                                <CardMedia
                                    component={"img"}
                                    height={100}
                                    image={`/images/categoryImages/${activity.category}.jpg`}
                                    alt={activity.title}
                                    sx={{
                                        objectFit: "cover",
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        textAlign={"center"}
                                        display={"flex"}
                                        flexDirection={"column"}
                                    >
                                        <span>
                                            {format(activity.date, "do LLL yyyy")}
                                        </span>
                                        <span>
                                            {format(activity.date, "h:mm a")}
                                        </span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))
                }
            </Grid2>
        </Box>
    )
}
