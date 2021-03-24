module.exports = app => {
    const vendor = require('../controller/vendor/vendor.controller');
    var route = require('express').Router();
    const multer = require('multer');
    const auth = require('../middleware/auth-check');

    const imageFilter = (req, file, cb) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            cb(null, true);
        } else { 
            cb(null, false); 
        }
    };
    const storage = multer.diskStorage({
        destination: function (req, file, cb) { 
            cb(null,'uploads/vendor');
        },
        filename: function (req, file, cb) {

            const fileName = file.originalname.toLowerCase().split(' ').join('_');
            cb(null,Math.floor((Math.random() * 10000) + 2)+fileName);
        },
    });
    const upload = multer({
        storage: storage, limits: {
            fileSize: 1024 * 1024 * 5,
        }, fileFilter: imageFilter
    });
    
    route.post('/signup',upload.single('photo'), vendor.create); //Create Vendor Account
    route.get('/view/:username',vendor.count); //count View
    route.put('/:id',auth,upload.single('photo'), vendor.update); //update Vendor Account

    route.get('/visitor/:username',vendor.getByUsername); //for Customer visitor

    app.use('/api/vendor',route);
}

