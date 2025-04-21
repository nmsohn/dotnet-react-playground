import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, ActivitySchema } from "../../../lib/schemas/ActivitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../shared/components/TextInput";
import SelectInput from "../../../shared/components/SelectInput";
import { categoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../shared/components/DateTimeInput";
import LocationInput from "../../../shared/components/LocationInput";

export default function ActivityForm() {
  const { reset, control, handleSubmit } = useForm<ActivitySchema>(
    {
      mode: "onTouched",
      resolver: zodResolver(activitySchema),
    }
  )

  const navigate = useNavigate()
  const { id } = useParams()
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id)

  useEffect(() => {
    if (activity) reset({
      ...activity,
      location: {
        city: activity.city,
        venue: activity.venue,
        latitude: activity.latitude,
        longitude: activity.longitude
      }
    })
  }, [activity, reset])

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data
    const flattenedData = { ...rest, ...location }
    try {
      if (activity) {
        updateActivity.mutate({ ...activity, ...flattenedData }, {
          onSuccess: () => navigate(`/activities/${activity.id}`)
        })
      } else {
        createActivity.mutate(flattenedData, {
          onSuccess: (id) => navigate(`activities/${id}`)
        })
      }
    } catch (error) {
      console.error(error)
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
        <Box display="flex" gap={3}>
          <SelectInput
            label="Category"
            control={control}
            name="category"
            items={categoryOptions} />
          <DateTimeInput
            control={control}
            name="date"
            label="Date"
          />
        </Box>

        <LocationInput
          control={control}
          name="location"
          label="Location" />
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
