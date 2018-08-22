const express = require('express')
const bcrypt = require('bcrypt-as-promised')
const db = require('../../db')

const router = express.Router()

const UserController = require('../controllers/users')
const UserModel = require('../models/users')

const userModel = new UserModel(db, bcrypt)
const userController = new UserController(userModel)

// ////////////////////////////////////////////////////////////////////////////
// Routes
// ////////////////////////////////////////////////////////////////////////////

router.post('/', userController.create)
router.get('/allUsersWithBlogPosts', userController.allUsersWithBlogPosts)

module.exports = router
