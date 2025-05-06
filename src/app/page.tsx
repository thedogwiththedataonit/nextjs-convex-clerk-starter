"use client";

import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { useState } from "react";
import { TaskTable } from "@/components/TaskTable";
import { TaskFormDialog } from "@/components/TaskFormDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Task {
  _id: Id<"tasks">;
  taskId: string;
  message: string;
  action: string;
  type: string;
}

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const deleteTask = useMutation(api.tasks.remove);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDelete = async (id: Id<"tasks">) => {
    await deleteTask({ id });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskAdded = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks?.filter(task => 
    task.taskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-6xl">
        <div className="w-full flex justify-between items-center">
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <TaskFormDialog onTaskAdded={handleTaskAdded}>
            <Button>Add New Task</Button>
          </TaskFormDialog>
        </div>

        {filteredTasks && filteredTasks.length > 0 ? (
          <>
            <TaskTable 
              tasks={filteredTasks} 
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <TaskFormDialog 
              editingTask={editingTask}
              onTaskAdded={handleTaskAdded}
            >
              <Button className="hidden">Edit Task</Button>
            </TaskFormDialog>
          </>
        ) : (
          <div className="w-full text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "No tasks match your search criteria." : "Get started by adding your first task."}
            </p>
            <TaskFormDialog onTaskAdded={handleTaskAdded}>
              <Button>Add New Task</Button>
            </TaskFormDialog>
          </div>
        )}
      </main>
    </div>
  );
}
