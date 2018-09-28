const student = require('../models/student');

module.exports = (_id) => {
    return student.findOneAndDelete(_id ? { _id } : {});
};