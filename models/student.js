const mongoose = require('mongoose');
const {Schema} = mongoose;
const languageSchema = require('./language');

const studentSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    age : {
         type: Number,
         required : true
    },
    language : [languageSchema]
});

module.exports = mongoose.model('student',studentSchema);