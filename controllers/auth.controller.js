const User = require("./../modules/user.module");
const registerValidator = require("./../validators/register.validator");
const { addNewUser } = require("./../DAL/user.DAL");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { dbSecretFields } = require("./../config/config");

exports.register = async (req, res) => {
  const validationResult = registerValidator(req.body);
  try {
    if (!validationResult) {
      return res.status(400).json({ message: validationResult });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = { ...req.body, password: hashedPassword };

    const addedUser = await addNewUser(user);

    req.session.userId = addedUser._id;
    req.session.userRole = addedUser.role;

    return res.status(201).json({
      message: "user added successfully!",
      user: _.omit((await addedUser).toObject(), dbSecretFields),
    });
  } catch (error) {
    res.status(400).json({ message: "Register unsuccessful..." });
  }
};
