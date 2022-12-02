const express = require('express')
//reference for controller
const { usersController } = require('../controllers/users.controller');


//create an instance of express.router - router that handles users
usersRouter = new express.Router();


// localhost:8081/api/users
usersRouter.get('/' , usersController.getUsers);

//with id param on path --> localhost:8081/api/users/email
usersRouter.get('/:id' , usersController.getUserDetails);

//localhost:8081/api/users  (pass info in req.body)
//usersRouter.post('/' , usersController.addUser);
/*
//localhost:8081/api/users/1  (pass info in req.body)
usersRouter.put('/:id', usersController.updateUser);

//localhost:8081/api/users
usersRouter.delete('/:id', usersController.deleteUser);

*/
module.exports = { usersRouter };
