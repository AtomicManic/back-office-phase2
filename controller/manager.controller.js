
errorHandler = (req, res) => {
    res.writeHeader(404);
    res.write('Bad request');
    res.end();
};
let counter = 4;
let user = { 1: { name: "Gilad", email: "Gilad@gmail.com" }, 2: { name: "Adva", email: "Adva@gmail.com" }, 3: { name: "Ofir", email: "Ofir@gmail.com" }, 4: { name: "Dave", email: "Dave@gmail.com" } };

// get all employees -- need to move ot DAL
getAllEmployees = () => {
    return user;
};


findAllEmployees = (req, res) => {
    const data = getAllEmployees();
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));
};


// get employee by id -- need to move ot DAL
getEmployeeById = (id) => {
    let employees = getAllEmployees();
    if (id in employees) {
        return employees[id];
    }
    return errorHandler(req, res);
};


findEmployeeById = (req, res) => {
    if (!req.query.id) {
        return findAllEmployees(req, res);
    }

    const data = getEmployeeById(req.query.id);
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));

};

editEmployeesInfo = (req, res) => {
    if (!req.body.id || !req.body.key || !req.body.value) {
        return errorHandler(req, res);
    }
    const user = getEmployeeById(req.body.id);
    if (!req.body.key in user) {
        return errorHandler(req, res);
    }
    user[req.body.key] = req.body.value;
    res.writeHeader(200);
    res.end(JSON.stringify({}));
};


// not finished
addEmployee = (req, res) => {
    counter++;

    if (!req.body.id || !req.body.name || !req.body.email) {
        return errorHandler(req, res);
    }
    const newuser = {
        id:     counter,
        name:   req.body.name,
        email:  req.body.email,
    };

};




module.exports = {
    errorHandler: errorHandler,
    findEmployeeById: findEmployeeById,
    editEmployeesInfo: editEmployeesInfo
};