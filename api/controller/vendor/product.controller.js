const Product = require('../../model/product');
const mongoose=require('mongoose');
const Setting=require('../../model/setting');

exports.create = (req, res) =>{

    var title = req.body.title;
    if (!title ) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }
    
    var product_img=[];


    // //Checking Image
    if(!req.files){
        product_img="null";
    }else{
        for (var key in req.files){
            var value=req.files[key].filename;
            product_img.push(value);
        }
    }

    var url=title.toLowerCase().split(' ').join('-');
    url += "-"+Math.floor((Math.random() * 10000) + 5);
    Setting.findOne({user_id:req.userData.user_id}).then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            const product=new Product({
                _id: new mongoose.Types.ObjectId,
                title : title,
                url : url,
                mrp : req.body.mrp,
                price : req.body.price,
                desc : req.body.desc,
                // feature_photo : product_img,
                photo : product_img,
                // photo2 : req.body.photo2, 
                // photo3 : req.body.photo3,
                // photo4 : req.body.photo4,
                website: req.body.website, 
                trends : req.body.trends, 
                featured_or_trend: req.body.featured_or_trend,
                unit_count : req.body.unit_count,
                unit : req.body.unit, 
                cat_id : req.userData.cat_id, 
                // sub_id : req.body.sub_id, 
                user_id: req.userData.user_id,
                status : req.body.status, 
                views : 0,
                stock: req.body.stock
            });
        
           
            product.save().then(result=>{
                res.status(200).json({
                    status: res.statusCode,
                    data:result,
                });
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            });
        }else{
            res.status(500).json({
                message: "Please try again Later!!"
            });
        }
    }).catch(err=>{
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
  
}


exports.update = (req, res) =>{

    var product_img=[];

    // //Checking Image
    if(!req.files){
        product_img="null";
    }else{
        for (var key in req.files){
            var value=req.files[key].filename;
            product_img.push(value);
        }
    }

    var url=(req.body.title).toLowerCase().split(' ').join('-');
    url += "-"+Math.floor((Math.random() * 10000) + 5);
    Setting.findOne({user_id:req.userData.user_id}).then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            const product=new Product({
                title : req.body.title,
                url : url,
                mrp : req.body.mrp,
                price : req.body.price,
                desc : req.body.desc,
                photo : product_img,
                website: req.body.website, 
                trends : req.body.trends, 
                featured_or_trend: req.body.featured_or_trend,
                unit_count : req.body.unit_count,
                unit : req.body.unit, 
                status : req.body.status,
                stock: req.body.stock
            });
        
            Product.updateMany({_id:req.params.id},product).then(result=>{
                res.status(200).json({
                    status: res.statusCode,
                    message:"Product Updated !",
                });
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            });
        }else{
            res.status(500).json({
                message: "Please try again Later!!"
            });
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
  
}

//Delete Product
exports.delete = (req, res) =>{
    Setting.findOne({user_id:req.userData.user_id}).then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            Product.deleteOne({_id:req.params.id}).then(result=>{
                res.status(200).json({
                    status: res.statusCode,
                    message:"Product Deleted !",
                });
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            });
        }else{
            res.status(500).json({
                message: "Please try again Later!!"
            });
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
  
}

exports.count=(req,res)=>{
    var url=req.params.url;
    
    Product.findOne({url:url}).exec().then(docs => {
        var views=docs.views+1;
        Product.updateOne({ _id: docs._id }, { $set: { views: views } }).exec().then(uv => {
            console.log("Views Updated !!");
        }).catch(err => {
            console.log(err);
        });
        res.status(200).json({
            data:docs
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
}

exports.getAll=(req,res)=>{
    console.log(req.params.id);
    Product.find({user_id:req.params.id}).select('title url photo mrp desc website').exec().then(data=>{
        res.status(200).json({
            status:res.statusCode,
            data:data
        });
    }).catch(err=>{
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    })
}