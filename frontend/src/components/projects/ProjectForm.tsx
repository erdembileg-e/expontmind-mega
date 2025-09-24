"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CreateProjectData } from "@/types";
import { getProjectColors } from "@/lib/utils";

interface ProjectFormProps {
  onSubmit: (data: CreateProjectData) => void;
  onCancel: () => void;
}

export function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectData>({
    name: "",
    description: "",
    color: getProjectColors()[0],
  });

  const colors = getProjectColors();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({
        name: "",
        description: "",
        color: getProjectColors()[0],
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
