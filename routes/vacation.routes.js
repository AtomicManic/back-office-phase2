const express = require('express')
//reference for controller
const { vacationsController } = require('../controllers/vacations.controller');

//create an instance of express.router - router that handles users
vacationsRouter = new express.Router();

// localhost:4000/api/vacations
vacationsRouter.get('/' , vacationsController.getAllVacations);

//localhost:4000/api/vacations/vacationId
vacationsRouter.get('/:id' , vacationsController.getVacationDetails);

//localhost:4000/api/vacations/vacationId
vacationsRouter.put('/:vacationId' , vacationsController.UpdateVacationStatus);

//localhost:4000/api/vacations/usersId
vacationsRouter.post('/:id' , vacationsController.createNewVacation); //by using session req.params can be deleted.

//localhost:4000/api/vacations/employee/employee (not sure if this is the right route)
vacationsRouter.get('/employee/:employee_id' , vacationsController.getAllEmployeeVacations);

module.exports = { vacationsRouter };

