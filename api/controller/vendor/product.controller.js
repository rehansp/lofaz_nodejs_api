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
                photo : product_img,
                website: req.body.website, 
                trends : req.body.trends, 
                featured_or_trend: req.body.featured_or_trend,
                unit_count : req.body.unit_count,
                unit : req.body.unit, 
                cat_id : req.body.cat_id, 
                // sub_id : req.body.sub_id, 
                user_id: req.userData.user_id,
                status : req.body.status, 
                views : 0,
                stock: req.body.stock
            });
        
           
            product.save().then(result=>{
                res.status(200).json({
                    status: res.statusCode,
                    message:"product Created !!",
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

    Setting.findOne({user_id:req.userData.user_id}).then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            const product=new Product({
                title : req.body.title,
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
        
            Product.updateMany({_id:req.params.product_id},product).then(result=>{
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
            Product.deleteOne({_id:req.params.product_id}).then(result=>{
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
    
    Product.findOne({url:url}).select('views').exec().then(docs => {
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

exports.getByCatId=(req,res)=>{
    Setting.findOne({user_id:req.userData.user_id}).then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            Product.find({cat_id:req.params.cat_id}).exec().then(data=>{
                res.status(200).json({
                    status:res.statusCode,
                    count:data.length,
                    data:data
                });
            }).catch(err=>{
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            })
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

exports.getByCatalogId=(req,res)=>{
    
    var id=req.params.cat_id;
    Product.find({cat_id:id}).exec().then(docs => {
        if(docs[0]==null){
            res.status(404).json({
                message:"No User Found !!"
            });
        }else{
            res.status(200).json({
                data:docs
            });
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
}