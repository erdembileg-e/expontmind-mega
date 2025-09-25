"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import {
  Project,
  Task,
  Todo,
  User,
  Note,
  CreateProjectData,
  CreateTaskData,
  CreateTodoData,
  CreateNoteData,
  UpdateTaskData,
  UpdateTodoData,
  UpdateNoteData,
} from "@/types";
import { generateId } from "@/lib/utils";
import { sampleProjects, sampleTasks, sampleTodos, sampleUsers, sampleNotes } from "@/lib/sampleData";

interface AppState {
  projects: Project[];
  tasks: Task[];
  todos: Todo[];
  users: User[];
  notes: Note[];
}

type AppAction =
  | { type: "CREATE_PROJECT"; payload: CreateProjectData }
  | { type: "UPDATE_PROJECT"; payload: { id: string; data: Partial<Project> } }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "CREATE_TASK"; payload: CreateTaskData }
  | { type: "UPDATE_TASK"; payload: { id: string; data: UpdateTaskData } }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "CREATE_TODO"; payload: CreateTodoData }
  | { type: "UPDATE_TODO"; payload: { id: string; data: UpdateTodoData } }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "CREATE_NOTE"; payload: CreateNoteData }
  | { type: "UPDATE_NOTE"; payload: { id: string; data: UpdateNoteData } }
  | { type: "DELETE_NOTE"; payload: string }
  | {
      type: "LOAD_DATA";
      payload: { projects: Project[]; tasks: Task[]; todos: Todo[]; notes: Note[] };
    };

const initialState: AppState = {
  projects: sampleProjects,
  tasks: sampleTasks,
  todos: sampleTodos,
  users: sampleUsers,
  notes: sampleNotes,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "CREATE_PROJECT": {
      const assignees = action.payload.assignees.map((userId) =>
        state.users.find((user) => user.id === userId)
      ).filter(Boolean) as User[];
      
      const newProject: Project = {
        id: generateId(),
        ...action.payload,
        assignees,
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: [],
      };
      return {
        ...state,
        projects: [...state.projects, newProject],
      };
    }

    case "UPDATE_PROJECT": {
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id
            ? { ...project, ...action.payload.data, updatedAt: new Date() }
            : project
        ),
      };
    }

    case "DELETE_PROJECT": {
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
        tasks: state.tasks.filter((task) => task.projectId !== action.payload),
        todos: state.todos.filter((todo) => {
          const task = state.tasks.find((t) => t.id === todo.taskId);
          return task?.projectId !== action.payload;
        }),
      };
    }

    case "CREATE_TASK": {
      const assignee = action.payload.assigneeId
        ? state.users.find((user) => user.id === action.payload.assigneeId)
        : undefined;
      
      const newTask: Task = {
        id: generateId(),
        ...action.payload,
        assignee,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        todos: [],
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }

    case "UPDATE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            const assignee = action.payload.data.assigneeId
              ? state.users.find((user) => user.id === action.payload.data.assigneeId)
              : undefined;
            
            return {
              ...task,
              ...action.payload.data,
              assignee,
              updatedAt: new Date(),
            };
          }
          return task;
        }),
      };
    }

    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        todos: state.todos.filter((todo) => todo.taskId !== action.payload),
      };
    }

    case "CREATE_TODO": {
      const newTodo: Todo = {
        id: generateId(),
        ...action.payload,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case "UPDATE_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.data, updatedAt: new Date() }
            : todo
        ),
      };
    }

    case "DELETE_TODO": {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    }

    case "CREATE_NOTE": {
      const newNote: Note = {
        id: generateId(),
        ...action.payload,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        notes: [...state.notes, newNote],
      };
    }

    case "UPDATE_NOTE": {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, ...action.payload.data, updatedAt: new Date() }
            : note
        ),
      };
    }

    case "DELETE_NOTE": {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    }

    case "LOAD_DATA": {
      return {
        projects: action.payload.projects,
        tasks: action.payload.tasks,
        todos: action.payload.todos,
        notes: action.payload.notes,
        users: state.users, // Keep existing users
      };
    }

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  getProjectById: (id: string) => Project | undefined;
  getTasksByProject: (projectId: string) => Task[];
  getTodosByTask: (taskId: string) => Todo[];
  getTasksWithTodos: () => Task[];
  getNotesByProject: (projectId: string) => Note[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getProjectById = (id: string) => {
    return state.projects.find((project) => project.id === id);
  };

  const getTasksByProject = (projectId: string) => {
    return state.tasks.filter((task) => task.projectId === projectId);
  };

  const getTodosByTask = (taskId: string) => {
    return state.todos.filter((todo) => todo.taskId === taskId);
  };

  const getTasksWithTodos = () => {
    return state.tasks.map((task) => ({
      ...task,
      todos: getTodosByTask(task.id),
    }));
  };

  const getNotesByProject = (projectId: string) => {
    return state.notes.filter((note) => note.projectId === projectId);
  };

  const value: AppContextType = {
    state,
    dispatch,
    getProjectById,
    getTasksByProject,
    getTodosByTask,
    getTasksWithTodos,
    getNotesByProject,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export { AppContext };
