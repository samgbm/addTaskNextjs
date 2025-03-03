import { create } from "zustand";

interface Task {
  id: string;
  content: string;
}

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set(() => ({ tasks })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
}));

// app/api/tasks/route.ts
