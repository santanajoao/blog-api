const express = require('express');
const { UserController } = require('./controllers');
const middlewares = require('./middlewares');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post(
  '/login',
  middlewares.checkForEmailAndPassword,
  UserController.handlePostLogin,
);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
