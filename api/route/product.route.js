module.exports = app => {
    const product = require('../controller/vendor/product.controller');
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
            cb(null,'uploads/product');
        },
        filename: function (req, file, cb) { 
            const fileName = file.originalname.toLowerCase().split(' ').join('_');
            cb(null, Date.now()+fileName);
        },
    });
    const upload = multer({
        storage: storage, limits: {
            fileSize: 1024 * 1024 * 5,
        }, fileFilter: imageFilter
    });

    route.post('/create',auth,upload.array('photo',5), product.create); //Create Product
    route.get('/view/:url',product.count); //count View
    route.put('/:product_id',auth,upload.array('photo',5), product.update); //Update Product
    route.delete('/:product_id',auth, product.delete); //Delete Product

    route.get('/:cat_id',auth, product.getByCatId); //Get Product by CatId

    route.get('/visitor/:cat_id',product.getByCatalogId);

    route.use('/test',auth, (req, res) => {
        res.send({
            decode:req.userData,
            message:"Product Api Working !!"
        });
    })
    app.use('/api/vendor/catalog/product',route);
}