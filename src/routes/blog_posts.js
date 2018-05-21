const express = require('express')
const router = express.Router()

const blogPostsController = require('../controllers/blog_posts')

router.get('/', blogPostsController.getAll)
router.get('/getAllMonthsWithBlogs', blogPostsController.getAllMonthsWithBlogs)




module.exports = router
