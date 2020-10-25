'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Score extends Model {
  static boot() {
    super.boot();
  }

  static get hidden () {
    return ['user_id', 'updated_at']
  }

    /**
   *
   * @method user
   *
   * @return {Object}
   */
  user() {
    return this.belongsTo('App/Models/User')
  }


}

module.exports = Score;
