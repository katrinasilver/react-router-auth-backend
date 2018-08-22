const express = require('express')
const db = require('../../db')

const router = express.Router()

const LabelsModel = require('../models/labels')
const LabelsController = require('../controllers/labels')


// dependency injection
const labelsModel = new LabelsModel(db)
const labelsController = new LabelsController(labelsModel)

// ////////////////////////////////////////////////////////////////////////////
// Routes
// ////////////////////////////////////////////////////////////////////////////

router.get('/', labelsController.getAll)

module.exports = router
