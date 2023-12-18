//  Las rutas definen las rutas HTTP de tu aplicación.
// aquí debería ir la lógica, el trabajo lo hace el controlodar. Aquí, por ser un proyecto tan pequeño, no hace falta separarlo.

import express from 'express';
import toDoListMethods from '../../application/todoListmethods';
import HttpResponse from './http.response';

const router = express.Router();
const myList = new toDoListMethods();
const myHttpResponse = new HttpResponse();
router.get('/', (req, res) => {
  const data = myList.showTasks();
  try {
    return myHttpResponse.Ok(res, data);
  } catch (e) {
    console.error(`error ${e}`);
    return myHttpResponse.NotFound(res, e);
  }
});

router.post('/:taskToAdd', (req, res) => {
  const taskToAdd = req.params.taskToAdd;
  myList.addTask(taskToAdd);
  res.status(200).send(`Task ${taskToAdd} added to list.`);
});

router.put('/:taskMarkAsDone', (req, res) => {
  const taskMarkAsDone = req.params.taskMarkAsDone;
  const taskIsOnList = myList.lookedForTaskIsOnList(taskMarkAsDone);
  if (taskIsOnList) {
    try {
      myList.markAsDone(taskMarkAsDone);
      const data = `${taskMarkAsDone} successfully marked as done`;
      return myHttpResponse.Ok(res, data);
    } catch (e) {
      console.error(`error ${e}`);
      return myHttpResponse.NotFound(res, e);
    }
  } else {
    return myHttpResponse.NotFound(res, `Task ${taskMarkAsDone} not found`);
  }
});

router.delete('/:taskToDelete', (req, res) => {
  const taskToDelete = req.params.taskToDelete;
  myList.deleteTask(taskToDelete);
  res.status(200).send(`Task ${taskToDelete} successfully deleted`);
});

export default router;
