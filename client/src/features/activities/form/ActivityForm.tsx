import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityForm() {
  const { updateActivity, createActivity } = useActivities()
  const activity = {} as Activity

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
    } else {
      await createActivity.mutateAsync(data as unknown as Activity)
    }
  }

  return (
    <Paper sx={{ borderRadius: 3, p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        color="primary">Create Activity</Typography>
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
