export interface Todo {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt?: string;
    deletedAt?: string;
    appUserId: number;
}