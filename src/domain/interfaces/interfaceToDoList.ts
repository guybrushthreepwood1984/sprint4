import { Task } from '../entities/task';

export interface ToDoListFunctions {
  toDoList: Task[];
  addID: () => number;
  addTask: () => void;
  showTasks: () => Task[];
  markAsDone: () => void;
  deleteTask: () => void;
}
