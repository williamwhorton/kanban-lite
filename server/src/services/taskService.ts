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

function updateTask(task: any) {
    if( !task ) throw new Error('Task data is required to update a task')
    const { title, description, status } = task;
    try{
        return prisma.tasks.update({
            where: { task_id: task.task_id },
            data: {
                title,
                description,
                status
            }
        });
    } catch (error :any) {
        console.error('Error updating task:', error);
        throw new Error(error?.message || 'Failed to update task');
    }
}

function moveTask(task_id: number, status: 'pending' | 'in-progress' | 'completed') {
    if( !task_id ) throw new Error('Task id is required to move a task');
    if( !status ) throw new Error('Status is required to move a task');
    try{
        return prisma.tasks.update({
            where: { task_id: task_id },
            data: {
                status
            }
        });
    } catch (error :any) {
        console.error('Error moving task:', error);
        throw new Error(error?.message || 'Failed to move task');
    }
}

function deleteTask(taskId: number) {
    if( !taskId ) throw new Error(
        'Task ID is required to delete a task'
    );
    try {
        return prisma.tasks.delete({
            where: { task_id: taskId }
        });
    } catch (error :any) {
        console.error('Error deleting task:', error);
        throw new Error(error?.message || 'Failed to delete task');
    }
}

export {getAllTasks, getTaskById, createTask, updateTask, deleteTask, moveTask};

