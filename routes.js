module.exports = (app) => {
    const categoryController = require('./Controllers/categoryController');
    const operationController = require('./Controllers/operationController');
   
    app.get('/categories', categoryController.find);
    app.get('/categories/:id', categoryController.findById);

    app.get('/operations', operationController.find);
    app.get('/operations/:id', operationController.findById);
    app.post('/operations', operationController.create);
    app.delete('/operations/:id', operationController.delete);
    app.put('/operations/:id', operationController.update);
    app.get('/operations/:year/:month', operationController.byMonth);

    app.get('/statistics', operationController.statistics);


}