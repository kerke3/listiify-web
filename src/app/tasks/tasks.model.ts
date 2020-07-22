import { UserObj } from './../users/users.model';
export interface Task {
  id: string;
  name: string;
  isDone: boolean;
}

export interface TaskObj {
  id: string;
  name: string;
  isDone: boolean;
  user: UserObj;
}
