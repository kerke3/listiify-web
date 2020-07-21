import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-task-for-user',
  template: `<h3 mat-dialog-title>
      This will add a task for:
    </h3>
    <mat-dialog-content>
      <p>{{ passedData }}</p>
    </mat-dialog-content>
    <form [formGroup]="newForm" fxLayoutAlign="center" fxLayout width="100%">
      <mat-form-field>
        <input formControlName="taskName" matInput placeholder="Task Name" />
        <mat-error *ngIf="taskName.hasError('required')">
          Task name is required.</mat-error
        >
      </mat-form-field>
    </form>
    <mat-dialog-actions fxLayoutAlign="center">
      <button
        mat-raised-button
        [mat-dialog-close]="newForm"
        color="primary"
        [disabled]="newForm.invalid"
      >
        Add
      </button>
    </mat-dialog-actions>`,
})
export class AddTaskComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

  newForm = new FormGroup({
    taskName: new FormControl('', [Validators.required]),
  });

  get taskName() {
    return this.newForm.get('taskName');
  }
}
