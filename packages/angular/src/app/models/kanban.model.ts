export interface Project {
  _id: string;
  title: string;
}

export interface Column {
  _id: string;
  _id_project: string;
  title: string;
}

export interface Task {
  _id: string;
  _id_project: string;
  _id_column: string;
  title: string;
  description: string;
  archived: boolean;
  createdAt: Date;
}

export interface HandleMessage {
  message: string;
  code: number;
}
