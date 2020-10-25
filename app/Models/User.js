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

  static get hidden () {
    return ['key', 'created_at', 'updated_at']
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
