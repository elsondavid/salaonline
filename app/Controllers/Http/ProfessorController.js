'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const  Professor = use('App/Models/Professor')


/**
 * Resourceful controller for interacting with professors
 */


class ProfessorController {

  async authenticated({request, auth}){
    const {professor_email, professor_password } = request.all();
    const token = await auth.attempt(professor_email, professor_password);
    return token; 
  }



  /**
   * Show a list of all professors.
   * GET professors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new professor.
   * GET professors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new professor.
   * POST professors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['professor_name', 'professor_email', 'professor_registration', 'professor_date','professor_password'])
    const professor = await Professor.create(data)
    return professor

  }

  /**
   * Display a single professor.
   * GET professors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // //Get /professor/:id
   async show ({ params }) {
    const professor = await Professor.findOrFail(params.id)
    return professor
  }

  /**
   * Render a form to update an existing professor.
   * GET professors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update professor details.
   * PUT or PATCH professors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  //Put /professor/:id
   async update ({ params, request, response }) {
    const data = request.only(['professor_name', 'professor_email', 'professor_registration', 'professor_date']);
    const professor = await Professor.findOrFail(params.id)

    professor.merge(data);
    await professor.save();
    return professor
  }

  /**
   * Delete a professor with id.
   * DELETE professors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   //Delete /student/:id
   async destroy ({ params, request, response }) {
    const professor = await Professor.findOrFail(params.id)
    await professor.delete();
  }
}

module.exports = ProfessorController
