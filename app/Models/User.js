'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.key) {
        userInstance.key = await Hash.make(userInstance.key)
      }
    })
  }

  /**
   *
   * @method scores
   *
   * @return {Object}
   */
  scores() {
    return this.hasMany('App/Models/Score')
  }
}

module.exports = User;
