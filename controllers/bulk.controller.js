
const { usersService } = require("../DAL/users.DAL");
const CSVtoJSON = require('csvtojson');

exports.bulkController = {

    importCsv(req, res) {

        const csvFileName = req.body.filename;                  //get file name from req.body
        console.log(csvFileName);

        CSVtoJSON({
            colParser: {                                         //change type from string to number
                "vacation_days": {
                    cellParser: "number"
                },
                "id": {
                    cellParser: "number"
                }
            }
        })
            .fromFile(`./data/${csvFileName}`)                      //from csvfile (name from req.body)
            .then(csvUsers => {
                const result = (usersService.addUsers(csvUsers));
                if (result.message === 'success!') {
                    res.json({message: "all done! uses from csv imported to json file"});
                } else {
                    res.json({message: "something went wrong.."});
                }

            });
        }
    }