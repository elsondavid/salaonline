'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Student = use('App/Models/Student')

class StudentController {

  //RF01: Permitir que aluno se cadastre na aplicação. 
  async store ({ request, response }) {
    const data = request.only(['student_name', 'student_email', 'student_registration', 'student_date','student_password'])
    const student = await Student.create(data)
    return student
  }

 // RF04: Permitir que aluno consulte seus dados de cadastro
  async show ({ params}) {
    const student = await Student.findOrFail(params.id)
    return student
  }

  //RF02: Permitir que aluno edite seus dados de cadastro.
  async update ({ params, request}) {
    const data = request.only(['student_name', 'student_email', 'student_registration', 'student_date']);
    const student = await Student.findOrFail(params.id)
    
    student.merge(data);
    await student.save();
    console.log('editou aluno')
    return student
  }

//RF03: Permitir que aluno exclua seus dados de cadastro.  
  async destroy ({ params}) {
    const student = await Student.findOrFail(params.id)
    await student.delete();
  }
}

module.exports = StudentController
