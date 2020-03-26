const Department = require('../models/department')

module.exports.list = (req, res) => {
    Department.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}
