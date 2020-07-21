import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserCardService } from './users.service';
import { UserCard } from './users.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  dataList: Observable<any[]>;
  userscardList: UserCard[] = [];
  usersCardSubscription: Subscription;
  constructor(
    private userCardService: UserCardService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.usersCardSubscription = this.userCardService.cardListsChanged.subscribe(
      (usersCards) => (this.userscardList = usersCards)
    );
    this.userCardService.fetchFirestoreData();
  }

  onCardChosen(email) {
    // this.userCardService.findUser(email, true);
  }

  onCardDelete(email) {
    this.userCardService.deletetasks(email);
  }

  ngOnDestroy() {
    this.usersCardSubscription.unsubscribe();
  }
}
