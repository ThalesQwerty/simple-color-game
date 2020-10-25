'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

const User = use("App/Models/User");


class VerifyKey {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params }, next) {
    const auth = request.header('Authorization');

    const id = params.id; //parseInt(auth.split(".")[0]);
    const key = auth ? auth.split(" ")[1] : ''; //auth.split(".")[1];

    const user = await User.find(id);
    if (!user) return response.status(404).json({"error": "User not found."})

    const isAuthorized = await Hash.verify(key, user.key);
    if (!isAuthorized) return response.status(401).json({"error": "Invalid key provided."})

    request.user = user;
    await next();
  }
}

module.exports = VerifyKey
