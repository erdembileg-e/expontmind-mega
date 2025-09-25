import { Project, Task, Todo, User, Note } from "@/types";

export const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
  },
];

export const sampleProjects: Project[] = (() => {
  const users = sampleUsers;
  return [
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete redesign of the company website with modern UI/UX",
      color: "#3B82F6",
      assignees: [users[0], users[1]],
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      tasks: [],
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Building a cross-platform mobile application",
      color: "#10B981",
      assignees: [users[1], users[2]],
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-10"),
      tasks: [],
    },
    {
      id: "3",
      name: "Marketing Campaign",
      description: "Q1 marketing campaign for new product launch",
      color: "#F59E0B",
      assignees: [users[2], users[3]],
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-05"),
      tasks: [],
    },
  ];
})();

export const sampleTasks: Task[] = (() => {
  const users = sampleUsers;
  return [
    {
      id: "1",
      title: "Design new homepage layout",
      description: "Create wireframes and mockups for the new homepage design",
      completed: false,
      priority: "high",
      dueDate: new Date("2024-02-15"),
      assignee: users[0],
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      projectId: "1",
      todos: [],
    },
    {
      id: "2",
      title: "Implement responsive navigation",
      description: "Build mobile-friendly navigation component",
      completed: true,
      priority: "medium",
      dueDate: new Date("2024-01-30"),
      assignee: users[1],
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20"),
      projectId: "1",
      todos: [],
    },
    {
      id: "3",
      title: "Set up development environment",
      description: "Configure React Native development setup",
      completed: false,
      priority: "high",
      dueDate: new Date("2024-01-25"),
      assignee: users[1],
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-10"),
      projectId: "2",
      todos: [],
    },
    {
      id: "4",
      title: "Create user authentication flow",
      description: "Implement login and registration functionality",
      completed: false,
      priority: "medium",
      dueDate: new Date("2024-02-10"),
      assignee: users[2],
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-10"),
      projectId: "2",
      todos: [],
    },
    {
      id: "5",
      title: "Design social media graphics",
      description: "Create visual assets for social media promotion",
      completed: false,
      priority: "low",
      dueDate: new Date("2024-02-01"),
      assignee: users[3],
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-05"),
      projectId: "3",
      todos: [],
    },
  ];
})();

export const sampleTodos: Todo[] = [
  {
    id: "1",
    text: "Research current design trends",
    completed: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
    taskId: "1",
  },
  {
    id: "2",
    text: "Create initial wireframes",
    completed: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    taskId: "1",
  },
  {
    id: "3",
    text: "Get stakeholder approval",
    completed: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    taskId: "1",
  },
  {
    id: "4",
    text: "Install React Native CLI",
    completed: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-11"),
    taskId: "3",
  },
  {
    id: "5",
    text: "Configure Android Studio",
    completed: false,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    taskId: "3",
  },
];

export const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Design System Guidelines",
    content: "We need to establish a consistent design system for the website redesign. This should include color palette, typography, spacing, and component library. The design system will ensure consistency across all pages and components.",
    projectId: "1",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "2",
    title: "User Research Findings",
    content: "Based on our user interviews, we found that users prefer a clean, minimal interface with quick access to key features. The current navigation is too cluttered and needs simplification. Users also mentioned wanting better mobile experience.",
    projectId: "1",
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "3",
    title: "React Native Setup Notes",
    content: "For the mobile app development, we're using React Native with Expo for faster development. Key dependencies include: React Navigation for routing, AsyncStorage for local data, and React Native Paper for UI components. Need to set up proper state management with Redux Toolkit.",
    projectId: "2",
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-11"),
  },
  {
    id: "4",
    title: "Authentication Flow Design",
    content: "The authentication system should support multiple methods: email/password, Google OAuth, and Apple Sign-In. We'll use Firebase Auth for backend authentication and store user sessions securely. Need to implement proper error handling and loading states.",
    projectId: "2",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    title: "Marketing Strategy Overview",
    content: "Our Q1 marketing campaign focuses on social media promotion, influencer partnerships, and content marketing. Target audience: millennials and Gen Z. Key platforms: Instagram, TikTok, and LinkedIn. Budget allocation: 40% social media ads, 30% influencer partnerships, 30% content creation.",
    projectId: "3",
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-06"),
  },
  {
    id: "6",
    title: "Content Calendar Planning",
    content: "Weekly content themes: Monday Motivation, Tuesday Tips, Wednesday Wins, Thursday Thoughts, Friday Features. Content mix: 60% educational, 30% promotional, 10% behind-the-scenes. Need to create templates for consistent branding across all content.",
    projectId: "3",
    createdAt: new Date("2024-01-07"),
    updatedAt: new Date("2024-01-07"),
  },
];
