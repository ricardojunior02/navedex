const { Router } = require('express');
const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');
const naversController = require('./controllers/NaversController');
const projectsController = require('./controllers/ProjectsController');

const autenticate = require('./middlewares/autenticate');

const routes = Router();

// Cria Usuários novos
routes.post('/create-user', userController.store);

// Cria a sessão do usuário e gera o token JWT
routes.post('/create-session', sessionController.store);

// Rotas de acesso somente a users logados
routes.use(autenticate);

// CRUD de Navers
routes.get('/navers-list', naversController.index);
routes.get('/navers-show/:id', naversController.show);
routes.post('/navers-create', naversController.store);
routes.put('/navers-update/:id', naversController.update);
routes.delete('/navers-delete/:id', naversController.delete);

// CRUD de Projects
routes.get('/projects-list', projectsController.index);
routes.get('/projects-show/:id', projectsController.show);
routes.post('/projects-create', projectsController.store);
routes.put('/projects-update/:id', projectsController.update);
routes.delete('/projects-delete/:id', projectsController.delete);

module.exports = routes;