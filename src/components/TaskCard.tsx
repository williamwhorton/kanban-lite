import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Typography} from "@mui/material";


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
}

export default (({title, description, ...props }: TaskCardProps) => (
    <Card className="my-4 p-2 border-2 border-gray-300 w-full">
        <CardContent>
            <Typography variant={"h3"}>{title}</Typography>
            <Typography variant={"body1"}>{description}</Typography>
            { Object.entries(props).map( ([key, value]) =>
                    <div key={key}>
                        <Typography variant={"h4"}>{key}</Typography>: <Typography variant={"body2"}>{String(value)}</Typography>
                    </div>
            )}
        </CardContent>
    </Card>
))