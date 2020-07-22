import { Subject } from 'rxjs';
import { UserCard, UserData } from './users.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class UserCardService {
  allUserTasksChanged = new Subject<UserData[]>();
  cardListsChanged = new Subject<UserCard[]>();
  private usersCardList: UserCard[] = [];
  private usersTaskList: UserData[];

  constructor(private db: AngularFirestore) {}

  fetchFirestoreData() {
    this.db
      .collection('tasks')
      .snapshotChanges()
      .pipe(
        map((tasks: any[]) => {
          return tasks.map((task) => {
            return {
              id: task.payload.doc.id,
              ...task.payload.doc.data(),
            };
          });
        })
      )
      .subscribe((tasksData: any[]) => {
        this.mapToLists(tasksData);
        this.cardListsChanged.next([...this.usersCardList]);
        this.allUserTasksChanged.next([...this.usersTaskList]);
      });
  }

  // parse data upon arrival
  mapToLists(tasksData) {
    let tempCardsList = [];
    let tempTasksList = [];
    let users: any = [];
    // get emails of todoers
    tasksData.forEach((task) => {
      users.push(task.user.email);
    });
    // make emails distinct
    let emailList: any = new Set(users);
    // iterate over and create lists and cards
    for (let email of emailList) {
      //  tasks by user
      let emailTaskList = tasksData.filter((task) => {
        return task.user.email === email;
      });
      const pendingTasks = emailTaskList.filter((task) => {
        return task.isDone === false;
      });
      let usersCard: UserCard = {
        email: email,
        displayName: emailTaskList[0].user.displayName,
        totalTasks: emailTaskList.length,
        pendingTasks: pendingTasks.length,
        compeletedTasks: emailTaskList.length - pendingTasks.length,
      };

      const completedTasks = emailTaskList.filter((task) => {
        return task.isDone === true;
      });

      let userstasksList: UserData = {
        email: email,
        displayName: emailTaskList[0].user.displayName,
        tasks: emailTaskList,
        completedTasks: completedTasks,
        pendingTasks: pendingTasks,
      };

      tempCardsList.push(usersCard);
      tempTasksList.push(userstasksList);
    }
    this.usersCardList = tempCardsList;
    this.usersTaskList = tempTasksList;
  }

  getUsersList() {
    return this.usersCardList.slice();
  }

  selectedUserList(email) {
    let selectedUser = this.usersTaskList.find((ex) => ex.email === email);
    return selectedUser;
  }

  deletetasks(email) {
    let selectedUser = this.selectedUserList(email);
    if (selectedUser) {
      selectedUser.tasks.forEach((task) =>
        this.db.collection('tasks').doc(task.id).delete()
      );
    }
  }
}
