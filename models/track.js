const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let trackSchema = new Schema({
    time: {
        type: String
    },
    description: String,
    date: Date
});

trackSchema.index({"description": "text", date: 1})

trackSchema.pre('save', function (next) {
    next();
});

trackSchema.pre('find', function (next) {
    next();
});

const ModelClass = mongoose.model('track', trackSchema);
module.exports = ModelClass;