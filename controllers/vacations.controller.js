
const { vacationsService } = require("../DAL/vacation.DAL");
const { usersService } = require("../DAL/users.DAL");
const { validateVacationDays } = require("../module/vacation.module");

exports.vacationsController = {

    getVacations(req, res) {
        res.json(vacationsService.getVacations());
    },

    getVacationDetails(req, res) {
        console.log("get vacation details");
        const id = req.params.id;
        console.log(id);
        res.json(vacationsService.getVacationDetails(id));
    },

    getAllEmployeeVacations(req,res) {
        console.log("get employee's vacations list");
        const employeeId = req.params.employee_id;
        console.log(employeeId);
        res.json(vacationsService.getAllEmployeeVacations(employeeId));
    },


    UpdateVacationStatus(req, res) {
        const vacationId = req.params.vacationId;
        console.log("update status..");
        res.json(vacationsService.UpdateVacationStatus(vacationId));
    },

    createNewVacation(req,res) {

       const employeeId = req.params.id;
       const vacationDetails = req.body;
       const status = "approved";

       const employee = usersService.getUserDetails(employeeId);
       const vacations = vacationsService.getVacations();

       if(employee.role === 'manager') {
        res.json(vacationsService.createNewVacation(vacationDetails , status));
        console.log("manager approval! --> vacation status: approved!")
           //user's role == employee
    } else {
           //function validateVacationDays(start_date, end_date , user , vacations)
           validateVacationDays(vacationDetails.start_date , vacationDetails.end_date ,employee , vacations);
       }
    }
}