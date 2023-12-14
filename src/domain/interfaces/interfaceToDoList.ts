import Task from '../entities/task';

export default interface ToDoListFunctions {
  myToDoList: Task[];
  addID: () => number;
  addTask: (nameOfTask: string) => void;
  showTasks: () => Task[];
  markAsDone: () => void;
  deleteTask: () => void;
}
