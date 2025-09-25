"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateNoteData, Project } from "@/types";

interface NoteFormProps {
  projects: Project[];
  onSubmit: (data: CreateNoteData) => void;
  onCancel: () => void;
  initialData?: Partial<CreateNoteData>;
}

export function NoteForm({ projects, onSubmit, onCancel, initialData }: NoteFormProps) {
  const [formData, setFormData] = useState<CreateNoteData>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    projectId: initialData?.projectId || projects[0]?.id || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim() && formData.projectId) {
      onSubmit(formData);
      setFormData({
        title: "",
        content: "",
        projectId: projects[0]?.id || "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Note Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter note title..."
          required
        />
      </div>

      {/* Project */}
      <div className="space-y-2">
        <Label htmlFor="project">Project</Label>
        <Select
          value={formData.projectId}
          onValueChange={(value) => setFormData({ ...formData, projectId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <span>{project.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Enter note content..."
          className="resize-none min-h-[120px]"
          required
        />
      </div>

      {/* Actions */}
      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="flex-1">
          {initialData ? "Update Note" : "Create Note"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
