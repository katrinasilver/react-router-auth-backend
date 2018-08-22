
module.exports = class LabelController{
  constructor(labelsModel){
    this.labelsModel = labelsModel

    this.getAll = this.getAll.bind(this)
  }
  getAll(req, res, next){
    const { limit } = req.query
    this.labelsModel.getAll(limit)
    .then(labels => {
      res.status(200).send({ labels })
    })
    .catch(next)
  }
}




