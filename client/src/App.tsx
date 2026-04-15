import './App.css'
import {Container, Grid, Typography} from "@mui/material";
import Column from "./components/Column.tsx";
import TaskCard from "./components/TaskCard.tsx";
import useTasks from "./hooks/useTasks.ts";
import {useEffect, useState} from "react";
import TaskModal from "./components/TaskModal.tsx";


export type Task = {
    id: number;
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

    const initialStateArr :Task[] = [
        {
            id: 1,
            title: "Task 1",
            description: "This is a sample task.",
            status: 'pending'
        },
        {
            id: 2,
            title: "Task 2",
            description: "This is another sample task.",
            status: 'pending'
        },
        {
            id: 3,
            title: "Task 3",
            description: "This is a third sample task.",
            status: 'pending'
        },
        {
            id: 4,
            title: "Task 4",
            description: "This is a fourth sample task.",
            status: 'in-progress'
        },
        {
            id: 5,
            title: "Task 5",
            description: "This is a fifth sample task.",
            status: 'in-progress'
        },
        {
            id: 6,
            title: "Task 6",
            description: "This is a sixth sample task.",
            status: 'in-progress'
        },
        {
            id: 7,
            title: "Task 7",
            description: "This is a seventh sample task.",
            status: 'completed'
        },
        {
            id: 8,
            title: "Task 8",
            description: "This is an eighth sample task.",
            status: 'completed'
        },
        {
            id: 9,
            title: "Task 9",
            description: "This is a ninth sample task.",
            status: 'completed'
        },
        {
            id: 10,
            title: "Task 10",
            description: "This is a tenth sample task.",
            status: 'completed'
        },
    ];

    const initialState = JSON.parse(localStorage.getItem('tasks') || JSON.stringify(initialStateArr));

    const { tasks, addTask, editTask, moveTask, deleteTask } = useTasks(initialState);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const toDoTasks = tasks.filter(task => task.status === 'pending');

    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');

    const doneTasks = tasks.filter(task => task.status === 'completed');

    const [modalOpen, setModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    function openAddModal() {
        setTaskToEdit(null);
        setModalOpen(true);
    }
    function openEditModal(task: Task) {
        setTaskToEdit(task);
        console.log(task);
        setModalOpen(true);
    }

    function clearLocalStorage() {
        localStorage.clear();
        window.location.reload();
    }

  return (
    <Container maxWidth="xl">
      <Typography variant="h1">Kanban Lite</Typography>
        <button onClick={clearLocalStorage}>Clear Local Storage</button>
      <Grid container spacing={2}>
        <Grid size={4} data-status="pending" >
          <Column title="To Do" status="pending" updateColumn={(id :number, status : 'pending' | 'in-progress' | 'completed') => moveTask(id, status)} addModal={openAddModal} >
              <>
              {toDoTasks.map((task) => (
                  <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} status={task.status} deleteTask={deleteTask} editTask={openEditModal}  />
              ))}
              </>
          </Column>
        </Grid>
        <Grid size={4}>
          <Column title="In Progress" status="in-progress" updateColumn={(title, status : 'pending' | 'in-progress' | 'completed') => moveTask(title, status)}>
              <>
              {inProgressTasks.map((task) => (
                  <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} status={task.status} deleteTask={deleteTask} editTask={openEditModal} />
              ))}
              </>
          </Column>
        </Grid>
        <Grid size={4}>
          <Column title="Done" status="completed" updateColumn={(title, status : 'pending' | 'in-progress' | 'completed') => moveTask(title, status)}>
              <>
                  {doneTasks.map((task) => (
                      <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} status={task.status} deleteTask={deleteTask} editTask={openEditModal} />
                  ))}
              </>
          </Column>
        </Grid>
      </Grid>
        <TaskModal modalOpen={modalOpen} setModalOpen={setModalOpen} addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} />
    </Container>
  )
}

export default App
