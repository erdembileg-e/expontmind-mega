"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Plus,
  Calendar,
  CheckSquare,
  FolderOpen,
  Settings,
  Menu,
  X,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";

interface SidebarProps {
  projects: Project[];
}

export function Sidebar({ projects }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Today", href: "/today", icon: Calendar },
    { name: "All Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Notes", href: "/notes", icon: FileText },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-white shadow-md border border-gray-200 cursor-pointer"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200 h-20">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  TaskFlow
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Projects Section */}
            <div className="pt-6">
              <div className="flex items-center justify-between px-3 mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Projects
                </h3>
                <button className="p-1 rounded hover:bg-gray-100 cursor-pointer">
                  <Plus className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="space-y-1">
                {projects.map((project) => {
                  const isActive = pathname === `/project/${project.id}`;

                  return (
                    <Link
                      key={project.id}
                      href={`/project/${project.id}`}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: project.color }}
                      />
                      <span className="truncate">{project.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Settings */}
          <div className="px-4 py-4 border-t border-gray-200">
            <Link
              href="/settings"
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                pathname === "/settings"
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
