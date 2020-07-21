import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task.component';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { UserCard, UserData } from './../users/users.model';
import { Subscription } from 'rxjs';
import { UserCardService } from './../users/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  userSubscription: Subscription;
  tasksUser: UserData;
  userTaskList: Task[] = [];
  toggleOn: boolean = false;
  setColor: string = 'primary';
  constructor(
    private dialog: MatDialog,
    private userTaskService: TasksService,
    private userCardService: UserCardService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userCardService.userCardChosen.subscribe(
      (user) => {
        this.tasksUser = user;
        console.log(user);
      }
    );
    this.userTaskList = this.userTaskService.getTasksList();
  }

  onToggleOn($event) {
    this.toggleOn = !this.toggleOn;
    if (this.setColor === 'primary') {
      this.setColor = 'warn';
    } else {
      this.setColor = 'primary';
    }
  }

  onTaskChecked(taskId) {
    console.log(taskId);
  }

  onTaskDelete(taskId) {
    console.log(taskId);
  }

  email: String = 'anas@gmail.com';

  onAdd() {
    const dialogRef = this.dialog.open(AddTaskComponent, { data: this.email });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result.value); // TODO: if closed improperly, value will come null , check before creating
    });
  }
}
