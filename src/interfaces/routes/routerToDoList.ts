//  Las rutas definen las rutas HTTP de tu aplicación.
// aquí debería ir la lógica, el trabajo lo hace el controlodar. Aquí, por ser un proyecto tan pequeño, no hace falta separarlo.

import express from 'express';
import toDoListMethods from '../../application/todoListmethods';

const router = express.Router();
const myList = new toDoListMethods();

router.get('/', (req, res) => {
  const tasks = myList.showTasks();
  res.status(200).json(tasks);
});

router.post('/:taskToAdd', (req, res) => {
  const taskToAdd = req.params.taskToAdd;
  myList.addTask(taskToAdd);
  res.status(200).send(`Task ${taskToAdd} added to list.`);
});

router.put('/:taskMarkAsDone', (req, res) => {
  const taskMarkAsDone = req.params.taskMarkAsDone;
  myList.markAsDone(taskMarkAsDone);
  res.status(200).send(`Task ${taskMarkAsDone} marked as completed.`);
});

router.delete('/:taskToDelete', (req, res) => {
  const taskToDelete = req.params.taskToDelete;
  myList.deleteTask(taskToDelete);
  res.status(200).send(`Task ${taskToDelete} successfully deleted`);
});

export default router;
