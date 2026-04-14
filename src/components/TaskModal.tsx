import {Box, Dialog, TextField, Typography} from "@mui/material";
import {useState} from "react";


export default function TaskModal({modalOpen, setModalOpen, addTask}: { modalOpen: boolean, setModalOpen: (open: boolean) => void, addTask: (task: any) => void}) {

    const [task, setTask] = useState( {
        title: '',
        description: '',
        status: 'pending'
    })

    function handleAddClick(event: any) {
        event.preventDefault();
        addTask(task);
        setModalOpen(false);
    }

    function handleInputChange(event: any) {
        const {name, value}: {name: string, value: string} = event.target;
        setTask(prev => ({...prev, [name]: value}));
    }


    return (
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={{ width: 200 }} >
                <Typography variant="h2">Add Task</Typography>
                <TextField
                    label="Task Title"
                    name="title"
                    variant="outlined"
                    value={task.title}
                    fullWidth
                    onChange={handleInputChange}
                />
                <TextField
                    label="Task Description"
                    variant="outlined"
                    value={task.description}
                    name="description"
                    fullWidth
                    onChange={handleInputChange}
                />
                <button onClick={(event) => handleAddClick(event)}>Add Task</button>
            </Box>
        </Dialog>
    )
}