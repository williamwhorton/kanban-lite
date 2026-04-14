import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardHeader, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import  { type MouseEvent } from "react";
import * as React from "react";


interface TaskCardProps {
    title: string;
    description: string;
    completed?: boolean;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    assignedTo?: string;
    assignedBy?: string;
    status?: 'pending' | 'in-progress' | 'completed';
    tags?: string[];
    createdBy?: string;
    deleteTask?: (title: string) => void;
    editTask?: (task: any) => void;
}


export default (({title, description, deleteTask, ...props}: TaskCardProps) => {

    function handleDragStart(event: React.DragEvent<HTMLDivElement>, title: string) {
        event.dataTransfer.setData('text/plain', title);
    }

    function handleDeleteClick(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, taskTitle: string) {
        event.preventDefault();
        deleteTask && deleteTask(taskTitle);
    }

    function handleEdit() {

    }

    return (
        <Card className="my-4 p-2 border-2 border-gray-300 w-full" draggable
              onDragStart={(event) => handleDragStart(event, title)}>
            <CardContent>
                <CardHeader title={title} action={
                    <>
                        <IconButton onClick={(event) => handleDeleteClick(event, title)}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleEdit()}>
                            <EditIcon/>
                        </IconButton>
                    </>
                }/>
                <Typography variant={"body1"}>{description}</Typography>
                {Object.entries(props).filter(([key]) => key !== 'statusChange')
                    .map(([key, value]) =>
                        <div key={key}>
                            <Typography variant={"body1"}>{String(key).toUpperCase()}: {String(value)}</Typography>
                        </div>
                    )}
            </CardContent>
        </Card>
    );
});