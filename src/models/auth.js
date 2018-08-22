// const bcrypt = require('bcrypt-as-promised')
// const userModel = require('./users')

class AuthModel {
  constructor(userModel, bcrypt){
    this.userModel = userModel
    this.bcrypt = bcrypt

    this.login = this.login.bind(this)
  }
  login(username, password){
    let user
  
    // 1. Check to see if user already exists
    return this.userModel.getOneByUserName(username)
    .then((data) => {
      // 1a. if not, return a 400 with appropriate error message
      if (!data) throw new Error({ status: 400, message: 'Bad Request' })
  
      // save user for later use
      user = data
  
      // 2. compare password in the database with the password provided by user
      return this.bcrypt.compare(password, data.password)
    })
    .catch(this.bcrypt.MISMATCH_ERROR, () => {
      // 3. If the passwords do not match, respond with 401 Unauthorized
      throw new Error({ status: 401, message: 'Unauthorized' })
    })
    .then(() => {
      // 4. strip hashed password away from object
      delete user.password
      // 5. "return/continue" promise
      return user
    })
  }
}

