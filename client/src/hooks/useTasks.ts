import {useReducer} from "react";
import type {Task} from "../App.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTask, type CreateTaskInput, getTasks, updateTask, type UpdateTaskInput, deleteTask as deleteTaskApi} from "../api/tasks.ts";


function taskReducer(state: any[], action: { type: any; payload: any }) {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'EDIT_TASK':
            return state.map(task => task.id === action.payload.id ? action.payload : task);
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'MOVE_TASK':
            const {taskId, newStatus} = action.payload;
            return state.map(task => task.id === taskId ? {...task, status: newStatus} : task);
        default:
            return state;
    }
}

export default (initialState :Task[] = []) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);
    const queryClient = useQueryClient();

    const tasksQuery = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks
    });

    const addTask = useMutation({
        mutationFn: (task :CreateTaskInput) => createTask(task),
        onSuccess: (task) => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
            dispatch({type: 'ADD_TASK', payload: task})
        }
    });

    const editTask = useMutation({
        mutationFn: ({ id, data }: {id: number, data: UpdateTaskInput }) => updateTask(id, data),
        onSuccess: (task) => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
            dispatch({type: 'EDIT_TASK', payload: task})
        }
    });

    const deleteTask = useMutation({
        mutationFn: (taskId :number) => deleteTaskApi(taskId),
        onSuccess: (taskId) => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
            dispatch({type: 'DELETE_TASK', payload: taskId})
        }
    });

    const moveTask = useMutation({
        mutationFn: ({id, status}: {id: number, status: 'pending' | 'in-progress' | 'completed'}) => updateTask(id, {status: status}),
        onSuccess: ({id, status}) => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
            dispatch({type: 'MOVE_TASK', payload: {id, status}})
        }
    });

    return {tasks, addTask, editTask, deleteTask, moveTask, tasksQuery};
}