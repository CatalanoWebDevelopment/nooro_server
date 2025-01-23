export interface Task {
  id: string;
  title: string;
  color: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTaskInput = Pick<Task, "title" | "color">;
export type UpdateTaskInput = Partial<CreateTaskInput> & {
  completed?: boolean;
};
