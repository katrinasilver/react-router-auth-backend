const labelsModel = require('../models/labels')

module.exports.getAll = (req, res, next) => {
  const { limit} = req.query
  labelsModel.getAll(limit)
  .then(labels => {
    res.status(200).send({ labels })
  })
  .catch(next)
}
