const { Category, CategoryModel } = require('../Models/category');

exports.find = (request, response) => {
    CategoryModel.find()
        .then(categories => {
            response.send(categories);
        }).catch(err => {
            response.status(500).send('Internal Server Error')
        })
}

exports.findById = (request, response) => {
    CategoryModel
        .findById(request.params.id)
        .then(category => {
            if (!category) {
                return response
                    .status(404)
                    .send({ message: 'Category not found' })
            }
            response
                .send(category);
        }).catch(error => {
            response
                .status(500)
                .send({ message: 'Internal Server Error' });
        })
}
