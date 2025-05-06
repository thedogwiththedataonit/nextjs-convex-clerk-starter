import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("tasks").filter(q => q.eq(q.field("userId"), args.userId)).collect();
  },
});

export const create = mutation({
  args: {
    userId: v.string(),
    taskId: v.string(),
    message: v.string(),
    action: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", {
      userId: args.userId,
      taskId: args.taskId,
      message: args.message,
      action: args.action,
      type: args.type,
    });
  },
});

export const update = mutation({
  args: {
    userId: v.string(),
    id: v.id("tasks"),
    taskId: v.string(),
    message: v.string(),
    action: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      userId: args.userId,
      taskId: args.taskId,
      message: args.message,
      action: args.action,
      type: args.type,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("tasks"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
