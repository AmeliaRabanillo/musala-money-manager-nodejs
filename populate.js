const moment = require('moment');
const mongoose = require('mongoose');

const { Operation, OperationModel } = require('./Models/operation');
const { Category, CategoryModel } = require('./Models/category');

const mongodb_url = 'mongodb://localhost:27017/money-manager-db';

function randomInt(max) {
    //returns a randon integer between 0 and 'max'
    return Math.floor(Math.random() * max);
}

function generateCategories() {
    return [
        { description: "Food", income: false },
        { description: "Transportation", income: false },
        { description: "House", income: false },
        { description: "Car", income: false },
        { description: "Shooping", income: false },
        { description: "Health", income: false },
        { description: "Baby", income: false },
        { description: "Pet", income: false },
        { description: "Electronics", income: false },
        { description: "Travel", income: false },
        { description: "Make up", income: false },
        { description: "Cellphone", income: false },
        { description: "Hobbies", income: false },
        { description: "School", income: false },
        { description: "Clothes", income: false },
        { description: "Wages", income: true },
        { description: "Salary", income: true },
        { description: "Prices", income: true }];
}

async function generateOperations(count) {

    let incomeCategories = await
        mongoose.connect(mongodb_url, { useNewUrlParser: true }).then(() => {
            return CategoryModel.where('income').equals(true).then(category => {
                return category;
            });
        });

    let expensesCategories = await
        mongoose.connect(mongodb_url, { useNewUrlParser: true }).then(() => {
            return CategoryModel.where('income').equals(false).then(category => { return category; });
        });

    mongoose.connect(mongodb_url, { useNewUrlParser: true })
        .then(() => {
            //generating operations
            var operations = []

            while (count > 0) {
                const income = randomInt(2) == 1 ? true : false;//randomly sets the type of operation (income or expenses)

                const category = (income) ?
                    incomeCategories[randomInt(incomeCategories.length)]
                    : expensesCategories[randomInt(expensesCategories.length)];

                const date = moment().subtract(randomInt(10), 'days');
                const value = (income) ? randomInt(500) + 1 : -Math.floor(Math.random() * 50);//income operation are generated with values up to 500, expenses operations with values up to 50

                operations.push({
                    description: "Lorem ipsus dolor",
                    money_value: value,
                    date: date,
                    category: category,
                })
                count--;
            }

            //inserting operations in database
            OperationModel.insertMany(operations)
                .then(() => { console.log('Operations saved to database'); })
                .then(()=>{console.log("Script Finished")})
                .catch((error) => { console.log(error) })
        });

}


//Inserting Data
mongoose
    .connect(mongodb_url, { useNewUrlParser: true })
    .then(() => {
        let categories = generateCategories();

        CategoryModel
            .insertMany(categories)
            .then(() => {
                console.log("Categories saved to database");
            })
            .catch(() => {
                console.log("Error inserting Categories");
            });
    })
    .then(() => { generateOperations(10); });



