'use strict'

const User = use("App/Models/User");

class UserController {

    generateKey(length = 16) {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

        let str = "";

        for (let i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }

        return str;
    }

  async store({ request, response }) {
    const user = new User();

    const key = this.generateKey(16);

    user.name = request.all().name;
    user.key = key;
    // user.key = await auth.generate(user);
    await user.save();

    return response.status(200).json({"name": user.name, "id": user.id, "key": key});
  }

  async update({ response, request }) {
    try {
        request.user.name = request.all().name;
        await request.user.save();

        return response.status(200).json({"name": request.all().name});

    } catch (error) {
      return response.status(500);
    }
  }
}

module.exports = UserController
