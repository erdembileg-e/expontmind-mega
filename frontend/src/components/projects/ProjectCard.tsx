import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Project, Task } from "@/types";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectCard({
  project,
  tasks,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  const completedTasks = projectTasks.filter((task) => task.completed).length;
  const totalTasks = projectTasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </div>

          <div className="relative">
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {project.description && (
          <p className="text-sm text-gray-600 mt-2">{project.description}</p>
        )}

        {/* Assignees */}
        {project.assignees.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Assignees:</span>
              <div className="flex -space-x-1">
                {project.assignees.slice(0, 3).map((assignee) => (
                  <div
                    key={assignee.id}
                    className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden"
                    title={assignee.name}
                  >
                    {assignee.avatar ? (
                      <img
                        src={assignee.avatar}
                        alt={assignee.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium text-gray-600">
                        {assignee.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                ))}
                {project.assignees.length > 3 && (
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      +{project.assignees.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  backgroundColor: project.color,
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {completedTasks} of {totalTasks} tasks completed
            </span>
            <span className="text-xs">
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Link
              href={`/project/${project.id}`}
              className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium py-2 px-3 rounded-md text-center cursor-pointer transition-colors"
            >
              View Project
            </Link>
            <button
              onClick={() => onEdit(project)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
