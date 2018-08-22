// const db = require('../../db')

module.exports = class LabelsModel {
  constructor(db){
    this.db = db
  }
  getAll(limit){
    const query = this.db('labels')
  
    if (limit) {
      query.limit(limit)
    }
  
    return query
  }
}


