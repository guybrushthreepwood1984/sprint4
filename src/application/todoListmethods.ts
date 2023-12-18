import Task from './../domain/entities/task';
import ToDoList from './../domain/entities/todoList';
import ToDoListFunctions from './../domain/interfaces/interfaceToDoList';

export default class toDoListMethods
  extends ToDoList
  implements ToDoListFunctions
{
  myToDoList: Task[] = [];

  addTask(nameOfTask: string) {
    const addedTask = new Task(nameOfTask);
    addedTask.id = this.myToDoList.length + 1;
    this.myToDoList.push(addedTask);
  }

  lookedForTaskIsOnList(searchedTask: string) {
    const lookedForTask = this.myToDoList.find((task) => {
      if (task.title === searchedTask) {
        return true;
      } else {
        return false;
      }
    });
    return lookedForTask;
  }

  showTasks() {
    return this.myToDoList;
  }
  markAsDone(taskMarkAsDone: string) {
    const lookedForTask = this.lookedForTaskIsOnList(taskMarkAsDone);
    if (lookedForTask) {
      this.myToDoList.find((task) => {
        if (task.title === taskMarkAsDone) {
          task.done = true;
          return;
        }
      });
    }
  }

  deleteTask(searchedTask: string) {
    const index = this.myToDoList.findIndex(
      (task) => task.title === searchedTask
    );
    if (index) {
      this.myToDoList.splice(index, 1);
    }
  }
}
