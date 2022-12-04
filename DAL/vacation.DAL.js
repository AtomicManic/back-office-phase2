
const vacation = require("./../modules/vacation.module");

const vacations = {
    "vacations": [
        {
            "id": 1,
            "employee_id": 208921145,
            "start_date": "11/03/2022",
            "end_date": "11/15/2022",
            "status": "approved"
        },
        {
            "id": 2,
            "employee_id": 208921145,
            "start_date" :"07/04/2022",
            "end_date": "07/09/2022",
            "status": "approved"
        },
        {
            "id": 3,
            "employee_id": 208922345,
            "start_date" :"08/04/2022",
            "end_date": "08/09/2022",
            "status": "approved"
        }
    ]
}

    const getVacations = () => {

    return vacations;

}

    const getVacation = (id) => {

        if(id == null) {
            return ({message: "invalid ID"});
        }

        //const foundVacation = vacation.findOne({ id: id });
        //return foundVacation;

        /*

        const result = vacations.vacations.find((vacation) => vacation.id === parseInt(id));
        return result;

         */
    }

    const getEmployeeVacations = (employeeId) => {

        if(employeeId == null) {
            return ({message: "invalid ID"});
        }
        const result = vacations.vacations.filter((vacation) => vacation.employee_id === parseInt(employeeId));

        if(result === undefined) {
            return ({message: "No vacations listed from this employee!"});
        }
        return result;
    }

    const UpdateVacation = (vacationId) => {

        const result = getVacation(vacationId);
        if(result === undefined) {
            return ({message: "vacation not found"});
        }
        if(result.status === "approved") {
            return ({ message: "changed to cancelled"})
        }
        else return ({message: "already cancelled!"})
    }

    const postVacation = (vacationDetails) => {

        if(vacationDetails == null) {
            return ({ message: "something went wrong.."})
        }

        const { employee_id,start_date,end_date } = vacationDetails;

        const newVacation = new vacation ({
            "employee_id": employee_id,
            "start_date": start_date,
            "end_date": end_date,
            "status": "approved"
        });

        const result = newVacation.save();

        if (result) {
            return ({
                message: "success!"
            })
        }

        else {
            return ({
                message: "error"
            })
        }
    }

    const vacationErrorHandler = (req, res, head, message) => {
        res.status(head);
        res.json({message: message});
        res.end();
    }


module.exports = {
    getVacations,
    getVacation,
    getEmployeeVacations,
    UpdateVacation,
    postVacation,
    vacationErrorHandler
};
