const express = require('express')
//reference for controller
const { bulkController } = require('../controllers/bulk.controller');


//create an instance of express.router - router that handles users
bulkRouter = new express.Router();

bulkRouter.post('/' , bulkController.importCsv);

module.exports = { bulkRouter };