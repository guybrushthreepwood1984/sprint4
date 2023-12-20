// = MAIN to start app
// import routes here

import express from 'express';
import router from './interfaces/routes/routerToDoList';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);
app.use('/', router);
app.use(express.json());

const PORT = 3000;
app.listen(PORT);
console.log(`Server listening on ${PORT}`);
