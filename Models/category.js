const mongoose = require('mongoose');
const { Schema } = mongoose


const Category = new Schema({
    description: {
        type: String,        
    },

    font_awesome_icon: {
        type: String
    },

    income: {
        type: Boolean
    }
});

const CategoryModel = mongoose.model('Category', Category);
module.exports = {Category, CategoryModel};