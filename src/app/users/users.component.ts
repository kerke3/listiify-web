import { Component, OnInit } from '@angular/core';
import { UserCardService } from './users.service';
import { UserCard } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userscardList: UserCard[] = [];
  constructor(private userCardService: UserCardService) {}

  ngOnInit(): void {
    this.userscardList = this.userCardService.getUsersList();
  }

  onCardChosen(email) {
    this.userCardService.findUser(email, true);
  }

  onCardDelete(email) {
    this.userCardService.findUser(email, false);
  }
}
