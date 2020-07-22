import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task.component';
import { Task, TaskObj } from './tasks.model';
import { TasksService } from './tasks.service';
import { UserCard, UserData } from './../users/users.model';
import { Subscription } from 'rxjs';
import { UserCardService } from './../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  allUsersTaskDataSubscription: Subscription;
  usersEmail: String;
  displayName: String;
  linkEmail: any;
  userTasksList: Task[];
  userTasksCompleted: Task[];
  userTasksPending: Task[];
  toggleOn: boolean = false;
  setColor: string = 'primary';

  constructor(
    private dialog: MatDialog,
    private userTaskService: TasksService,
    private userCardService: UserCardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let email = params.get('email');
      this.linkEmail = email;
    });

    if (!this.linkEmail) {
      this.router.navigate(['404']);
    }

    this.userCardService.fetchFirestoreData();
    this.allUsersTaskDataSubscription = this.userCardService.allUserTasksChanged.subscribe(
      (allUserTasksData) => {
        let userTasksData = allUserTasksData.find(
          (ex) => ex.email === this.linkEmail
        );
        if (userTasksData) {
          this.usersEmail = userTasksData.email;
          this.displayName = userTasksData.displayName;
          this.userTasksList = userTasksData.tasks;
          this.userTasksCompleted = userTasksData.completedTasks;
          this.userTasksPending = userTasksData.pendingTasks;
        } else {
          this.usersEmail = '';
          this.displayName = '';
          this.userTasksList = [];
          this.userTasksCompleted = [];
          this.userTasksPending = [];
        }
      }
    );
  }

  onToggleOn($event) {
    this.toggleOn = !this.toggleOn;
    if (this.setColor === 'primary') {
      this.setColor = 'warn';
    } else {
      this.setColor = 'primary';
    }
  }

  onTaskChecked(taskDetails) {
    this.userTaskService.checkTask(taskDetails);
  }

  onTaskDelete(taskId) {
    this.userTaskService.deleteTask(taskId);
  }

  ngOnDestroy() {
    this.allUsersTaskDataSubscription.unsubscribe();
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: this.linkEmail,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // TODO: if closed improperly, value will come null , check before creating
      if (result.value) {
        let taskObj = {
          name: result.value.taskName,
          isDone: false,
          user: {
            displayName: this.displayName,
            email: this.linkEmail,
          },
        };
        this.userTaskService.addTask(taskObj);
      }
    });
  }
}
