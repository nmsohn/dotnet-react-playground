import { useStore } from "../../lib/stores/useStore"
import { Button, ButtonGroup, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"

const Counter = observer(function Counter() {
  const { counterStore } = useStore()

  return (
    <>
      <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
      <Typography variant="h6">{counterStore.count}</Typography>
      <ButtonGroup sx={{ mt: 3 }}>
        <Button variant="contained" color="success" onClick={() => counterStore.increment(5)}>Increment</Button>
        <Button variant="contained" color="error" onClick={() => counterStore.decrement()}>Decrement</Button>
        <Button variant="contained" color="secondary" onClick={() => counterStore.reset()}>Reset</Button>
      </ButtonGroup>
    </>
  )
})

export default Counter
