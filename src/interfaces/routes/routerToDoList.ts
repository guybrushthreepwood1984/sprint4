// Las rutas definen las rutas HTTP de tu aplicación.
// Aquí debería ir la lógica, el trabajo lo hace el controlodar. Aquí, por ser un proyecto tan pequeño, no hace falta separarlo.

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
    return myHttpResponse.NotFound(res, e);
  }
});

router.post('/:taskToAdd', (req, res) => {
  const taskToAdd = req.params.taskToAdd;
  const data = `Task ${taskToAdd} added to list.`;
  try {
    myList.addTask(taskToAdd);
    return myHttpResponse.Ok(res, data);
  } catch (e) {
    if (e instanceof Error) {
      return myHttpResponse.NotFound(res, e.message);
    }
  }
});

//handling the error could be done directly in try-catch, if-block is not necessary)
router.put('/:taskMarkAsDone', (req, res) => {
  const taskMarkAsDone = req.params.taskMarkAsDone;
  const taskIsOnList = myList.lookedForTaskIsOnList(taskMarkAsDone);
  if (taskIsOnList) {
    try {
      myList.markAsDone(taskMarkAsDone);
      const data = `${taskMarkAsDone} successfully marked as done`;
      return myHttpResponse.Ok(res, data);
    } catch (e) {
      if (e instanceof Error) {
        return myHttpResponse.NotFound(res, e.message);
      } else {
        return myHttpResponse.NotFound(res, 'An error occurred');
      }
    }
  } else {
    return myHttpResponse.NotFound(res, `Task ${taskMarkAsDone} not found`);
  }
});

// Alternative with error-handling
// router.put('/:taskMarkAsDone', (req, res) => {
//   const taskMarkAsDone = req.params.taskMarkAsDone;
//   try {
//     myList.markAsDone(taskMarkAsDone);
//     const data = `${taskMarkAsDone} successfully marked as done`;
//     return myHttpResponse.Ok(res, data);
//   } catch (e) {
//     console.error(`error ${e}`);
//     if (e.message === `Task ${taskMarkAsDone} not found`) {
//       return myHttpResponse.NotFound(res, e.message);
//     } else if (e.message === `Task ${taskMarkAsDone} is already marked as done`) {
//       return myHttpResponse.BadRequest(res, e.message);
//     } else {
//       return myHttpResponse.InternalServerError(res, e.message);
//     }
//   }
// });

router.delete('/:taskToDelete', (req, res) => {
  const taskToDelete = req.params.taskToDelete;
  const data = `Task ${taskToDelete} successfully deleted`;
  try {
    myList.deleteTask(taskToDelete);
    return myHttpResponse.SuccessfullyDeleted(res, data);
  } catch (e) {
    if (e instanceof Error) {
      return myHttpResponse.NotFound(res, e.message);
    } else {
      return myHttpResponse.NotFound(res, 'An error occurred');
    }
  }
});

export default router;
