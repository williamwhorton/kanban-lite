import {Box, Dialog, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import type {Task} from "../App.tsx";


export default function TaskModal({modalOpen, setModalOpen, addTask, editTask, taskToEdit}: { modalOpen: boolean, setModalOpen: (open: boolean) => void, addTask: (task: any) => void, editTask: (task: any) => void, taskToEdit: Task | { title: string, description: string, status: 'pending' | 'in-progress' | 'completed'} | null}  ) {

    const [task, setTask] = useState({title: '', description: '', status: 'pending'});

    useEffect(() => {
        setTask(taskToEdit ? {...taskToEdit} : {title: '', description: '', status: 'pending'});
    },[taskToEdit, modalOpen])

    function handleAddClick(event: any) {
        event.preventDefault();
        (taskToEdit) ? editTask(task) : addTask(task);
        setModalOpen(false);
    }

    function handleInputChange(event: any) {
        const {name, value}: {name: string, value: string} = event.target;
        setTask(prev => ({...prev, [name]: value}));
    }


    return (
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box>
                <Typography variant="h2">{ taskToEdit ? 'Edit Task' : 'Add Task' }</Typography>
                <TextField
                    label="Task Title"
                    name="title"
                    variant="outlined"
                    value={task?.title}
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    label="Task Description"
                    variant="outlined"
                    value={task?.description}
                    name="description"
                    fullWidth
                    onChange={handleInputChange}
                />
                <button onClick={(event) => handleAddClick(event)}>{ taskToEdit ? 'Edit Task' : 'Add Task' }</button>
            </Box>
        </Dialog>
    )
}