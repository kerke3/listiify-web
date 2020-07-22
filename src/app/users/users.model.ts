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
  displayName: string;
  tasks: Task[];
  pendingTasks: Task[];
  completedTasks: Task[];
}

export interface UserObj {
  email: string;
  displayName: string;
}
