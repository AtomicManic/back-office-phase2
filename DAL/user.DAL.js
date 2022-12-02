// get all employees -- need to move ot DAL
getAllUsers = () => {
    return {1 : "Gilad", 2 : "Adva", 3: "Ofir", 4: "Dave"};
};

const getUserById = (id) => {
    if(id == null)
        return 'No valid id';
    let users = getAllUsers();
    if (id in users) {
        return users[id];
    }
    return ["This id doesn't exist"];
    };

const setHomeAddress = (id, home_address) => {
    if(id == null)
        return 'Missing id';
    let users = getAllUsers();
    if (id in users) {
        return [`The home address of ${users[id]} changed to ${home_address}`];
    }
    return ['Invalid id']
};

// add check if there is active request
const setVacationRequest = (id) => {
    if(id == null)
        return 'Missing id';
    let users = getAllUsers();
    if (id in users) {
        return [`${users[id]} sent vacation request`];
    }
    return ['Invalid id']
};

module.exports = {
    setHomeAddress: setHomeAddress,
    setVacationRequest: setVacationRequest,
    getUserById: getUserById,
    getAllUsers: getAllUsers,
};