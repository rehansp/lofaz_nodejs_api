const  express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//database Initialize
require('./config/db');

app.use(morgan('dev'));

//parsing Json Body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin , Content-Type, X-Requested-With, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

require('./route/customer.route')(app);
require('./route/admin.route')(app);
require('./route/vendor.route')(app);
require('./route/catalog.route')(app);
require('./route/product.route')(app);
require('./route/setting.route')(app);



//Handing Url Error
app.use((req, res, next) => {
    const error = new Error("Not Found !!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;