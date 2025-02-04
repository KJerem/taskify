import { Priority, Status } from '@prisma/client';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  priority: Priority;
  status: Status;
  estimatedTime: number | null;
  actualTimeSpent: number | null;
  userId: string;
  tagId: string;
}
