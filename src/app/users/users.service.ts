import { Subject } from 'rxjs';
import { UserCard } from './users.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserCardService {
  userCardChosen = new Subject<UserCard>();
  private usersCardList: UserCard[] = [
    {
      email: 'anas@gmail.com',
      displayName: 'Anas Mohammed',
      isAdmin: true,
      totalTasks: 12,
      compeletedTasks: 10,
      pendingTasks: 2,
    },
    {
      email: 'anas@gmail.com',
      displayName: 'Anas Mohammed',
      isAdmin: true,
      totalTasks: 12,
      compeletedTasks: 10,
      pendingTasks: 2,
    },
    {
      email: 'anas@gmail.com',
      displayName: 'Anas Mohammed',
      isAdmin: true,
      totalTasks: 12,
      compeletedTasks: 10,
      pendingTasks: 2,
    },
    {
      email: 'anas@gmail.com',
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

  findUser(selectedEmail: String) {
    this.selectedUserCard = this.usersCardList.find(
      (ex) => ex.email === selectedEmail
    );
    this.userCardChosen.next({ ...this.selectedUserCard });
  }
}
