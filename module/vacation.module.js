
     const datesDiffInDays = async (start_date, end_date) => {

            let date2 = Math.floor(new Date(end_date).getTime() / (24 * 60 * 60 * 1000));
            let date1 = Math.floor(new Date(start_date).getTime() / (24 * 60 * 60 * 1000));

            return date2 - date1;
        }

     const validateVacationDays = async (start_date, end_date, user, vacations) => {

         const startDateCheck = new Date(start_date);
         const endDateCheck = new Date(end_date);
         console.log(startDateCheck, endDateCheck);

         if (await datesDiffInDays(start_date, end_date) >= user.vacation_days) {
             console.log("not enough vacation days!");
             return ({message: "decline"});
         } else {
             console.log("vacation days clear!");
         }

         for (const key in vacations.vacations) {                                            //loop through vacations

             //const filtered = vacation.vacations.filter(vacation => vacation.status == "approved");
             let start = new Date(vacations.vacations[key].start_date);
             let end = new Date(vacations.vacations[key].end_date);

             if (start.getMonth() === startDateCheck.getMonth() && start.getFullYear() === startDateCheck.getFullYear()) {
                 if ((start <= startDateCheck && end <= endDateCheck) || (start <= startDateCheck && end >= endDateCheck)) {
                     console.log("vacations overlap!");
                     return ({message: "decline"});
                 } else if ((start >= startDateCheck && end <= endDateCheck) || (start < endDateCheck && end >= endDateCheck)) {
                     console.log("vacations overlap!");
                     return ({message: "decline"});
                 }
                     console.log("cleared vacations check!");
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
                        console.log("clear");
                        return ({message: "clear"});
                    } else {
                        console.log("holiday overlap!");
                        return ({message: "decline"});
                    }
                }
            }
            console.log("cleared holidays check!");
            return ({message: "approved!",
            vacationLength: `${await datesDiffInDays(start_date, end_date)}`
            });

    } catch (error) {
              throw error;
        }
    }

module.exports = {
    validateVacationDays: validateVacationDays,
    datesDiffInDays: datesDiffInDays
};


