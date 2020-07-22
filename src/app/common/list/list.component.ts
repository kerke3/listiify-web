import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/tasks/tasks.model';

@Component({
  selector: 'tasks-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  checked: boolean;
  @Input() userTasksList: Task[];
  @Input() toggleOn: boolean;
  @Output() taskChecked = new EventEmitter();
  @Output() taskDelete = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onChange($event, taskId) {
    this.checked = $event.checked;
    this.taskChecked.emit([taskId, this.checked]);
  }
  onTaskDelete(taskId) {
    this.taskDelete.emit(taskId);
  }
}
