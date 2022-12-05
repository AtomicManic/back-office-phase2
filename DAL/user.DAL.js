const {
    invalidId,
    missing_homeAddress,
} = require("../handleErrors");

// get all employees -- need to move ot DAL
getAllUsers = () => {
    return {1 : "Gilad", 2 : "Adva", 3: "Ofir", 4: "Dave"};
};

const getUserById = (id) => {
    if(!id)
        return invalidId;
    let users = getAllUsers();
    if (id in users) {
        return users[id];
    }
    return invalidId;
    };

const setHomeAddress = (id, home_address) => {
    if(!id)
        return invalidId;
    let users = getAllUsers();
    if (id in users) {
        return [`The home address of ${users[id]} changed to ${home_address}`];
    }
    return invalidId;
};

// add check if there is active request
const setVacationRequest = (id, startDate, finishDate) => {
    if(!id)
        return invalidId;
    let users = getAllUsers();
    if (id in users) {
        return [`${users[id]} sent vacation request`];
    }
    return invalidId;
};

module.exports = {
    setHomeAddress: setHomeAddress,
    setVacationRequest: setVacationRequest,
    getUserById: getUserById,
    getAllUsers: getAllUsers,
};