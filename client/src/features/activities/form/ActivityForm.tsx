import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, ActivitySchema } from "../../../lib/schemas/ActivitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../shared/components/TextInput";

export default function ActivityForm() {
  const { reset, control, handleSubmit } = useForm<ActivitySchema>(
    {
      mode: "onTouched",
      resolver: zodResolver(activitySchema),
    }
  )
  const { id } = useParams()
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id)

  useEffect(() => {
    if (activity) reset(activity)
  }, [activity, reset])

  const onSubmit = async (data: ActivitySchema) => {
    console.log(data)
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
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}>
        <TextInput
          control={control}
          name="title"
          label="Title" />
        <TextInput
          control={control}
          name="description"
          label="Description"
          multiline
          rows={3} />
        <TextInput
          control={control}
          name="category"
          label="Category" />
        <TextInput
          control={control}
          name="date"
          label="Date"
          type="datetime-local"
        />
        <TextInput
          control={control}
          name="city"
          label="City" />
        <TextInput
          control={control}
          name="venue"
          label="Venue" />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => { }}>Cancel</Button>
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
