import { useStore } from "../../lib/stores/useStore"
import { Box, Button, ButtonGroup, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"

const Counter = observer(function Counter() {
  const { counterStore } = useStore()

  return (
    <Box display="flex"
      justifyContent="space-between"
    >
      <Box sx={{ width: "60%" }}>
        <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
        <Typography variant="h6">{counterStore.count}</Typography>
        <ButtonGroup sx={{ mt: 3 }}>
          <Button variant="contained" color="success" onClick={() => counterStore.increment(5)}>Increment</Button>
          <Button variant="contained" color="error" onClick={() => counterStore.decrement()}>Decrement</Button>
          <Button variant="contained" color="secondary" onClick={() => counterStore.reset()}>Reset</Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{ width: "40%", p: 4 }}>
        <Typography variant="h5" gutterBottom>Events ({counterStore.eventCount})</Typography>
        <List>
          {counterStore.events.map((event, index) => (
            <ListItem key={index}>
              <ListItemText primary={event} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
})

export default Counter
