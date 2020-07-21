export interface UserCard {
  email: string;
  displayName: string;
  isAdmin: boolean;
  totalTasks: number;
  compeletedTasks: number;
  pendingTasks: number;
}

export interface UserData {
  email: string;
  displayName: string;
  isAdmin: boolean;
}
