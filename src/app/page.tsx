'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/stores/taskStore";
import { motion } from "framer-motion";

export default function TaskManager() {
  const { tasks, setTasks, addTask, removeTask } = useTaskStore();
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  }, [setTasks]);

  const handleAddTask = async () => {
    if (!newTask) return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newTask }),
    });
    if (res.ok) {
      const data = await res.json();
      addTask(data.task);
      setNewTask("");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Smart Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={handleAddTask}>Add</Button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <motion.div key={task.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="flex justify-between p-4 items-center">
              <CardContent>{task.content}</CardContent>
              <Button variant="destructive" onClick={() => removeTask(task.id)}>Remove</Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
