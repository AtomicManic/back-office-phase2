
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

exports.vacationsService = {

    getVacations() {
        return vacations;
        },

    getVacationDetails(id) {

        const result = vacations.vacations.find((vacation) => vacation.id === parseInt(id));
        console.log(result);
        return result;
    },

    getAllEmployeeVacations(employeeId) {

        const result = vacations.vacations.filter((vacation) => vacation.employee_id === parseInt(employeeId));
        console.log(result);
        return result;
    },

    UpdateVacationStatus(vacationId) {
        console.log(vacationId);
        const result = this.getVacationDetails(vacationId);
        console.log(result);
        if(result.status === "approved") {
            return ({ message: "changed to cancelled"})
        }
        else return ({message: "already cancelled!"})
    },

    createNewVacation(vacationDetails , status ) {

        //this part here add the new vacation(that already approved to the vacations DB)
        const { employee_id,start_date,end_date } = vacationDetails;
        const validatedStatus = status;

        let length = vacations.vacations.length;
        console.log(length);

        const newVacation= {
            "id": ++length,
            "employee_id": employee_id,
            "start_date": start_date,
            "end_date": end_date,
            "status": `${validatedStatus}`
        }

        console.log(newVacation);
        return ({
            message: "success!"
        })
    }
}