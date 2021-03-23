module.exports = app => {
    const admin = require('../controller/admin/admin.controller');
    var route = require('express').Router();

    route.post('/signup', admin.create); //Create Admin Account
    route.use('/test', (req, res) => {
        res.send({
            message:"It's Working !!"
        });
    })
    app.use('/api/admin',route);
}