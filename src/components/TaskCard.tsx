import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardHeader, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import  { type MouseEvent } from "react";
import * as React from "react";


interface TaskCardProps {
    id: number;
    title: string;
    description: string;
    completed?: boolean;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    createdAt?: Date;
    updatedAt?: Date;
    assignedTo?: string;
    assignedBy?: string;
    status?: 'pending' | 'in-progress' | 'completed';
    tags?: string[];
    createdBy?: string;
    deleteTask?: (id: number) => void;
    editTask?: (task: any) => void;
    setModalOpen?: () => void;
}


export default (({id, title, description, deleteTask, editTask, ...props}: TaskCardProps) => {

    function handleDragStart(event: React.DragEvent<HTMLDivElement>, id: number) {
        event.dataTransfer.setData('text/plain', id.toString(10));
    }

    function handleDeleteClick(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: number) {
        event.preventDefault();
        deleteTask && deleteTask(id);
    }

    function handleEdit(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
        event.preventDefault();
        editTask && editTask({ id, title, description });
    }

    return (
        <Card className="my-4 p-2 border-2 border-gray-300 w-full" draggable
              onDragStart={(event) => handleDragStart(event, id)}>
            <CardContent>
                <CardHeader title={title} action={
                    <>
                        <IconButton onClick={(event) => handleDeleteClick(event, id)}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton onClick={(event) => handleEdit(event)}>
                            <EditIcon/>
                        </IconButton>
                    </>
                }/>
                <Typography variant={"body1"}>{description}</Typography>
                {Object.entries(props).filter(([key]) => key !== 'deleteTask' && key !== 'editTask' && key !== 'setModalOpen' && key !== 'id')
                    .map(([key, value]) =>
                        <div key={key}>
                            <Typography variant={"body1"}>{String(key).toUpperCase()}: {String(value)}</Typography>
                        </div>
                    )}
            </CardContent>
        </Card>
    );
});