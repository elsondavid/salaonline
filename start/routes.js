'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.post('/aluno/registrar','StudentController.store')
Route.post('/professor/registrar','ProfessorController.store')
Route.post('/aluno/autenticar','StudentController.authenticated')
Route.post('/professor/autenticar','ProfessorController.authenticated')
Route.post('/sala/registrar','ClassroomController.store')
Route.put('/sala/adicionaraluno/:id','ClassroomController.addStudent')
Route.get('/sala/mostrarsala/:id','ClassroomController.show')
Route.put('/sala/atualizar/:id','ClassroomController.update')

Route.group(()=>{
  Route.resource('aluno','StudentController').apiOnly()
  Route.resource('professor','ProfessorController').apiOnly()
} 
)