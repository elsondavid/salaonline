'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassroomStudentSchema extends Schema {
  up () {
    this.create('classroom_student', (table) => {
      table.increments()
      table.integer('classroom_id').unsigned().references('classrooms.id').onDelete('cascade').index('classroom_id')
      table.integer('student_id').unsigned().references('students.id').onDelete('cascade').index('student_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('classroom_student')
  }
}

module.exports = ClassroomStudentSchema
