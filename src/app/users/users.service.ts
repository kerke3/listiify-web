import { Subject } from 'rxjs';
import { UserCard, UserData } from './users.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserCardService {
  userCardChosen = new Subject<UserData>();
  private usersCardList: UserCard[] = [
    {
      email: 'anas1@gmail.com',
      displayName: 'Anas Mohammed',
      isAdmin: true,
      totalTasks: 12,
      compeletedTasks: 10,
      pendingTasks: 2,
    },
    {
      email: 'anas2@gmail.com',
      displayName: 'Anas Mohammed',
      isAdmin: true,
      totalTasks: 12,
      compeletedTasks: 10,
      pendingTasks: 2,
    },
    {
      email: 'anas3@gmail.com',
      displayName: 'Anas Mohammed',
      isAdmin: true,
      totalTasks: 12,
      compeletedTasks: 10,
      pendingTasks: 2,
    },
    {
      email: 'anas4@gmail.com',
      displayName: 'Anas Mohammed',
      isAdmin: true,
      totalTasks: 12,
      compeletedTasks: 10,
      pendingTasks: 2,
    },
  ];

  getUsersList() {
    return this.usersCardList.slice();
  }

  private selectedUserCard: UserCard;

  findUser(selectedEmail: String, selectOrDelete: boolean) {
    this.selectedUserCard = this.usersCardList.find(
      (ex) => ex.email === selectedEmail
    );
    if (selectOrDelete) {
      this.userCardChosen.next({
        email: this.selectedUserCard.email,
        displayName: this.selectedUserCard.displayName,
        isAdmin: this.selectedUserCard.isAdmin,
      });
    } else {
      this.userCardChosen.next(null);
    }
  }

  deleteUser() {}
}
