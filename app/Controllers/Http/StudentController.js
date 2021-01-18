'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Student = use('App/Models/Student')
/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new student.
   * GET students/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

async authenticated({request, auth}){
  const {student_email, student_password } = request.all();
  const token = await auth.attempt(student_email,student_password);
  return token; 
}

  /**
   * Create/save a new student.
   * POST students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // Post / student
  async store ({ request, response }) {
    const data = request.only(['student_name', 'student_email', 'student_registration', 'student_date','student_password'])
    const student = await Student.create(data)
    return student
  }

  /**
   * Display a single student.
   * GET students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    //Get /student/:id
  async show ({ params}) {
    const student = await Student.findOrFail(params.id)
    return student
  }

  /**
   * Render a form to update an existing student.
   * GET students/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update student details.
   * PUT or PATCH students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  //Put /student/:id
  async update ({ params, request}) {
    const data = request.only(['student_name', 'student_email', 'student_registration', 'student_date']);
    const student = await Student.findOrFail(params.id)

    student.merge(data);
    await student.save();
    return student
  }

  /**
   * Delete a student with id.
   * DELETE students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  ////Delete /student/:id
  async destroy ({ params}) {
    const student = await Student.findOrFail(params.id)
    await student.delete();

  }
}

module.exports = StudentController
