import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const create = mutation({
  args: {
    taskId: v.string(),
    message: v.string(),
    action: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {

    await ctx.db.insert("tasks", {
      taskId: args.taskId,
      message: args.message,
      action: args.action,
      type: args.type,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    taskId: v.string(),
    message: v.string(),
    action: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
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
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
