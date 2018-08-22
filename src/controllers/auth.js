
module.exports = class AuthModel {
  constructor(authModel, jwt){
    this.authModel = authModel
    this.jwt = jwt

    this.login = this.login.bind(this)
    this.getAuthStatus = this.getAuthStatus.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.isSelf = this.isSelf.bind(this)
  }
  
  login(req, res, next){
    // 1. Make sure that request is good
    if (!req.body.username) {
      return next({ status: 400, message: 'Bad request' })
    }
  
    if (!req.body.password) {
      return next({ status: 400, message: 'Bad request' })
    }
  
    // 2. Attempt Login
    this.authModel.login(req.body.username, req.body.password)
    .then(({id, username}) => {
      console.log(id, username)
      // 3. Create token
      const token = this.jwt.sign({ id, username }, process.env.SECRET)
  
      // 4. Send back token
      return res.status(200).send({ token })
    })
    .catch(next)
  }
  
  getAuthStatus(req, res, _){
    res.status(200).send({...req.claim})
  }
  
  isAuthenticated(req, _, next){
    if (!req.headers.authorization) {
      return next({ status: 401, message: 'Unauthorized' })
    }
    const [ , credentials ] = req.headers.authorization.split(' ')
  
    this.jwt.verify(credentials, process.env.SECRET, (err, payload) => {
      if (err) {
        return next({ status: 401, message: 'Unauthorized' })
      }
  
      req.claim = payload
  
      next()
    })
  }
  
  isSelf(req, res, next){
    if (parseInt(req.params.userId) !== req.claim.id) {
      return next({ status: 401, message: 'Unauthorized' })
    }
  
    next()
  }
}

