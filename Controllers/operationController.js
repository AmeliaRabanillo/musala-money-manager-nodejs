const { Operation, OperationModel } = require('../Models/operation');

exports.find = (request, response) => {
    OperationModel.find()
        .then(operations => {
            response.send(operations);
        }).catch(error => {
            response.status(500).send({ message: 'Internal Server Error' })
        })
}

exports.findById = (request, response) => {
    OperationModel
        .findById(request.params.id)
        .then(operation => {
            if (!operation) {
                return response
                    .status(404)
                    .send({ message: 'Operation not found' })
            }
            response
                .send(operation);
        }).catch(error => {
            res
                .status(500)
                .send({ message: 'Internal Server Error' });
        })
}

exports.delete = (request, response) => {
    OperationModel.findByIdAndRemove(request.params.id)
        .then(operation => {
            if (!operation)
                return response.status(404).send({ message: 'Operation not found' })

            response.send({ message: 'Operation removed' });
        })
        .catch(error => {
            response.status(500).send({ message: 'Something wrong' })
        })
}

exports.create = (request, response) => {
    if (!request.body) {
        return response.status(400).send({ message: 'Bad Request' });
    }
    const operation = new OperationModel(request.body);
    operation.save()
        .then(operation => response.status(200).json({ message: 'Operation added', operation: operation }))
        .catch(error => response.status(500).send({ message: 'Internal Server Error' }));
}

exports.update = (request, response) => {
    if (!request.body)
        return response.status(400).send({ message: 'Bad Request' });

    OperationModel.findByIdAndUpdate(request.params.id, {
        description: request.body.description,
        money_value: request.body.money_value,
        date: request.body.date,
        category: request.body.category,
    })
        .then(operation => {
            if (!operation)
                return response.status(404).send({ message: 'Operation not found' })
            response.send(operation);
        })
        .catch(error => {
            response.status(500).send({ message: 'Internal Server Error' })
        })
}

exports.byMonth = (request, response) => {
    return OperationModel.aggregate([
        {
            $project: {
                description: 1, money_value: 1, date: 1, user: 1, category: 1,
                month: { $month: '$date' }, year: { $year: '$date' }
            }
        },
        { $match: { month: parseInt(request.params.month), year: parseInt(request.params.year) } }
    ]).then(operations => { response.send(operations); });
    //TODO quitar month and year del response
}

exports.statistics = (request, response) => {
    return OperationModel.aggregate([
        {
            $project: {
                description: 1, money_value: 1, date: 1, user: 1, category: 1,
                month: { $month: '$date' },
                year: { $year: '$date' }
            }
        },
        { $match: { month: parseInt(request.params.month), year: parseInt(request.params.year), "category.income": false } }
    ]).then(operations => { response.send(operations); });
}