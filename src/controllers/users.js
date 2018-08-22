const userModel = require('../models/users')

// ////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
// ////////////////////////////////////////////////////////////////////////////

module.exports = class UserController {
  constructor(userModel){
    this.userModel = userModel

    this.create = this.create.bind(this)
    this.allUsersWithBlogPosts = this.allUsersWithBlogPosts.bind(this)
  }
  create(req, res, next){
    if (!req.body.username) {
      return next({ status: 400, message: 'Bad username' })
    }
  
    if (!req.body.password) {
      return next({ status: 400, message: 'Bad username' })
    }
  
    this.userModel.create(req.body.username, req.body.password)
    .then((data) => {
      return res.status(201).send({ data })
    })
    .catch(next)
  }
  
  allUsersWithBlogPosts(req, res, next){
    this.userModel.allUsersWithBlogPosts()
    .then(users => {
      res.status(200).send({users})
    })
    .catch(next)
  }
}




