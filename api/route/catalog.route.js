module.exports = app => {
    const catalog = require('../controller/vendor/catalog.controller');
    const auth = require('../middleware/auth-check');
    var route = require('express').Router();
    const multer = require('multer');
    
    const imageFilter = (req, file, cb) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            cb(null, true);
        } else { 
            cb(null, false); 
        }
    };
    const storage = multer.diskStorage({
        destination: function (req, file, cb) { 
            cb(null,'uploads/catalog');
        },
        filename: function (req, file, cb) { 
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, Date.now()+fileName);
        },
    });
    const upload = multer({
        storage: storage, limits: {
            fileSize: 1024 * 1024 * 5,
        }, fileFilter: imageFilter
    });

    route.post('/create',auth,upload.single('photo'), catalog.create); //Create Catalog
    route.get('/view/:url',catalog.count); //count View
    route.put('/:cat_id',auth,upload.single('photo'), catalog.update); //Update Catalog
    route.delete('/:cat_id',auth, catalog.delete); //Delete Catalog

    route.get('/:user_id',auth,catalog.getByUserId); //Getting All Catalog

    route.get('/visitor/:user_id',catalog.getUserId);
    route.use('/test',auth, (req, res) => {
        res.send({
            decode:req.userData,
            message:"Catalog Api Working !!"
        });
    })
    app.use('/api/vendor/catalog',route);
}