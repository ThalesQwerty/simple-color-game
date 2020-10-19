'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScoreSchema extends Schema {
  up () {
    this.create('scores', (table) => {
      table.increments();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('score').notNullable().unsigned();
      table.timestamps();
    })
  }

  down () {
    this.drop('scores');
  }
}

module.exports = ScoreSchema;
