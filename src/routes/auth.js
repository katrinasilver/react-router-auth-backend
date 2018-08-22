const express = require('express')
const bcrypt = require('bcrypt-as-promised')
const jwt = require('jsonwebtoken')
const db = require('../../db')

const router = express.Router()

const AuthController = require('../controllers/auth')
const UserModel = require('../models/users')

const userModel = new UserModel(db, bcrypt)
const authController = new AuthController(userModel, jwt)

router.get('/token', authController.isAuthenticated, authController.getAuthStatus)
router.post('/token', authController.login)

module.exports = router
