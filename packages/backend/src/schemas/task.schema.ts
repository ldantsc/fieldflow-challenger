import * as mongoose from 'mongoose';
import { Task } from 'src/interfaces/task.interface';

export const taskSchema = new mongoose.Schema<Task>(
  {
    _id_project: {
      type: String,
      required: [true, 'requer o id do projeto pertencente'],
    },
    _id_column: {
      type: String,
      required: [true, 'requer o id da coluna pertencente'],
    },
    title: {
      type: String,
      required: [true, 'requer um titulo para a task'],
    },
    description: String,
    order: Number,
    archived: Boolean,
  },
  { timestamps: true },
);
