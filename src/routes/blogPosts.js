const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = requestAnimationFrame()
const db = require('../../db')

const router = express.Router()

const AuthController = require('../controllers/auth')
const AuthModel = require('../models/auth')

const UsersModel = require('../models/users')

const BlogPostsController = require('../controllers/blogPosts')
const BlogPostsModel = require('../models/blogPosts')

const blogPostsModel = new BlogPostsModel(db)
const blogPostsController = new BlogPostsController(blogPostsModel)

const usersModel = new UsersModel(db, bcrypt)
const authModel = new AuthModel(usersModel, bcrypt)
const authController = new AuthController(authModel, jwt)

router.get('/', blogPostsController.getAll)
router.get('/getAllMonthsWithBlogs', blogPostsController.getAllMonthsWithBlogs)
router.post('/', authController.isAuthenticated, blogPostsController.create)
router.delete('/:id', authController.isAuthenticated, blogPostsController.remove)

module.exports = router
