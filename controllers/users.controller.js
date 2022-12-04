
//not complete - created for vacations purposes
const { usersService } = require("../DAL/users.DAL");

exports.usersController = {

    getUsers(req,res) {
        res.json( usersService.getUsers());
    },

    getUserDetails(req,res) {

        console.log("get user details");
        const id = req.params.id;
        console.log(id);
        res.json(usersService.getUserDetails(id));

    }
}