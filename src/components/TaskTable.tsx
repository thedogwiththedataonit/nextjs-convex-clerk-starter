"use client";

import { Id } from "../../convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Task {
  _id: Id<"tasks">;
  taskId: string;
  message: string;
  action: string;
  type: string;
}

interface TaskTableProps {
  tasks: Task[];
  onDelete: (id: Id<"tasks">) => void;
  onEdit: (task: Task) => void;
}

export function TaskTable({ tasks, onDelete, onEdit }: TaskTableProps) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task ID</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.taskId}</TableCell>
              <TableCell>{task.message}</TableCell>
              <TableCell>{task.action}</TableCell>
              <TableCell>{task.type}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(task._id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 