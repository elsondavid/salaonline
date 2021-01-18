'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Classroom = use('App/Models/Classroom')
/**
 * Resourceful controller for interacting with classrooms
 */
class ClassroomController {
  /**
   * Show a list of all classrooms.
   * GET classrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new classroom.
   * GET classrooms/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new classroom.
   * POST classrooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {students, ...data } = request.only(['room_number','classroom_capacity','classroom_available','professor_id', 'students'])
    const classroom = await Classroom.create(data)
    if (students && students.length>0){
      await classroom.students().attach(students)
      await classroom.load('students')        

    }
    return classroom
  }
   // put  
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

   // delete  
   async excludeStudent ({ params, request, response}) {
    const students = request.only(['student'])
    const classroom = await Classroom.findOrFail(params.id)
    if (students && students.length>0 && classroom.classroom_available){
      await classroom.students().sync(students)
      await classroom.load('students')        
    }
    classroom.merge(data);
    await classroom.save();
    return students
  
  }

  /**
   * Display a single classroom.
   * GET classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
  async show ({ params, request, response, view }) {
    const classroom = await Classroom.findOrFail(params.id)
    return classroom
  }

  /**
   * Render a form to update an existing classroom.
   * GET classrooms/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update classroom details.
   * PUT or PATCH classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['room_number','classroom_capacity','classroom_available','professor_id'])
    const classroom = await Classroom.findOrFail(params.id)

    classroom.merge(data);
    await classroom.save();
    return classroom
  
  }

  /**
   * Delete a classroom with id.
   * DELETE classrooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ClassroomController
