'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const  Professor = use('App/Models/Professor')

class ProfessorController {

  //RF05: Permitir que professor se cadastre na aplicação.
  async store ({ request, response }) {
    const data = request.only(['professor_name', 'professor_email', 'professor_registration', 'professor_date','professor_password'])
    const professor = await Professor.create(data)
    return professor
  }

  //RF08: Permitir que professor consulte seus dados de cadastro.
   async show ({ params }) {
    const professor = await Professor.findOrFail(params.id)
    return professor
  }

  //Permitir que professor edite seus dados de cadastro  
   async update ({ params, request, response }) {
    const data = request.only(['professor_name', 'professor_email', 'professor_registration', 'professor_date']);
    const professor = await Professor.findOrFail(params.id)

    professor.merge(data);
    await professor.save();
    return professor
  }

//Permitir que professor exclua seus dados de cadastro
  async destroy ({ params, request, response }) {
    const professor = await Professor.findOrFail(params.id)
    await professor.delete();
  }

  async authenticated({request, auth}){
    const {professor_email, professor_password } = request.all();
    const token = await auth.attempt(professor_email, professor_password);
    return token; 
  }

}

module.exports = ProfessorController
