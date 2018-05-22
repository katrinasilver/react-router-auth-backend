const blogPostsModel = require('../models/blog_posts')

module.exports.getAll = (req, res, next) => {
  const { orderByColumn, orderDirection, offset, limit, month, year, username, label} = req.query

  blogPostsModel.getAll(orderByColumn, orderDirection, offset, limit, { month, year, username, label })
  .then(blog_posts => {
    res.status(200).send({ blog_posts })
  })
  .catch(next)
}

module.exports.getAllMonthsWithBlogs = (req, res, next) => {
  blogPostsModel.getAllMonthsWithBlogs()
  .then(allMonthsWithBlogs => {
    res.status(200).send({allMonthsWithBlogs})
  })
  .catch(next)
}

module.exports.create = (req, res, next) => {
  const { title, body, labelIds } = req.body
  const { id } = req.claim
  blogPostsModel.create(id, title, body, labelIds)
  .then(blog_post => {
    res.status(200).send({blog_post})
  })
  .catch(next)
}

module.exports.remove = (req, res, next)=>{
  blogPostsModel.remove(req.params.id, req.claim.id)
  .then(({id, ...blog_post}) => {
    res.status(200).send({blog_post})
  })
  .catch(next)
}
