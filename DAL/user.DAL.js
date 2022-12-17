const {
    invalidId,
    missing_homeAddress,
} = require("../handleErrors");
const DB = require("../modules/user.module")

function getUserById(id){
    if(!id)
        return invalidId;
    DB.userModel.findOne({id: id}.lean,async function(error, data){
        if (error)
        {
            console.log(`Error getting the data from db: ${error}`)
        }
        else
        {
            data = JSON.stringify(data);
            console.log(typeof data)
            return data;
        }
    });
    }

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
};