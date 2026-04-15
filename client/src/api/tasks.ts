import { request } from "./http";

export type TaskStatus = "pending" | "in-progress" | "completed";

export type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
};

export type CreateTaskInput = {
    title: string;
    description: string;
    status: TaskStatus;
};

export type UpdateTaskInput = Partial<CreateTaskInput>;

export function getTasks() {
    return request<Task[]>("/api/tasks");
}

export function createTask(data: CreateTaskInput) {
    return request<Task>("/api/tasks", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export function updateTask(id: number, data: UpdateTaskInput) {
    return request<Task>(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteTask(id: number) {
    return request<void>(`/api/tasks/${id}`, {
        method: "DELETE",
    });
}