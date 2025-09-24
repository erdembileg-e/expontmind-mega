import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Clock, AlertCircle } from "lucide-react";
import { Task, Project } from "@/types";
import { formatDate, getPriorityColor, isOverdue } from "@/lib/utils";

interface RecentTasksProps {
  tasks: Task[];
  projects: Project[];
}

export function RecentTasks({ tasks, projects }: RecentTasksProps) {
  const recentTasks = tasks
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const getProjectName = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.name || "Unknown Project";
  };

  const getProjectColor = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.color || "#6B7280";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-gray-600" />
          Recent Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tasks yet</p>
          ) : (
            recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <button
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {task.completed && <CheckSquare className="w-3 h-3" />}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p
                      className={`text-sm font-medium truncate ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </p>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: getProjectColor(task.projectId),
                      }}
                    />
                    <span className="text-xs text-gray-500">
                      {getProjectName(task.projectId)}
                    </span>
                    {task.dueDate && (
                      <span
                        className={`text-xs ${
                          isOverdue(task.dueDate) && !task.completed
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {formatDate(task.dueDate)}
                      </span>
                    )}
                  </div>
                </div>

                {task.dueDate && isOverdue(task.dueDate) && !task.completed && (
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
