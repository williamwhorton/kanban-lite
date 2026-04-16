import {useReducer} from "react";
import type {Task} from "../App.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createTask, type CreateTaskInput, getTasks, updateTask, deleteTask as deleteTaskApi, moveTask as moveTaskApi} from "../api/tasks.ts";


function taskReducer(state: any[], action: { type: string; payload: any }) {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'EDIT_TASK':
            return state.map((task :Task) :Task  => task.task_id === action.payload.id ? action.payload : task);
        case 'DELETE_TASK':
            return state.filter((task :Task) => task.task_id !== action.payload);
        case 'MOVE_TASK':
            const {taskId, newStatus} = action.payload;
            return state.map((task :Task) :Task => task.task_id === taskId ? {...task, status: newStatus} : task);
        default:
            return state;
    }
}

export default (initialState :Task[] = []) => {
    // @ts-ignore
    const [tasks, dispatch] = useReducer(taskReducer, initialState);
    const queryClient = useQueryClient();

    const tasksQuery = useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks
    });

    const addTask = useMutation({
        mutationFn: (task :CreateTaskInput) => createTask(task),
        onSuccess: (task) => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
                .then(() => dispatch({type: 'ADD_TASK', payload: task}) );
        }
    });

    const editTask = useMutation({
        mutationFn: ( task :Task ) => updateTask(task),
        onSuccess: (task) => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
                .then( () => dispatch({type: 'EDIT_TASK', payload: task}) );
        }
    });

    const deleteTask = useMutation({
        mutationFn: (taskId :number) => deleteTaskApi(taskId),
        onSuccess: (taskId) => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
                .then( () => dispatch({type: 'DELETE_TASK', payload: taskId}) );
        }
    });

    const moveTask = useMutation({
        mutationFn: ({task_id, status}: {task_id: number, status: 'pending' | 'in-progress' | 'completed'}) => moveTaskApi(task_id, {status: status}),
        onSuccess: ({task_id, status}) => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
                .then( () => dispatch({type: 'MOVE_TASK', payload: {task_id, status}}) );
        }
    });

    return {
        tasks: tasksQuery.data,
        isLoading: tasksQuery.isLoading,
        error: tasksQuery.error,
        addTask: addTask.mutate,
        editTask: editTask.mutate,
        deleteTask: deleteTask.mutate,
        moveTask: moveTask.mutate,
    };
}