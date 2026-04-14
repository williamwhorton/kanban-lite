import './App.css'
import {Container, Grid, Typography} from "@mui/material";
import Column from "./components/Column.tsx";
import TaskCard from "./components/TaskCard.tsx";
import useTasks from "./hooks/useTasks.ts";


export type Task = {
    id?: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    assignedTo?: string;
    assignedBy?: string;
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
}

function App() {

    const initialState :Task[] = [
        {
            title: "Task 1",
            description: "This is a sample task.",
            status: 'pending'
        },
        {
            title: "Task 2",
            description: "This is another sample task.",
            status: 'pending'
        },
        {
            title: "Task 3",
            description: "This is a third sample task.",
            status: 'pending'
        },
        {
            title: "Task 4",
            description: "This is a fourth sample task.",
            status: 'in-progress'
        },
        {
            title: "Task 5",
            description: "This is a fifth sample task.",
            status: 'in-progress'
        },
        {
            title: "Task 6",
            description: "This is a sixth sample task.",
            status: 'in-progress'
        },
        {
            title: "Task 7",
            description: "This is a seventh sample task.",
            status: 'completed'
        },
        {
            title: "Task 8",
            description: "This is an eighth sample task.",
            status: 'completed'
        },
        {
            title: "Task 9",
            description: "This is a ninth sample task.",
            status: 'completed'
        },
        {
            title: "Task 10",
            description: "This is a tenth sample task.",
            status: 'completed'
        },
    ];

    const { tasks, addTask, editTask, moveTask, deleteTask } = useTasks(initialState);

    const toDoTasks = tasks.filter(task => task.status === 'pending');

    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');

    const doneTasks = tasks.filter(task => task.status === 'completed');

    function updateStatus(title: string, newStatus: 'pending' | 'in-progress' | 'completed') {
            moveTask(title, newStatus);
    }

  return (
    <Container maxWidth="xl">
      <Typography variant="h1">Kanban Lite</Typography>
      <Grid container spacing={2}>
        <Grid size={4} data-status="pending" >
          <Column title="To Do" status="pending" updateColumn={(title, status : 'pending' | 'in-progress' | 'completed') => updateStatus(title, status)}>
              <>
              {toDoTasks.map((task, index) => (
                  <TaskCard key={index} title={task.title} description={task.description} status={task.status} />
              ))}
              </>
          </Column>
        </Grid>
        <Grid size={4}>
          <Column title="In Progress" status="in-progress" updateColumn={(title, status : 'pending' | 'in-progress' | 'completed') => updateStatus(title, status)}>
              <>
              {inProgressTasks.map((task, index) => (
                  <TaskCard key={index} title={task.title} description={task.description} status={task.status} />
              ))}
              </>
          </Column>
        </Grid>
        <Grid size={4}>
          <Column title="Done" status="completed" updateColumn={(title, status : 'pending' | 'in-progress' | 'completed') => updateStatus(title, status)}>
              <>
                  {doneTasks.map((task, index) => (
                      <TaskCard key={index} title={task.title} description={task.description} status={task.status} />
                  ))}
              </>
          </Column>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
