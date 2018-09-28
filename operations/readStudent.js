const student = require('../models/student');

module.exports = (_id) => {
    return student.find(_id ? { _id } : {});
};