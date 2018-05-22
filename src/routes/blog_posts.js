const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

const blogPostsController = require('../controllers/blog_posts')

router.get('/', blogPostsController.getAll)
router.get('/getAllMonthsWithBlogs', blogPostsController.getAllMonthsWithBlogs)
router.post('/', authController.isAuthenticated, blogPostsController.create)
router.delete('/:id', authController.isAuthenticated, blogPostsController.remove)


module.exports = router
