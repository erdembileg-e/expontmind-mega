"use client";

import { useState } from "react";
import { Sidebar, Header } from "@/components/layout";
import { ProjectCard, ProjectForm } from "@/components/projects";
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

export default function ProjectsPage() {
  const { state, dispatch, getTasksWithTodos } = useApp();
  const [showProjectForm, setShowProjectForm] = useState(false);

  const tasksWithTodos = getTasksWithTodos();

  const handleCreateProject = (data: any) => {
    dispatch({ type: "CREATE_PROJECT", payload: data });
    setShowProjectForm(false);
  };

  const handleEditProject = (project: any) => {
    // TODO: Implement edit functionality
    console.log("Edit project:", project);
  };

  const handleDeleteProject = (projectId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this project? This will also delete all associated tasks and todos."
      )
    ) {
      dispatch({ type: "DELETE_PROJECT", payload: projectId });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar projects={state.projects} />

      <div className="flex-1 flex flex-col ">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className=" space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                <p className="text-gray-600">
                  Manage your projects and track their progress.
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
                    onSubmit={handleCreateProject}
                    onCancel={() => setShowProjectForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Projects Grid */}
            {state.projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first project.
                </p>
                <Button onClick={() => setShowProjectForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    tasks={tasksWithTodos}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
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
