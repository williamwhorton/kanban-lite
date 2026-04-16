import './App.css'
import {Container, Grid, Typography} from "@mui/material";
import Column from "./components/Column.tsx";
import TaskCard from "./components/TaskCard.tsx";
import useTasks from "./hooks/useTasks.ts";
import {useEffect, useState} from "react";
import TaskModal from "./components/TaskModal.tsx";


export type Task = {
    task_id: number;
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

    const { tasks, addTask, editTask, moveTask, deleteTask } = useTasks();

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const toDoTasks = tasks?.filter(task => task.status === 'pending');

    const inProgressTasks = tasks?.filter(task => task.status === 'in-progress');

    const doneTasks = tasks?.filter(task => task.status === 'completed');

    const [modalOpen, setModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

    function openAddModal() {
        setTaskToEdit(null);
        setModalOpen(true);
    }
    function openEditModal(task: Task) {
        setTaskToEdit(task);
        setModalOpen(true);
    }

    function clearLocalStorage() {
        localStorage.clear();
        window.location.reload();
    }

  return (
    <Container maxWidth="xl">
      <Typography variant="h1">Kanban Lite</Typography>
        <Typography variant="subtitle1">Now with Containers!</Typography>
        <button onClick={clearLocalStorage}>Clear Local Storage</button>
      <Grid container spacing={2}>
        <Grid size={4} data-status="pending" >
          <Column title="To Do" status="pending" updateColumn={(task_id :number, status : 'pending' | 'in-progress' | 'completed') => moveTask({task_id, status})} addModal={openAddModal} >
              <>
              {toDoTasks?.map((task) => (
                  <TaskCard key={task.task_id} task_id={task.task_id} title={task.title} description={task.description} status={task.status} deleteTask={deleteTask} editTask={openEditModal}  />
              ))}
              </>
          </Column>
        </Grid>
        <Grid size={4}>
          <Column title="In Progress" status="in-progress" updateColumn={(task_id, status : 'pending' | 'in-progress' | 'completed') => moveTask({task_id, status})}>
              <>
              {inProgressTasks?.map((task) => (
                  <TaskCard key={task.task_id} task_id={task.task_id} title={task.title} description={task.description} status={task.status} deleteTask={deleteTask} editTask={openEditModal} />
              ))}
              </>
          </Column>
        </Grid>
        <Grid size={4}>
          <Column title="Done" status="completed" updateColumn={(task_id, status : 'pending' | 'in-progress' | 'completed') => moveTask({task_id, status})}>
              <>
                  {doneTasks?.map((task) => (
                      <TaskCard key={task.task_id} task_id={task.task_id} title={task.title} description={task.description} status={task.status} deleteTask={deleteTask} editTask={openEditModal} />
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
