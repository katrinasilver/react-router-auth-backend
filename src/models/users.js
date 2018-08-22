// const db = require('../../db')
// const bcrypt = require('bcrypt-as-promised')

// ////////////////////////////////////////////////////////////////////////////
// Basic CRUD Methods
// ////////////////////////////////////////////////////////////////////////////


module.exports = class UserModel {
  constructor(db, bcrypt){
    this.db = db
    this.bcrypt = bcrypt

    this.getOneByUserName = this.getOneByUserName.bind(this)
    this.create = this.create.bind(this)
    this.allUsersWithBlogPosts = this.allUsersWithBlogPosts.bind(this)
  }

  getOneByUserName(username){
    return (
      this.db('users')
      .where({ username })
      .first()
    )
  }
  
  create(username, password){
    // check to see of user already exists
    return this.getOneByUserName(username)
    .then((data) => {
      // if user already exists, return 400
      if (data) throw new Error({ status: 400, message: 'User already exists' })
  
      // hash password
      console.log(password)
      return this.bcrypt.hash(password, 10)
    })
    .then((hashedPassword) => {
      console.log(hashedPassword)
      
      return (
        this.db('users')
        .insert({ username, password: hashedPassword })
        .returning('*')
      )
    })
    .then(([ data ]) => {
      // 4. strip hashed password away from object
      delete data.password
      // 5. "return/continue" promise
      return data
    })
  }
  
  allUsersWithBlogPosts(_){
    return this.db('blog_posts').select('users.username as username', 'users.id as id')
    .innerJoin('users', 'users.id', 'blog_posts.users_id')
    .distinct('users.id').orderBy('users.username')
  }
}
