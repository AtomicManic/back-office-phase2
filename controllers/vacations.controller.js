const {vacationsService} = require("../DAL/vacation.DAL");
const {usersService} = require("../DAL/users.DAL");
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

    getAllEmployeeVacations(req, res) {
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

    async createNewVacation(req, res) {
        //const role = req.session.role; -->  get role of the request sender
        const employeeId = req.params.id;
        const vacationDetails = req.body;
        console.log(vacationDetails);
        const status = "approved";

        const employee = usersService.getUserDetails(employeeId);  //by using session --> this line can be deleted
        const vacations = vacationsService.getVacations();
        console.log(vacations);

        if (employee.role === 'manager') {
            res.json(vacationsService.createNewVacation(vacationDetails, status));
            console.log("manager approval! --> vacation status: approved!");

            //user's role == employee
        } else {
            const answer = await validateVacationDays(vacationDetails.start_date, vacationDetails.end_date, employee, vacations);
            if (answer.message === 'decline') {
                res.json(answer);
            }
            else {
                res.json(vacationsService.createNewVacation(vacationDetails, status));
            }
        }
    }
}