"use client";

import { useState } from "react";
import { Sidebar, Header } from "@/components/layout";
import { TaskCard, TaskForm } from "@/components/tasks";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/store";

export default function TasksPage() {
  const { state, dispatch, getTasksWithTodos, getProjectById } = useApp();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const tasksWithTodos = getTasksWithTodos();

  const handleCreateTask = (data: any) => {
    dispatch({ type: "CREATE_TASK", payload: data });
    setShowTaskForm(false);
  };

  const handleToggleComplete = (taskId: string) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: taskId,
        data: {
          completed: !state.tasks.find((t) => t.id === taskId)?.completed,
        },
      },
    });
  };

  const handleEditTask = (task: any) => {
    // TODO: Implement edit functionality
    console.log("Edit task:", task);
  };

  const handleDeleteTask = (taskId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this task? This will also delete all associated todos."
      )
    ) {
      dispatch({ type: "DELETE_TASK", payload: taskId });
    }
  };

  const handleAddTodo = (taskId: string) => {
    const text = prompt("Enter todo text:");
    if (text?.trim()) {
      dispatch({
        type: "CREATE_TODO",
        payload: { taskId, text: text.trim() },
      });
    }
  };

  const handleToggleTodo = (todoId: string) => {
    const todo = state.todos.find((t) => t.id === todoId);
    if (todo) {
      dispatch({
        type: "UPDATE_TODO",
        payload: {
          id: todoId,
          data: { completed: !todo.completed },
        },
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar projects={state.projects} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className=" mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
                <p className="text-gray-600">
                  View and manage all your tasks across projects.
                </p>
              </div>
              <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm
                    projects={state.projects}
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowTaskForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Tasks List */}
            {tasksWithTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tasks yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first task.
                </p>
                <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <TaskForm
                      projects={state.projects}
                      onSubmit={handleCreateTask}
                      onCancel={() => setShowTaskForm(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-4">
                {tasksWithTodos.map((task) => {
                  const project = getProjectById(task.projectId);
                  if (!project) return null;

                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      project={project}
                      onToggleComplete={handleToggleComplete}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onAddTodo={handleAddTodo}
                      onToggleTodo={handleToggleTodo}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
