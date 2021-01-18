'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.string('student_name', 80).notNullable().unique()
      table.string('student_email', 254).notNullable().unique()
      table.string('student_registration', 20).notNullable().unique()
      table.string('student_password', 60).notNullable()
      table.date('student_date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = StudentSchema
