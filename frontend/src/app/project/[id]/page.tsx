"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar, Header } from "@/components/layout";
import { TaskCard, TaskForm } from "@/components/tasks";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApp } from "@/lib/store";
import Link from "next/link";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const { state, dispatch, getTasksByProject, getProjectById } = useApp();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const project = getProjectById(projectId);
  const projectTasks = getTasksByProject(projectId);

  if (!project) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar projects={state.projects} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-y-auto">
            <div className=" mx-auto">
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Project not found
                </h1>
                <Link href="/projects">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleCreateTask = (data: any) => {
    dispatch({ type: "CREATE_TASK", payload: { ...data, projectId } });
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

  const completedTasks = projectTasks.filter((task) => task.completed).length;
  const totalTasks = projectTasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar projects={state.projects} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className=" mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <Link href="/projects">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <h1 className="text-2xl font-bold text-gray-900">
                      {project.name}
                    </h1>
                  </div>
                  {project.description && (
                    <p className="text-gray-600 mt-1">{project.description}</p>
                  )}
                </div>
              </div>
              <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
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

            {/* Project Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Project Progress
                </h2>
                <span className="text-sm text-gray-600">
                  {completedTasks} of {totalTasks} tasks completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: project.color,
                  }}
                />
              </div>
              <div className="text-right mt-2">
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Tasks List */}
            {projectTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tasks in this project
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by adding your first task to this project.
                </p>
                <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
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
                {projectTasks.map((task) => (
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
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
