import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, CheckSquare, Clock } from "lucide-react";
import { Project, Task } from "@/types";
import Link from "next/link";

interface ProjectOverviewProps {
  projects: Project[];
  tasks: Task[];
}

export function ProjectOverview({ projects, tasks }: ProjectOverviewProps) {
  const getProjectStats = (project: Project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    const completedTasks = projectTasks.filter((task) => task.completed).length;
    const totalTasks = projectTasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      totalTasks,
      completedTasks,
      progress: Math.round(progress),
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FolderOpen className="w-5 h-5 mr-2 text-gray-600" />
          Projects Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No projects yet</p>
          ) : (
            projects.map((project) => {
              const stats = getProjectStats(project);

              return (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <CheckSquare className="w-3 h-3" />
                      <span>
                        {stats.completedTasks}/{stats.totalTasks}
                      </span>
                    </div>
                  </div>

                  {stats.totalTasks > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{stats.progress}%</span>
                      </div>
                      <Progress value={stats.progress} className="h-2" />
                    </div>
                  )}
                </Link>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
