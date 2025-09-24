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

interface TaskFormProps {
  projects: Project[];
  onSubmit: (data: CreateTaskData) => void;
  onCancel: () => void;
}

export function TaskForm({ projects, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: undefined,
    projectId: projects[0]?.id || "",
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
      });
    }
  };

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
            setFormData({ ...formData, projectId: value })
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
