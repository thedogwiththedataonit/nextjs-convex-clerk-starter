"use client";

import { api } from "../../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { useState } from "react";
import { TaskTable } from "@/components/TaskTable";
import { TaskFormDialog } from "@/components/TaskFormDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task } from "@/lib/types";

export default function Tasks({userId}: {userId: string}) {
    const tasks = useQuery(api.tasks.get, { userId });
    const deleteTask = useMutation(api.tasks.remove);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const handleDelete = async (id: Id<"tasks">) => {
      await deleteTask({ id, userId: userId });
    };
  
    const handleEdit = (task: Task) => {
      setEditingTask(task);
    };
  
    const handleTaskAdded = () => {
      setEditingTask(null);
    };
  
    // Check if loading
    if (tasks === undefined) {
      return <div>Loading...</div>;
    }
  
    // Now you can safely use tasks without optional chaining
    const filteredTasks = tasks.filter(task => 
      task.taskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <div className="w-full flex justify-between items-center">
          <div className="w-full max-w-md">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <TaskFormDialog userId={userId} onTaskAdded={handleTaskAdded}>
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
              userId={userId}
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
            <TaskFormDialog userId={userId} onTaskAdded={handleTaskAdded}>
              <Button>Add New Task</Button>
            </TaskFormDialog>
          </div>
        )}
      </main>
    )
}