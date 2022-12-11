const DB = require("./../modules/user.module");
const {
    invalidId,
    invalidStatus,
    invalidInput,
} = require("../handleErrors");

function checkRole(req, res){
    if(!req.query.id)
        return invalidId(req, res);
    DB.roleModel.findOne({user_id: req.query.id},function(error, data) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        } else {
            data = JSON.stringify(data);
        }
        res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end(data);
    })
};

function userInfo(req, res){
    if(!req.query.id)
        return invalidId(req, res);
    DB.userModel.findOne({id: req.query.id},function(error, data) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        } else {
            data = JSON.stringify(data);
        }
        res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end(data);
    })
};

function getUsers(req, res){
    DB.userModel.find({},function(error, data) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        } else {
            data = JSON.stringify(data);
        }
        res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end(data);
    })
};

function userStatus(req, res){
    DB.statusModel.find({},function(error, data) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        } else {
            data = JSON.stringify(data);
        }
        res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end(data);
    })
};

function usersRole(req, res){
    DB.roleModel.find({},function(error, data) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        } else {
            data = JSON.stringify(data);
        }
        res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end(data);
    })
};

function updateStatus(req, res){
    if(!req.query.id)
        return invalidId(req, res);
    if(req.query.status !== "active" && req.query.status !== "disable")
        return invalidStatus(req, res);
    DB.statusModel.findOne({user_id: req.query.id},function(error, doc) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        } else {
            if (req.query.status === 'active')
            {
                doc.status = 'active';
                doc.save();
            }
            if (req.query.status === 'disable')
            {
                doc.status = 'disable';
                doc.save();
            }
        }
        res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end("success");
    })
};

function updateUser(req, res){
    if(!req.query.id)
        return invalidId(req, res);
     DB.userModel.findOne({id: req.query.id},function(error, doc) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        } else {
            console.log(doc)
            if (req.query.email)
            {
                doc.email = req.query.email;
                doc.updatedAt = new Date(Date.now());
            }
            if (req.query.address)
            {
                doc.address = req.query.address;
                doc.updatedAt = new Date(Date.now());
            }
            if (req.query.age)
            {
                doc.age = req.query.age;
                doc.updatedAt = new Date(Date.now());
            }
            if (req.query.firstName)
            {
                doc.firstName = req.query.firstName;
                doc.updatedAt = new Date(Date.now());
            }
            if (req.query.lastName)
            {
                doc.lastName = req.query.lastName;
                doc.updatedAt = new Date(Date.now());
            }
            if (req.query.gender)
            {
                doc.gender = req.query.gender;
                doc.updatedAt = new Date(Date.now());
            }
        }
         doc.save();
         res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end("success");
    })
};

function createUser(req, res){
    if(!req.query.email || !req.query.address || !req.query.age || !req.query.firstName || !req.query.lastName || !req.query.gender ||!req.query.role)
        return invalidInput(req, res);
    const userId = Math.floor(Math.random() * 1000);

    DB.userModel.create({id: userId, email: req.query.email, address: req.query.address, age: req.query.age,
        firstName: req.query.firstName, lastName: req.query.lastName, gender: req.query.gender, createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())},function(error, doc) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        }
    })
    DB.roleModel.create({user_id: userId, role: req.query.role},function(error, doc) {
            if (error) {
                console.log(`Error getting the data from db: ${error}`)
            }})

    DB.statusModel.create({user_id: userId, status: 'active'},function(error, doc) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        }
        else{
            doc.save()
        }
        res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end("success");
    })
};

function deleteUser(req, res){
    if(!req.query.id)
        return invalidId(req, res);
    DB.userModel.findOneAndDelete({id: req.query.id},function(error, doc) {
        if (error) {
            console.log(`Error getting the data from db: ${error}`)
        } else {
            doc.save();
        }
        res.set('Content-Type', 'application/json');
        res.writeHeader(200);
        res.end("success");
    })
};


module.exports = {
    // getVacations: getVacations,
    userInfo: userInfo,
    getUsers: getUsers,
    updateStatus: updateStatus,
    updateUser: updateUser,
    createUser: createUser,
    deleteUser: deleteUser,
    checkRole: checkRole,
    userStatus: userStatus,
    usersRole: usersRole,
};

