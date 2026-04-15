import { prisma } from "./lib/prisma";

const seedData :any[] = [
    {
        title: "Task 1",
        description: "This is a sample task.",
        status: 'pending'
    },
    {
        title: "Task 2",
        description: "This is another sample task.",
        status: 'pending'
    },
    {
        title: "Task 3",
        description: "This is a third sample task.",
        status: 'pending'
    },
    {
        title: "Task 4",
        description: "This is a fourth sample task.",
        status: 'in-progress'
    },
    {
        title: "Task 5",
        description: "This is a fifth sample task.",
        status: 'in-progress'
    },
    {
        title: "Task 6",
        description: "This is a sixth sample task.",
        status: 'in-progress'
    },
    {
        title: "Task 7",
        description: "This is a seventh sample task.",
        status: 'completed'
    },
    {
        title: "Task 8",
        description: "This is an eighth sample task.",
        status: 'completed'
    },
    {
        title: "Task 9",
        description: "This is a ninth sample task.",
        status: 'completed'
    },
    {
        title: "Task 10",
        description: "This is a tenth sample task.",
        status: 'completed'
    },
];

prisma.tasks.createMany({ data: seedData }).finally(() => prisma.$disconnect());