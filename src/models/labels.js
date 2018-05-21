const db = require('../../db')

module.exports.getAll = (limit) => {
  const query = db('labels')

  if(limit){
    query.limit(limit)
  }

  return query
}
