import { request } from "./http";
import { type Task } from "../App";

export type TaskStatus = "pending" | "in-progress" | "completed";

export type CreateTaskInput = {
    title: string;
    description: string;
    status: TaskStatus;
};

export function getTasks() {
    return request<Task[]>("/tasks");
}

export function createTask(data: CreateTaskInput) {
    return request<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateTask(task :Task) {
    return request<Task>(`/tasks/${task.task_id}`, {
        method: "PUT",
        body: JSON.stringify(task),
    });
}

export function deleteTask(task_id: number) {
    return request<void>(`/tasks/${task_id}`, {
        method: "DELETE",
    });
}

export function moveTask(task_id: number, data: { status: TaskStatus }) {
    return request<Task>(`/tasks/move/${task_id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}