'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments();
      table.string('name', 20).notNullable();
      table.text('key').notNullable().unique();
      table.timestamps();
    })
  }

  down () {
    this.drop('users');
  }
}

module.exports = UserSchema;
