
const { usersService } = require("../DAL/users.DAL");
const CSVtoJSON = require('csvtojson');

exports.bulkController = {

    importCsv(req, res) {

        const csvFileName = req.query.filename;                  //get file

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
            .fromFile(`./data/${csvFileName}`)                      //from csv file
            .then(csvUsers => {
                const result = (usersService.addUsers(csvUsers));
                if (result.message === 'success!') {
                    res.json({message: "all done! users from csv imported to json file"});
                } else {
                    res.json({message: "something went wrong.."});
                }

            });
        }
    }