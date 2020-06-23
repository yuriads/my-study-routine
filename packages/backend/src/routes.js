const express = require('express');

const UserController = require('./controllers/UserController');
const StudentController = require('./controllers/StudentController')
const SubjectController = require('./controllers/SubjectController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();//estamos colocando o módulo Router dentro de um variável

routes.post('/session', SessionController.create);


routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.create);
routes.delete('/students/:id', StudentController.delete);
routes.put('/students/:id', StudentController.update);

routes.get('/profile', ProfileController.index);

routes.get('/subjects', SubjectController.index);
routes.post('/subjects', SubjectController.create);
routes.delete('/subjects/:id', SubjectController.delete);
routes.put('/subjects/:id', SubjectController.update);

module.exports = routes;//exportando as rotas para elas ficarem acessíveis para o resto da aplicação