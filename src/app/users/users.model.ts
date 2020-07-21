import { Task } from '../tasks/tasks.model';

export interface UserCard {
  email: string;
  displayName: string;
  totalTasks: number;
  compeletedTasks: number;
  pendingTasks: number;
}

export interface UserData {
  email: string;
  tasks: Task[];
}
