const mongoose = require('mongoose');
const {Schema} = mongoose;

const languageSchema = new Schema({
    title: {
        type : String,
        required : true
    }
});

module.exports = languageSchema;