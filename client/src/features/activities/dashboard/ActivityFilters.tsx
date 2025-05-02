import { EventAvailable, FilterList } from "@mui/icons-material"
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material"
import "react-calendar/dist/Calendar.css"
import { Calendar } from "react-calendar"
import { useStore } from "../../../lib/stores/useStore"
import { observer } from "mobx-react-lite"

const ActivityFilters = observer(function ActivityFilters() {
    const { activityStore: { filter, setFilter, startDate, setStartDate } } = useStore()

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: 3,
            width: "100%"
        }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ width: "100%" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                            color: "primary.main"
                        }}>
                        <FilterList sx={{ mr: 1 }} />
                        Filters
                    </Typography>
                    <MenuList>
                        <MenuItem
                            selected={filter === "all"}
                            onClick={() => setFilter("all")}
                        >
                            <ListItemText primary="All events" />
                        </MenuItem>
                        <MenuItem
                            selected={filter === "isGoing"}
                            onClick={() => setFilter("isGoing")}
                        >
                            <ListItemText primary="I'm going" />
                        </MenuItem>
                        <MenuItem
                            selected={filter === "isHost"}
                            onClick={() => setFilter("isHost")}
                        >
                            <ListItemText primary="I'm hosting" />
                        </MenuItem>
                    </MenuList>
                </Box>
            </Paper>
            <Box
                component={Paper}
                sx={{ width: "100%", p: 3, borderRadius: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        color: "primary.main"
                    }}>
                    <EventAvailable sx={{ mr: 1 }} />
                    Select date
                </Typography>
                <Calendar
                    value={startDate}
                    onChange={date => setStartDate(date?.toString() ?? "")}
                />
            </Box>
        </Box>
    )
})

export default ActivityFilters
