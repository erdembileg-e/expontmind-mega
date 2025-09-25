"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateProjectData, User } from "@/types";
import { getProjectColors } from "@/lib/utils";

interface ProjectFormProps {
  users: User[];
  onSubmit: (data: CreateProjectData) => void;
  onCancel: () => void;
}

export function ProjectForm({ users, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectData>({
    name: "",
    description: "",
    color: getProjectColors()[0],
    assignees: [],
  });
  console.log("formData", formData);
  const colors = getProjectColors();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({
        name: "",
        description: "",
        color: getProjectColors()[0],
        assignees: [],
      });
    }
  };

  const handleAssigneeChange = (userId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        assignees: [...formData.assignees, userId],
      });
    } else {
      setFormData({
        ...formData,
        assignees: formData.assignees.filter((id) => id !== userId),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter project name..."
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="projectDescription">Description</Label>
        <Textarea
          id="projectDescription"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter project description..."
          className="resize-none"
        />
      </div>

      {/* Assignees */}
      <div className="space-y-2">
        <Label>Assignees</Label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {users && users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`assignee-${user.id}`}
                  checked={formData.assignees.includes(user.id)}
                  onCheckedChange={(checked) =>
                    handleAssigneeChange(user.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`assignee-${user.id}`}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{user.name}</span>
                </Label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No users available</p>
          )}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <Label>Project Color</Label>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData({ ...formData, color })}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                formData.color === color
                  ? "border-gray-400 ring-2 ring-gray-300 scale-110"
                  : "border-gray-200 hover:border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="flex-1">
          Create Project
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
