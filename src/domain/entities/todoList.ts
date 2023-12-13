import { Task } from './task';

export class ToDoList {
  toDoList: Task[] = [];

  constructor(Task: Task) {
    this.toDoList.push(Task);
  }
}
