import { prisma } from "../lib/prisma";

function getAllTasks() {
    return prisma.tasks.findMany();
}

function getTaskById(taskId: number) {
    return prisma.tasks.findUnique({
        where: { task_id: taskId }
    });
}

function createTask(task: any) {
    return prisma.tasks.create({
        data: {
            title: task.title,
            description: task.description,
            status: task.status
        }
    });
}

function updateTask(taskId: number, task: any) {
    const { title, description, status } = task;
    return prisma.tasks.update({
        where: { task_id: taskId },
        data: {
            title,
            description,
            status
        }
    });
}

function deleteTask(taskId: number) {
    return prisma.tasks.delete({
        where: { task_id: taskId }
    });
}

export {getAllTasks, getTaskById, createTask, updateTask, deleteTask};

