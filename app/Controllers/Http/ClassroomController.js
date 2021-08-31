'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Classroom = use('App/Models/Classroom')

class ClassroomController {

//RF09: Permitir que professor cadastre uma nova sala.
  async store ({ request, response }) {
    const {students, ...data } = request.only(['room_number','classroom_capacity','classroom_available','professor_id', 'students'])
    const classroom = await Classroom.create(data)
    if (students && students.length>0){
      await classroom.students().attach(students)
      await classroom.load('students')        

    }
    return classroom
  }
 
  //RF13: Permitir que professor aloque um aluno em uma sala.
  async addStudent ({ params, request, response}) {
    const {students, ...data } = request.only(['students'])
    const classroom = await Classroom.findOrFail(params.id)
    if (students && students.length>0 && classroom.classroom_available){
      await classroom.students().attach(students)
      await classroom.load('students')        
    }
    classroom.merge(data);
    await classroom.save();
    return classroom
  
  }

  //RF14: Permitir que professor remova o aluno de uma sala.
   async excludeStudent ({ params, request, response}) {
    const {students} = request.only(['student_id'])
    const classroom = await Classroom.findOrFail(params.classroom_id)
    await classroom.students().detach(students)
  }

//RF12: Permitir que professor consulte os dados de uma sala.
  async show ({ params, request, response, view }) {
    const classroom = await Classroom.findOrFail(params.id)
   
    return classroom
  }

//RF10: Permitir que professor edite os dados de uma sala.
  async update ({ params, request, response }) {
    const data = request.only(['room_number','classroom_capacity','classroom_available','professor_id'])
    const classroom = await Classroom.findOrFail(params.id)

    classroom.merge(data);
    await classroom.save();
    return classroom
  }
   
  //RF11: Permitir que professor exclua os dados de uma sala. ok feito
  async destroy ({ params}) {
    const classroom = await Classroom.findOrFail(params.id)
    await classroom.delete();
  }

  // async getallStudentclassroom({ params }){
  //   const classroom = await Classroom.findOrFail(params.classroom_id)
  //   console.log('chegou aqui')
  //   await classroom.query()
  //   .preload('')
  //   return classroom
  // }

}

module.exports = ClassroomController
