// = MAIN to start app
// import routes here

import express from 'express';
import router from './interfaces/routes/routerToDoList';
import cors from 'cors';
import HttpResponse from './interfaces/routes/http.response';
import basicAuth from 'express-basic-auth';

const app = express();
const myHttpResponse = new HttpResponse();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(
  basicAuth({
    users: { admin: 'supersecret' }
  })
);

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return myHttpResponse.Unauthorized(res, Error);
  } else {
    next();
  }
});

//Browser doesn't save anything, always calls server directly
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
});

app.use('/', router);
app.use(express.json());

const PORT = 3000;
app.listen(PORT);
console.log(`Server listening on ${PORT}`);
