const student = require('../models/student');


module.exports = (_id, name, age, title) => {

    return student.findByIdAndUpdate(_id, {
        name,
        age
    }).then((student) => {
        student.language.push({ title });
        return student.save();
    });
};

//language.push({title})