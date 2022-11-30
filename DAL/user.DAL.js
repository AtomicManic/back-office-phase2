const User = require("./../modules/user.module");

const addNewUser = async (user) => {
  const newUser = User.create(user);
  return newUser;
};

module.exports = {
  addNewUser: addNewUser,
};
