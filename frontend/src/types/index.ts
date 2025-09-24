export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  todos: Todo[];
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  taskId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type Priority = "low" | "medium" | "high";

export interface CreateProjectData {
  name: string;
  description?: string;
  color: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date;
  projectId: string;
}

export interface CreateTodoData {
  text: string;
  taskId: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  dueDate?: Date;
}

export interface UpdateTodoData {
  text?: string;
  completed?: boolean;
}
