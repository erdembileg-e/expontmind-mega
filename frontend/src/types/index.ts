export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  assignees: User[];
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
  assignee?: User;
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
  assignees: string[];
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date;
  projectId: string;
  assigneeId?: string;
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
  assigneeId?: string;
}

export interface UpdateTodoData {
  text?: string;
  completed?: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteData {
  title: string;
  content: string;
  projectId: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
}
