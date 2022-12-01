const User = require("./../modules/user.module");

const addNewUser = async (user) => {
  const newUser = User.create(user);
  return newUser;
};

const getUserByEmail = async (req, res) => {
  const foundUser = User.findOne({ email: req.body.email });
  return foundUser;
};

const getUserById = async (req, res) => {
  const foundUser = User.findOne({ id: req.body._id });
  return foundUser;
};

module.exports = {
  addNewUser: addNewUser,
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
};
