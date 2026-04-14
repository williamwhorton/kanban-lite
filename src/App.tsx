import './App.css'
import {Container, Grid, Typography} from "@mui/material";
import Column from "./components/Column.tsx";
import TaskCard from "./components/TaskCard.tsx";

function App() {
    const toDoTasks = [
        {
            title: "Task 1",
            description: "This is a sample task."
        },
        {
            title: "Task 2",
            description: "This is another sample task."
        },
        {
            title: "Task 3",
            description: "This is a third sample task."
        }
    ]

    const inProgressTasks = [
        {
            title: "Task 1",
            description: "This is a sample task."
        },
        {
            title: "Task 2",
            description: "This is another sample task."
        },
        {
            title: "Task 3",
            description: "This is a third sample task."
        }
    ]

    const doneTasks = [
        {
            title: "Task 1",
            description: "This is a sample task."
        },
        {
            title: "Task 2",
            description: "This is another sample task."
        },
        {
            title: "Task 3",
            description: "This is a third sample task."
        }
    ]

  return (
    <Container maxWidth="xl">
      <Typography variant="h1">Kanban Lite</Typography>
      <Grid container spacing={2}>
        <Grid size={4} >
          <Column title="To Do">
              <>
              {toDoTasks.map((task, index) => (
                  <TaskCard key={index} title={task.title} description={task.description} />
              ))}
              </>
          </Column>
        </Grid>
        <Grid size={4}>
          <Column title="In Progress">
              <>
              {inProgressTasks.map((task, index) => (
                  <TaskCard key={index} title={task.title} description={task.description} />
              ))}
              </>
          </Column>
        </Grid>
        <Grid size={4}>
          <Column title="Done">
              <>
                  {doneTasks.map((task, index) => (
                      <TaskCard key={index} title={task.title} description={task.description} />
                  ))}
              </>
          </Column>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
