const express = require('express')
//reference for controller
const { vacationsController } = require('../controllers/vacations.controller');


//create an instance of express.router - router that handles users
vacationsRouter = new express.Router();

// list methods for each path (handled by userRouter --> users controller)

// localhost:4000/api/vacations
vacationsRouter.get('/' , vacationsController.getVacations);

//localhost:4000/api/vacations/id
vacationsRouter.get('/:id' , vacationsController.getVacationDetails);

//localhost:4000/api/vacations/users
vacationsRouter.get('users/:userId' , vacationsController.getAllEmployeeVacations);

//localhost:4000/api/vacations/vacationId
vacationsRouter.put('/:vacationId' , vacationsController.UpdateVacationStatus);

vacationsRouter.post('/:id' , vacationsController.createNewVacation); //by using session req.params can be deleted.

//localhost:8081/api/users
//vacationsRouter.delete('/:email/:start_data', vacationsController.deleteVacation);


module.exports = { vacationsRouter };

