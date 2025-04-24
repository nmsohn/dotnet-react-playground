import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link } from "react-router"
import { AccessTime, Place } from "@mui/icons-material"
import { formatDate } from "../../../lib/util/util"
import AvatarPopover from "../../../shared/components/AvatarPopover"

type Props = {
  activity: Activity
}

export default function ActivityCard({ activity }: Props) {

  const label = activity.isHost ? "You are hosting this activity" : "You are going to this activity"
  const color = activity.isHost ? "secondary" : activity.isGoing ? "warning" : "default"

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
              Hosted by {' '} <Link to={`/profiles/${activity.hostId}`}>{activity.hostDisplayName}</Link>
            </>

          }
        />

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          mr={2}
        >
          {(activity.isHost || activity.isGoing && <Chip label={label} color={color} />)}
          {activity.isCancelled && <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

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
            sx={{ color: 'text.secondary' }} noWrap>
            {formatDate(activity.date)}
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
          {activity.attendees.map(attendee => (
            <AvatarPopover profile={attendee} key={attendee.id} />
          ))}
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
