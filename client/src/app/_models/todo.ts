export interface Todo {
    id: number;
    title: string;
    description: string;
    iscompleted: boolean;
    createdAt: string;
    updatedAt?: string;
    deletedAt?: string;
    appUserId: number;
}