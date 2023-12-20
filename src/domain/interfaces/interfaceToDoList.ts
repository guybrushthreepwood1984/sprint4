import Task from '../entities/task';

export default interface IToDoList {
  myToDoList: Task[];
  addTask: (nameOfTask: string) => void;
  showTasks: () => Task[];
  markAsDone: (searchedTask: string) => void;
  deleteTask: (searchedTask: string) => void;
}
