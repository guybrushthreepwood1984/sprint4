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

  showTasks() {
    return this.myToDoList;
  }
  markAsDone(searchedTask: string) {
    const lookedForTask = this.myToDoList.find((task) => {
      if (task.title === searchedTask) {
        task.done = true;
        return 1;
      } else {
        return undefined;
      }
    });
    if (lookedForTask === undefined) {
      console.log(`${searchedTask} is not on the list`);
      return;
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

const myList = new toDoListMethods();
myList.addTask('lavadora');
myList.addTask('pañales');
myList.addTask('fregar platos');
myList.markAsDone('fregar platos');
myList.addTask('otra maldita lavadora');
console.log(myList.showTasks());
myList.deleteTask('pañales');
console.log(myList.showTasks());
myList.deleteTask('fregar platos');
console.log(myList.showTasks());
