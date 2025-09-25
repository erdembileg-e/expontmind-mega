"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Calendar } from "lucide-react";
import { Note, Project } from "@/types";
import { formatDate } from "@/lib/utils";

interface NoteCardProps {
  note: Note;
  project: Project;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

export function NoteCard({ note, project, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: project.color }}
              />
              <span className="text-sm text-gray-500 truncate">
                {project.name}
              </span>
            </div>
            <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onEdit(note)}
                className="flex items-center space-x-2"
              >
                <Edit className="w-3 h-3" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(note.id)}
                className="flex items-center space-x-2 text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Content Preview */}
          <p className="text-sm text-gray-600 line-clamp-3">
            {note.content}
          </p>

          {/* Date */}
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Created {formatDate(note.createdAt)}</span>
            {note.updatedAt.getTime() !== note.createdAt.getTime() && (
              <span>• Updated {formatDate(note.updatedAt)}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
