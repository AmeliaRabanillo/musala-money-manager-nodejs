const mongoose = require('mongoose');
const {Category, CategoryModel} = require('./category');
const { Schema } = mongoose

const Operation = new Schema({
    description: {
        type: String
    },
    money_value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: Category,
        required: true
    }
});

const OperationModel = mongoose.model('Operation', Operation);
module.exports = {Operation, OperationModel};