"use client";

import { useState } from "react";
import { Sidebar, Header } from "@/components/layout";
import {
  StatsCards,
  RecentTasks,
  ProjectOverview,
} from "@/components/dashboard";
import { ProjectForm } from "@/components/projects";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/index";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApp } from "@/context";

export default function Dashboard() {
  const { state, dispatch, getTasksWithTodos } = useApp();
  const [showProjectForm, setShowProjectForm] = useState(false);

  const tasksWithTodos = getTasksWithTodos();

  const handleCreateProject = (data: any) => {
    dispatch({ type: "CREATE_PROJECT", payload: data });
    setShowProjectForm(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar projects={state.projects} />

      <div className="flex-1 flex flex-col ">
        <Header />

        <main className=" p-6 overflow-y-auto ">
          <div className="mx-auto space-y-6  w-full flex flex-col gap-4">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">
                  Welcome back! Here's what's happening with your projects.
                </p>
              </div>
              <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                  </DialogHeader>
                  <ProjectForm
                    users={state.users}
                    onSubmit={handleCreateProject}
                    onCancel={() => setShowProjectForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <StatsCards projects={state.projects} tasks={tasksWithTodos} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentTasks tasks={tasksWithTodos} projects={state.projects} />
              <ProjectOverview
                projects={state.projects}
                tasks={tasksWithTodos}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
