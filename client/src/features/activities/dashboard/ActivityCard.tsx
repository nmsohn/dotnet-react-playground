import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link } from "react-router"
import { AccessTime, Place } from "@mui/icons-material"

type Props = {
  activity: Activity
}

export default function ActivityCard({ activity }: Props) {
  const isHost = false;
  const isGoing = false;
  const label = isHost ? "You are hosting this activity" : isGoing ? "You are going to this activity" : "Join Activity";
  const isCancelled = false;
  const color = isHost ? "secondary" : isGoing ? "warning" : "default"

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }}></Avatar>}
          title={activity.title}
          titleTypographyProps={{
            fontWeight: "bold",
            fontSize: 20
          }}
          subheader={
            <>
              Hosted by {' '} <Link to={`/profiles/bob`}>Bob</Link>
            </>

          }
        />

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          mr={2}
        >
          {(isHost || isGoing && <Chip label={label} color={color} />)}
          {isCancelled && <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />}
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <CardContent sx={{ p: 0 }}>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          px={2}
        >
          <AccessTime sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary' }}>
            {activity.date}
          </Typography>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary' }}>
            {activity.venue}
          </Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          gap={2}
          sx={{
            backgroundColor: "grey.200",
            py: 3,
            pl: 3
          }}>
          Attendees go here
        </Box>
      </CardContent>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          size="medium"
          variant="contained"
          sx={{
            display: "flex",
            justifySelf: "self-end",
            borderRadius: 3
          }}
          component={Link}
          to={`/activities/${activity.id}`}>View</Button>
      </CardContent>
    </Card>
  )
}
