
errorHandler = (req, res) => {
    res.writeHeader(404);
    res.write('Bad request');
    res.end();
};

// get all employees -- need to move ot DAL
getAllEmployees = () => {
    return {1 : "Gilad", 2 : "Adva", 3: "Ofir", 4: "Dave"};
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
    if(id in employees)
    {
        return employees[id];
    }
    return ["This id doesn't exist"];
};


findEmployeeById = (req, res) => {
    console.log(req.query.id);
    if(!req.query.id)
    {
        return findAllEmployees(req, res);
    } 
    
    const data = getEmployeeById(req.query.id);
    res.set('Content-Type', 'application/json');
    res.writeHeader(200);
    res.end(JSON.stringify(data));

}

module.exports = {
    errorHandler: errorHandler,
    findEmployeeById: findEmployeeById
};