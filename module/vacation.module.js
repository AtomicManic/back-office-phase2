// Load package
const Icalendar = require('calendarific');
// Initilize with an API key
const clapi = new Icalendar('a1e18904d65721020f4325e8fd7fd1197b56dde4');


function datesDiffInDays(start_date,end_date) {

    let date2 = Math.floor(new Date(end_date).getTime() / (24*60*60*1000));
    let date1 = Math.floor(new Date(start_date).getTime()/ (24*60*60*1000));

    return date2 - date1;
}

function validateVacationDays(start_date, end_date , user , vacations) {

    const startDateCheck = new Date(start_date);
    const endDateCheck = new Date(end_date);

    if (datesDiffInDays(start_date, end_date) <= user.vacation_days) {
       console.log("not enough vacation days!")
    }

        for (const key in vacations) {

            let start = new Date(vacations[key].vacations.start_date);
            let end = new Date(vacations[key].vacations.end);

            if (startDateCheck > start && startDateCheck < end ||
                endDateCheck > start && endDateCheck < end) {
               console.log("dates overlap!")
            }

        }

        try {

            const parameters = {
                country: 'IL',
                year: 2022,
            };

            clapi.holidays(parameters, function (data) {
                for (const i in data) {
                    let holiday = new Date(data.response.holidays[i].date.iso);
                    if(startDateCheck > holiday && endDateCheck < holiday) {
                        console.log("holiday overlap!")
                    }
                }
            });
        } catch (error) {
            throw error;
        }
}

