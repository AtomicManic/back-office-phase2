// Load package
const Icalendar = require('calendarific');
// Initilize with an API key
const clapi = new Icalendar('a1e18904d65721020f4325e8fd7fd1197b56dde4');

const user = {

                "id": 208932245,
                "name": "ofir",
                "email": "ofir@gmail.com",
                "password": "aabbcc",
                "address": "bbbbbbbbbb",
                "role": "employee",
                "birthday": "12/05/1996",
                "last_login": "11/19/2022",
                "vacation_days": 11
}

    const vacations = {
            "vacations" : [
            {
                "id": 4,
                "employee_id": 208981145,
                "start_date": "07/08/2022",
                "end_date": "07/11/2022",
                "status": "approved"
            },
            {
                 "id": 5,
                 "employee_id": 208921445,
                 "start_date": "10/01/2022",
                 "end_date": "10/10/2022",
                "status": "approved"
            }
        ]
    }


    function datesDiffInDays(start_date, end_date) {

        let date2 = Math.floor(new Date(end_date).getTime() / (24 * 60 * 60 * 1000));
        let date1 = Math.floor(new Date(start_date).getTime() / (24 * 60 * 60 * 1000));

        return date2 - date1;
    }

    function validateVacationDays(start_date, end_date, user, vacations) {

        const startDateCheck = new Date(start_date);
        const endDateCheck = new Date(end_date);
        console.log(startDateCheck , endDateCheck);

        if (datesDiffInDays(start_date, end_date) >= user.vacation_days) {
            console.log("not enough vacation days!")
            return ({message: "not enough vacation days!"});
        }

        for (const key in vacations.vacations) {                        //loop through vacations

            let start = new Date(vacations.vacations[key].start_date);
            let end = new Date(vacations.vacations[key].end_date);

            if(start.getMonth() != startDateCheck.getMonth() || start.getFullYear() != startDateCheck.getFullYear()) {
                console.log("clear")
                //return ("clear");
            }

            if ((start <= startDateCheck && end <= endDateCheck) || (start <= startDateCheck && end >= endDateCheck)) {
                console.log("dates overlap!")
                return ("overlap!");
            }

            else if ((start >= startDateCheck && end <= endDateCheck) || (start < endDateCheck && end >= endDateCheck)) {
                console.log("dates overlap!")
                return ("overlap!");
            }



        }

        try {

            const parameters = {
                country: 'IL',
                year: 2022,
            };

            clapi.holidays(parameters, function (data) {

                const a = JSON.stringify(data , null , 2);
                console.log(a);
                for (const i in data.response.holidays) {
                    let holiday = new Date(data.response.holidays[i].date.iso);
                    console.log(holiday);
                    if (startDateCheck <= holiday && endDateCheck <= holiday) {
                        console.log("holiday overlap!")}
                }
            });
        } catch (error) {
            throw error;
        }
    }

        validateVacationDays("03/18/2022", "03/20/2022" , user , vacations);



