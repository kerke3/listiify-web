import { Component } from '@angular/core';

@Component({
  selector: 'add-task-for-user',
  template: `<h1 mat-dialog-title>
      This will add a Task for User anas@gmail.com
    </h1>
    <mat-dialog-actions>
      <button mat-button>Add</button>
    </mat-dialog-actions>`,
})
export class AddTaskComponent {}
