"use client";

import { useState } from "react";
import { Sidebar, Header } from "@/components/layout";
import { NoteCard, NoteForm } from "@/components/notes";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApp } from "@/context";
import { CreateNoteData, Note } from "@/types";

export default function NotesPage() {
  const { state, dispatch, getProjectById } = useApp();
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleCreateNote = (data: CreateNoteData) => {
    dispatch({ type: "CREATE_NOTE", payload: data });
    setShowNoteForm(false);
  };

  const handleEditNote = (note: Note) => {
    // TODO: Implement edit functionality
    console.log("Edit note:", note);
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      dispatch({ type: "DELETE_NOTE", payload: noteId });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar projects={state.projects} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
                <p className="text-gray-600">
                  View and manage all your project notes.
                </p>
              </div>
              <Dialog open={showNoteForm} onOpenChange={setShowNoteForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Note
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Note</DialogTitle>
                  </DialogHeader>
                  <NoteForm
                    projects={state.projects}
                    onSubmit={handleCreateNote}
                    onCancel={() => setShowNoteForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Notes Grid */}
            {state.notes.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notes yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating your first note.
                </p>
                <Button onClick={() => setShowNoteForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Note
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.notes.map((note) => {
                  const project = getProjectById(note.projectId);
                  if (!project) return null;

                  return (
                    <NoteCard
                      key={note.id}
                      note={note}
                      project={project}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
