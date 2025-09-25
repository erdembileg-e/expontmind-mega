"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Flag } from "lucide-react";
import { CreateTaskData, Project, Priority } from "@/types";
import { useParams } from "next/navigation";

interface TaskFormProps {
  projects: Project[];
  onSubmit: (data: CreateTaskData) => void;
  onCancel: () => void;
}

export function TaskForm({ projects, onSubmit, onCancel }: TaskFormProps) {
  const { id } = useParams();
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: undefined,
    projectId: id as string,
    assigneeId: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.projectId) {
      onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: undefined,
        projectId: projects[0]?.id || "",
        assigneeId: undefined,
      });
    }
  };
  console.log("projects", projects);
  
  const selectedProject = projects.find((p) => p.id === formData.projectId);
  console.log("selectedProject", selectedProject);
  const availableAssignees = selectedProject?.assignees || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title..."
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter task description..."
          className="resize-none"
        />
      </div>

      {/* Project */}
      <div className="space-y-2">
        <Label htmlFor="project">Project</Label>
        <Select
          value={formData.projectId}
          onValueChange={(value) =>
            setFormData({ ...formData, projectId: value, assigneeId: undefined })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Assignee */}
      <div className="space-y-2">
        <Label htmlFor="assignee">Assignee</Label>
        <Select
          value={formData.assigneeId || "none"}
          onValueChange={(value) =>
            setFormData({ ...formData, assigneeId: value === "none" ? undefined : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No assignee</SelectItem>
            {availableAssignees.map((assignee) => (
              <SelectItem key={assignee.id} value={assignee.id}>
                <div className="flex items-center space-x-2">
                  {assignee.avatar && (
                    <img
                      src={assignee.avatar}
                      alt={assignee.name}
                      className="w-4 h-4 rounded-full"
                    />
                  )}
                  <span>{assignee.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label>Priority</Label>
        <div className="flex space-x-2">
          {(["low", "medium", "high"] as Priority[]).map((priority) => (
            <Button
              key={priority}
              type="button"
              variant={formData.priority === priority ? "default" : "outline"}
              size="sm"
              onClick={() => setFormData({ ...formData, priority })}
              className="flex items-center space-x-1"
            >
              <Flag className="w-3 h-3" />
              <span className="capitalize">{priority}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={
            formData.dueDate ? formData.dueDate.toISOString().split("T")[0] : ""
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              dueDate: e.target.value ? new Date(e.target.value) : undefined,
            })
          }
        />
      </div>

      {/* Actions */}
      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="flex-1">
          Create Task
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
