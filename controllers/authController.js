const { users } = require('../models');
const generateToken = require('../config/generateToken');
const { hashPassword, comparePassword } = require('../config/bcrypt');
const { errorResponse, successResponse, internalErrorResponse, notFoundResponse, validationErrorResponse } = require('../config/responseJson');
const { users } = require('../models');
const { hash } = require('bcryptjs');


async function register(req, res) {
    const { username, email, password } = req.body

    try {
      // cek email sudah ada atau belum?
      // jika sudah ada maka tidak boleh terisi kembali.
      const existingEmail = await users.findOne({
        where: {
          email
        }
      });
      if(existingEmail) errorResponse(res, 'Email already exists', 400);
      // jika belum ada, maka dibuat
      const hashedPassword = await hashPassword(password);
      // insert into users (username, email, password) values(?, ?, ?)
      const user = await users.create({
        username,
        email,
        password: hashedPassword
      });
      const userResponse = {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updateAt:user.updateAt,
      };
      successResponse(res, 'Register successfully', userResponse);
    } catch (error) {
      console.error(error);
      internalErrorResponse(res, error);
    }
}