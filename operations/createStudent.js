const student = require('../models/student');
module.exports = (name, age, language) => {
    return new student({
        name,
        age,
        language: []
    })
        .save()
        .then((student) => {
            student.language.push({ title: language });
            return student.save();
        });
};