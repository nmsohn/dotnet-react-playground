import { useEffect, useState } from 'react'
import './App.css'
import { List, ListItem, Typography } from '@mui/material'
import axios from 'axios'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(res => setActivities(res.data))

    return () => {}
  }, [])

  return (
    <>
      <Typography variant='h3'>Hello</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </List>
    </>
  )
}

export default App
