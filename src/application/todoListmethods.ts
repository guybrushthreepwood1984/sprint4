import Task from './../domain/entities/task';
import ToDoList from './../domain/entities/todoList';
import IToDoList from './../domain/interfaces/interfaceToDoList';

export default class toDoListMethods extends ToDoList implements IToDoList {
  myToDoList: Task[] = [];

  addTask(nameOfTask: string) {
    if (!nameOfTask) {
      throw new Error(`Task name is required.`);
    }
    const ids = this.myToDoList.map((task) => task.id);
    const maxID = ids.length > 0 ? Math.max(...ids) : 0;
    const addedTask = new Task(nameOfTask);
    addedTask.id = maxID + 1;
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
    if (this.myToDoList.length === undefined) {
      throw new Error('ToDoList is undefined.');
    }
    return this.myToDoList;
  }

  markAsDone(taskMarkAsDone: string) {
    const lookedForTask = this.lookedForTaskIsOnList(taskMarkAsDone);
    if (!lookedForTask) {
      throw new Error(`Task ${taskMarkAsDone} not found.`);
    }
    if (lookedForTask.done) {
      throw new Error(`Task ${taskMarkAsDone} is already marked as done.`);
    }
    this.myToDoList.find((task) => {
      if (task.title === taskMarkAsDone) {
        task.done = true;
        return;
      }
    });
  }

  //Una buena alternativa sería con array.filter excluyendo la taska buscada
  deleteTask(searchedTask: string) {
    const index = this.myToDoList.findIndex(
      (task) => task.title === searchedTask
    );
    if (index === -1) {
      throw new Error(`Task ${searchedTask} not found.`);
    } else {
      this.myToDoList.splice(index, 1);
    }
  }
}
