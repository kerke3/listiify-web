import {
  AfterContentInit,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { UserCard } from './../../users/users.model';

@Component({
  selector: 'users-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements AfterContentInit {
  cols: number;
  toggleOn: boolean = false;
  setColor: string = 'primary';
  @Input() usersCardList: UserCard[];
  @Output() cardChosen = new EventEmitter();
  @Output() cardDelete = new EventEmitter();

  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1,
  };

  constructor(private observableMedia: MediaObserver) {}

  ngAfterContentInit() {
    this.observableMedia.media$.subscribe((change: MediaChange) => {
      this.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  onToggleOn($event) {
    this.toggleOn = !this.toggleOn;
    if (this.setColor === 'primary') {
      this.setColor = 'warn';
    } else {
      this.setColor = 'primary';
    }
  }

  onCardClick(email) {
    this.cardChosen.emit(email);
  }

  onCardDelete(email) {
    this.cardDelete.emit(email);
  }
}
