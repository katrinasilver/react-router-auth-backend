// const blogPostsModel = require('../models/blogPosts')

module.exports = class BlogPostsControllers {
  constructor(blogPostsModel){
    this.blogPostsModel = blogPostsModel

    this.getAll = this.getAll.bind(this)
    this.getAllMonthsWithBlogs = this.getAllMonthsWithBlogs.bind(this)
    this.create = this.create.bind(this)
    this.remove = this.remove.bind(this)
  }

  getAll(req, res, next){
    const { orderByColumn, orderDirection, offset, limit, month, year, username, label } = req.query
  
    this.blogPostsModel.getAll(orderByColumn, orderDirection, offset, limit, { month, year, username, label })
    .then(blogPosts => {
      res.status(200).send({ blogPosts })
    })
    .catch(next)
  }
  
  getAllMonthsWithBlogs(req, res, next){
    this.blogPostsModel.getAllMonthsWithBlogs()
    .then(allMonthsWithBlogs => {
      res.status(200).send({allMonthsWithBlogs})
    })
    .catch(next)
  }
  
  create(req, res, next){
    const { title, body, labelIds } = req.body
    const { id } = req.claim
    this.blogPostsModel.create(id, title, body, labelIds)
    .then(blogPost => {
      res.status(200).send({blogPost})
    })
    .catch(next)
  }
  
  remove(req, res, next){
    this.blogPostsModel.remove(req.params.id, req.claim.id)
    .then(({id, ...blogPost}) => {
      res.status(200).send({blogPost})
    })
    .catch(next)
  }
}

