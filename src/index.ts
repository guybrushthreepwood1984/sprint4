// = MAIN to start app
// import routes here

import express from 'express';
import router from './interfaces/routes/routerToDoList';

const app = express();

app.use('/', router);
const PORT = 3000;
app.listen(PORT);
console.log(`Server listening on ${PORT}`);
