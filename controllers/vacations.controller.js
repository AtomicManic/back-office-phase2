
const {usersService} = require("../DAL/users.DAL");

const vacationsA = { //insert to mongoDb --> need it to validate vacation dates
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

const {

    postVacation,
    getVacation,
    getVacations,
    UpdateVacation,
    getEmployeeVacations,
    vacationErrorHandler

} = require("./../DAL/vacation.DAL");

const datesDiffInDays = async (start_date, end_date) => {

    const date2 = Math.floor(new Date(end_date).getTime() / (24 * 60 * 60 * 1000));
    const date1 = Math.floor(new Date(start_date).getTime() / (24 * 60 * 60 * 1000));

    return date2 - date1;
}

const validateVacationDays = async (start_date, end_date, user, vacations) => {

    const startDateCheck = new Date(start_date);
    const endDateCheck = new Date(end_date);
    console.log(startDateCheck, endDateCheck);

    if (await datesDiffInDays(start_date, end_date) >= user.vacation_days) {
        return ({message: "decline"});
    } else {
        console.log("vacation days clear!");
    }

    for (const key in vacationsA.vacations) {                                            //loop through vacations

        //const filtered = vacation.vacations.filter(vacation => vacation.status == "approved");
        let start = new Date(vacationsA.vacations[key].start_date);
        let end = new Date(vacationsA.vacations[key].end_date);

        if (start.getMonth() === startDateCheck.getMonth() && start.getFullYear() === startDateCheck.getFullYear()) {
            if ((start <= startDateCheck && end <= endDateCheck) || (start <= startDateCheck && end >= endDateCheck)) {
                return ({message: "decline"});
            } else if ((start >= startDateCheck && end <= endDateCheck) || (start < endDateCheck && end >= endDateCheck)) {
                return ({message: "decline"});
            }
        }
    }

    try {
        const response = await fetch
        ('https://calendarific.com/api/v2/holidays?&api_key=a1e18904d65721020f4325e8fd7fd1197b56dde4&country=IL&year=2022')
        const data = await response.json();

        for (const i in data.response.holidays) {
            let holiday = new Date(data.response.holidays[i].date.iso);

            if (holiday.getMonth() === startDateCheck.getMonth() && holiday.getFullYear() === startDateCheck.getFullYear()) {

                if ((startDateCheck.getDay() < holiday.getDay() && endDateCheck.getDay() < holiday.getDay()) ||
                    (startDateCheck.getDay() > holiday.getDay() && endDateCheck.getDay() > holiday.getDay())) {
                    return ({message: "clear"});
                } else {
                    return ({message: "decline"});
                }
            }
        }
        return ({message: "approved!",
            vacationLength: `${await datesDiffInDays(start_date, end_date)}`
        });

    } catch (error) {
        throw error;
    }
}



exports.vacationsController = {

    getAllVacations(req, res) {

        res.json((getVacations()));
    },

    getVacationDetails(req, res) {
        console.log("get vacation details");
        const id = req.params.id;
        res.json(getVacation(id));
    },

    getAllEmployeeVacations(req, res) {
        console.log("get employee's vacations list");
        const employeeId = req.params.employee_id;
        res.json(getEmployeeVacations(employeeId));
    },


    UpdateVacationStatus(req, res) {
        const vacationId = req.params.vacationId;
        res.json(UpdateVacation(vacationId));
    },

    async createNewVacation(req, res) {
        //const role = req.session.role; -->  get role of the request sender
        const employeeId = req.params.id;
        const vacationDetails = req.body;

        const employee = usersService.getUserDetails(employeeId);  //by using session --> this line can be deleted
        const vacations = getVacations();
        console.log(vacations);

        if (employee.role === 'manager') {
            res.json(postVacation(vacationDetails));
            console.log("manager -- vacation status: approved -- new vacation created");

            //user's role == employee
        } else {
            const answer = await validateVacationDays(vacationDetails.start_date, vacationDetails.end_date, employee, vacations);
            const vacationLength = answer.vacationLength;
            //console.log(`total days of requested vacation: ${vacationLength}`);
            if (answer.message === 'decline') {
                res.json(answer);
            }
            else {
                res.json(postVacation(vacationDetails));
                //users DAL -- update number of vacation days left for user
            }
        }
    }
}
