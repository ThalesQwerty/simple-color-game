'use strict'

const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    const data = request.only(["name"]);

    const user = new User();
    user.name = data.name;
    user.key = await auth.generate(user)
    user.save();

    return response.status(200).json({"id": user.id, "key": accessToken});
  }

  async update({ request, auth }) {
    try {
      const data = request.only(["name"]);
      const user = auth.user;

      user.merge(data);
      await user.save();

      return user;
    } catch (error) {
      return response.status(500).send({ error });
    }
  }
}

module.exports = UserController
