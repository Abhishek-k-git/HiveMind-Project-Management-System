import mongoose, { Document, Schema } from "mongoose";
import { TaskStatusEnum, TaskStatusEnumType, TaskPriorityEnum, TaskPriorityEnumType } from "../enums/task-enum";
import { generateTaskCode } from "../utils/uuid-util";

export interface TaskDocument extends Document {
  taskCode: string;
  title: string;
  description?: string;
  project: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  status: TaskStatusEnumType;
  priority: TaskPriorityEnumType;
  assignedTo?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>({
   taskCode: {
      type: String,
      required: true,
      unique: true,
      default: () => generateTaskCode(),
   },
   title: {
      type: String,
      required: true,
      trim: true,
   },
   description: {
      type: String,
      trim: true,
      default: null,
   },
   project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: true,
   },
   workspace: {
      type: mongoose.Types.ObjectId,
      ref: "Workspace",
      required: true,
   },
   status: {
      type: String,
      enum: Object.values(TaskStatusEnum),
      default: TaskStatusEnum.TODO,
   },
   priority: {
      type: String,
      enum: Object.values(TaskPriorityEnum),
      default: TaskPriorityEnum.MEDIUM,
   },
   assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
   },
   createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
   },
   dueDate: {
      type: Date,
      default: null,
   },
}, { timestamps: true });

const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);
export default TaskModel;