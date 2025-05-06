import { Id } from "../../convex/_generated/dataModel";

export interface Task {
    _id: Id<"tasks">;
    taskId: string;
    message: string;
    action: string;
    type: string;
    userId: string;
  }
  