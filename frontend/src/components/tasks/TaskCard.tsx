"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckSquare,
  Calendar,
  Flag,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { Task, Project, Todo } from "@/types";
import { formatDate, getPriorityColor, isOverdue } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  project: Project;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onAddTodo: (taskId: string) => void;
  onToggleTodo: (todoId: string) => void;
}

export function TaskCard({
  task,
  project,
  onToggleComplete,
  onEdit,
  onDelete,
  onAddTodo,
  onToggleTodo,
}: TaskCardProps) {
  const [showTodos, setShowTodos] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const completedTodos = task.todos.filter((todo) => todo.completed).length;
  const totalTodos = task.todos.length;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* Checkbox */}
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-0.5"
          />

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3
                className={`text-sm font-medium ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>

              <Badge
                variant={
                  task.priority === "high"
                    ? "destructive"
                    : task.priority === "medium"
                    ? "default"
                    : "secondary"
                }
                className="text-xs"
              >
                {task.priority}
              </Badge>
            </div>

            {task.description && (
              <p className="text-xs text-gray-600 mb-2">{task.description}</p>
            )}

            {/* Project, Assignee, and Due Date */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span>{project.name}</span>
              </div>

              {task.assignee && (
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full border border-gray-300 overflow-hidden">
                    {task.assignee.avatar ? (
                      <img
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {task.assignee.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <span>{task.assignee.name}</span>
                </div>
              )}

              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span
                    className={
                      isOverdue(task.dueDate) && !task.completed
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              )}
            </div>

            {/* Todos */}
            {task.todos.length > 0 && (
              <div className="mb-3">
                <button
                  onClick={() => setShowTodos(!showTodos)}
                  className="flex items-center space-x-2 text-xs text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <CheckSquare className="w-3 h-3" />
                  <span>
                    {completedTodos}/{totalTodos} todos
                  </span>
                </button>

                {showTodos && (
                  <div className="mt-2 space-y-1">
                    {task.todos.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center space-x-2 text-xs"
                      >
                        <button
                          onClick={() => onToggleTodo(todo.id)}
                          className={`w-3 h-3 rounded border flex items-center justify-center cursor-pointer ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-green-500"
                          }`}
                        >
                          {todo.completed && (
                            <CheckSquare className="w-2 h-2" />
                          )}
                        </button>
                        <span
                          className={
                            todo.completed
                              ? "line-through text-gray-500"
                              : "text-gray-700"
                          }
                        >
                          {todo.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onAddTodo(task.id)}
                  className="text-xs h-6 px-2"
                >
                  Add Todo
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onEdit(task)}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(task.id)}
                    className="flex items-center space-x-2 text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
