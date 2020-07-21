import { Injectable } from '@angular/core';
import { Task } from './tasks.model';
import { Subject } from 'rxjs';

@Injectable()
export class TasksService {
  TaskChosen = new Subject<Task>();
  private taskList: Task[] = [
    { id: '8', name: 'Gotta finish', isDone: false },
    { id: '7', name: 'Gotta finish', isDone: true },
    { id: '3', name: 'Gotta finish', isDone: false },
    { id: '2', name: 'Gotta finish', isDone: true },
    { id: '1', name: 'Gotta finish', isDone: false },
  ];

  getTasksList() {
    console.log(this.taskList.slice());
    return this.taskList.slice();
  }

  private selectedTask: Task;

  findUser(selectedTaskID: String) {
    this.selectedTask = this.taskList.find((ex) => ex.id === selectedTaskID);
    this.TaskChosen.next({ ...this.selectedTask });
  }
}
