const DB = require("./../modules/user.module");
const {
    invalidId,
    missing_homeAddress,
} = require("../handleErrors");

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
                doc.save();
            }
            if (req.query.address)
            {
                doc.address = req.query.address;
                doc.updatedAt = new Date(Date.now());
                doc.save();
            }
            if (req.query.age)
            {
                doc.age = req.query.age;
                doc.updatedAt = new Date(Date.now());
                doc.save();
            }
            if (req.query.firstName)
            {
                doc.firstName = req.query.firstName;
                doc.updatedAt = new Date(Date.now());
                doc.save();
            }
            if (req.query.lastName)
            {
                doc.lastName = req.query.lastName;
                doc.updatedAt = new Date(Date.now());
                doc.save();
            }
            if (req.query.gender)
            {
                doc.gender = req.query.gender;
                doc.updatedAt = new Date(Date.now());
                doc.save();
            }
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
    updateUser: updateUser,
    deleteUser: deleteUser,
    checkRole: checkRole,
};