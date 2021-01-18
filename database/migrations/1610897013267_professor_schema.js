'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessorSchema extends Schema {
  up () {
    this.create('professors', (table) => {
      table.increments()
      table.string('professor_name', 80).notNullable().unique()
      table.string('professor_email', 254).notNullable().unique()
      table.string('professor_registration', 20).notNullable().unique()
      table.string('professor_password', 60).notNullable()
      table.date('professor_date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('professors')
  }
}

module.exports = ProfessorSchema
