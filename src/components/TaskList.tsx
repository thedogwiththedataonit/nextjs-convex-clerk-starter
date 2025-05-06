"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskFormDialog } from "@/components/TaskFormDialog";
import { Pencil, Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface Task {
  _id: Id<"tasks">;
  taskId: string;
  message: string;
  action: string;
  type: string;
  userId: string;
}

export function TaskList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const tasks = useQuery(api.tasks.get) || [];
  const deleteTask = useMutation(api.tasks.remove);

  // Filter tasks for the current user
  const userTasks = tasks.filter((task: Task) => task.userId === user?.id);
  
  const filteredTasks = userTasks.filter((task: Task) =>
    Object.values(task).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDelete = async (id: Id<"tasks">) => {
    await deleteTask({ id });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <TaskFormDialog>
          <Button>Add Task</Button>
        </TaskFormDialog>
      </div>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            {userTasks.length === 0
              ? "No tasks found. Create your first task!"
              : "No tasks match your search."}
          </p>
          {userTasks.length === 0 && (
            <TaskFormDialog>
              <Button>Create Task</Button>
            </TaskFormDialog>
          )}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task ID</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task: Task) => (
              <TableRow key={task._id}>
                <TableCell>{task.taskId}</TableCell>
                <TableCell>{task.message}</TableCell>
                <TableCell>{task.action}</TableCell>
                <TableCell>{task.type}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <TaskFormDialog editingTask={task}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TaskFormDialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
} 