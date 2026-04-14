import {useReducer} from "react";
import type {Task} from "../App.tsx";


function taskReducer(state: any[], action: { type: any; payload: any }) {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'EDIT_TASK':
            return state.map(task => task.id === action.payload.id ? action.payload : task);
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'MOVE_TASK':
            const {taskTitle, newStatus} = action.payload;
            return state.map(task => task.title === taskTitle ? {...task, status: newStatus} : task);
        default:
            return state;
    }
}

export default (initialState :Task[] = []) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    const addTask = (task :Task)=> {
        dispatch({type: 'ADD_TASK', payload: task})
    }

    const editTask = (task :Task) => {
        dispatch({type: 'EDIT_TASK', payload: task})
    }

    const deleteTask = (taskId :string) => {
        dispatch({type: 'DELETE_TASK', payload: taskId})
    }

    const moveTask = (taskTitle :string, newStatus :'pending' | 'in-progress' | 'completed') => {
        dispatch({type: 'MOVE_TASK', payload: {taskTitle, newStatus}})
    }

    return {tasks, addTask, editTask, deleteTask, moveTask};
}