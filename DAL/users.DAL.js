
//not complete - created for vacations purposes
const users = {
    "users": [
        {
            "id": 208932245,
            "name": "adva",
            "email": "adva@gmail.com",
            "password": "manic",
            "address": "aaaaaaaa",
            "role": "manager",
            "birthday": "12/04/1996",
            "last_login": "11/10/2022",
            "vacation_days": 10
        },
        {
            "id": 208932245,
            "name": "ofir",
            "email": "ofir@gmail.com",
            "password": "aabbcc",
            "address": "bbbbbbbbbb",
            "role": "employee",
            "birthday": "12/05/1996",
            "last_login": "11/19/2022",
            "vacation_days": 10
        }
    ]
}

exports.usersService = {

    getUsers() {
        return ({
            "users": [
                {
                    "id": 208932245,
                    "name": "adva",
                    "email": "adva@gmail.com",
                    "password": "manic",
                    "address": "aaaaaaaa",
                    "role": "manager",
                    "birthday": "12/04/1996",
                    "last_login": "11/10/2022",
                    "vacation_days": 10
                },
                {
                    "id": 208932245,
                    "name": "ofir",
                    "email": "ofir@gmail.com",
                    "password": "aabbcc",
                    "address": "bbbbbbbbbb",
                    "role": "employee",
                    "birthday": "12/05/1996",
                    "last_login": "11/19/2022",
                    "vacation_days": 10
                }
            ]
        })
    },

     getUserDetails(id) {
         return ({
             "id": 208932245,
             "name": "ofir",
             "email": "ofir@gmail.com",
             "password": "aabbcc",
             "address": "bbbbbbbbbb",
             "role": "employee",
             "birthday": "12/05/1996",
             "last_login": "11/19/2022",
             "vacation_days": 11
         })
     },

    //for Bulk
     addUsers(csvUsers) {
        users.users.push(...csvUsers);
        //add to db..
        console.log(JSON.stringify(users , null , 2));
        return ({
            message: "success!"
        });
     }
}