"use client";

import { Id } from "../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Task } from "@/lib/types";

interface TaskFormDialogProps {
  editingTask?: Task | null;
  onTaskAdded?: () => void;
  children?: React.ReactNode;
  userId: string;
}

export function TaskFormDialog({ editingTask, onTaskAdded, children, userId }: TaskFormDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskId: "",
    message: "",
    action: "",
    type: "",
  });

  const addTask = useMutation(api.tasks.create);
  const updateTask = useMutation(api.tasks.update);

  // Update form data when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setFormData({
        taskId: editingTask.taskId,
        message: editingTask.message,
        action: editingTask.action,
        type: editingTask.type,
      });
      setIsDialogOpen(true);
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      await updateTask({
        id: editingTask._id,
        userId: userId,
        ...formData,
      });
    } else {
      await addTask({
        ...formData,
        userId: userId,
      });
    }
    setIsDialogOpen(false);
    setFormData({ taskId: "", message: "", action: "", type: "" });
    onTaskAdded?.();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      if (!open) {
        setFormData({ taskId: "", message: "", action: "", type: "" });
        onTaskAdded?.();
      }
    }}>
      <DialogTrigger asChild>
        {children || <Button>Add New Task</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="taskId">Task ID</Label>
            <Input
              id="taskId"
              value={formData.taskId}
              onChange={(e) => setFormData({ ...formData, taskId: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="action">Action</Label>
            <Select
              value={formData.action}
              onValueChange={(value) => setFormData({ ...formData, action: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="post">Post</SelectItem>
                <SelectItem value="comment">Comment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            {editingTask ? "Update Task" : "Add Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 