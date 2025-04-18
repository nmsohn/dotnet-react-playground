import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
export default function ActivityForm() {
  const { id } = useParams()
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id)
  const navigate = useNavigate()

  const handleSumit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data: { [key: string]: FormDataEntryValue } = Object.fromEntries(formData)

    formData.forEach((value, key) => {
      data[key] = value
    })

    if (activity) {
      data.id = activity.id
      await updateActivity.mutateAsync(data as unknown as Activity)
      navigate(`/activities/${activity.id}`)
    } else {
      // await createActivity.mutateAsync(data as unknown as Activity)
      // navigate('/activities')
      createActivity.mutate(data as unknown as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`)
        }
      })
    }
  }

  if (isLoadingActivity) return <Typography variant="h2">Loading...</Typography>

  return (
    <Paper sx={{ borderRadius: 3, p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        color="primary">
        {activity ? "Edit" : "Create"} Activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSumit}
        display="flex"
        flexDirection="column"
        gap={3}>
        <TextField
          name="title"
          label="Title"
          defaultValue={activity?.title}
          fullWidth />
        <TextField
          name="description"
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
          fullWidth />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
          fullWidth />
        <TextField
          name="date"
          type="date"
          defaultValue={activity?.date
            ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
          fullWidth />
        <TextField
          name="city"
          label="City"
          defaultValue={activity?.city} fullWidth />
        <TextField
          name="venue"
          label="Venue"
          defaultValue={activity?.venue} fullWidth />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {}}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={updateActivity.isPending || createActivity.isPending}
          >Submit</Button>
        </Box>
      </Box>
    </Paper>
  )
}
