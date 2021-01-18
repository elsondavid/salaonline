'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassroomSchema extends Schema {
  up () {
    this.create('classrooms', (table) => {
      table.increments()
      table.integer('room_number').notNullable().unique()
      table.integer('classroom_capacity').notNullable()
      table.boolean('classroom_available').notNullable()
      table.integer('professor_id').unsigned().references('professors.id').onDelete('cascade').index('professor_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('classrooms')
  }
}

module.exports = ClassroomSchema
