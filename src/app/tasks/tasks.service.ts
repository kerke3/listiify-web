import { Injectable } from '@angular/core';
import { Task } from './tasks.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class TasksService {
  constructor(private db: AngularFirestore) {}

  deleteTask(taskId) {
    this.db.collection('tasks').doc(taskId).delete();
  }

  addTask(taskObj) {
    this.db.collection('tasks').add(taskObj);
  }

  checkTask(taskDetails) {
    console.log(status);
    this.db
      .collection('tasks')
      .doc(taskDetails[0])
      .update({ isDone: taskDetails[1] });
  }
}
