import { AfterContentInit, Component, ViewChild } from '@angular/core';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'users-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements AfterContentInit {
  cols: number;

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
}
