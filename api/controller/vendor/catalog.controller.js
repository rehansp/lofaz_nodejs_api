const Catalog = require('../../model/catalog');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const Setting=require('../../model/setting');

exports.create = (req, res) => {

    var user_id = req.userData.user_id;
    var cat_img;

    var title=req.body.title;
    if (!title ) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //Checking Image
    if(!req.file){
        cat_img="null";
    }else{
        cat_img=req.file.filename;
    }

    
    var url=(req.body.title).toLowerCase().split(' ').join('-');
    // console.log("user_id:"+user_id);
    Setting.findOne({user_id:user_id}).exec().then(validate=>{
        // console.log(validate);
        if(validate.account_status==true && validate.shop_status==true){
            const catalog = new Catalog({
                _id: new mongoose.Types.ObjectId,
                url: url,
                title: title,
                photo: cat_img,
                user_id: user_id,
                active:req.body.status,
                view:0
            });
        
            catalog.save().then(result => {
                res.status(200).json({
                    status: res.statusCode,
                    message:"Catalog Created !!",
                    data:result
                });
            }).catch(err => {
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
    })
    
}


exports.count=(req,res)=>{
    var url=req.params.url;
    
    Catalog.findOne({url:url}).select('view').exec().then(docs => {
        var views=docs.view+1;
        Catalog.updateOne({ _id: docs._id }, { $set: { view: views } }).exec().then(uv => {
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

exports.update=(req,res)=>{
    
    var cat_img;
    //Checking Image
    if(!req.file){
        cat_img="null";
    }else{
        cat_img=req.file.filename;
    }

    
    var url=(req.body.title).toLowerCase().split(' ').join('-');
    Setting.findOne({user_id:req.userData.user_id}).exec().then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            const catalog=new Catalog({
                url: url,
                title: req.body.title,
                photo: cat_img,
                active:req.body.status
            });
            Catalog.updateMany({_id:req.params.cat_id},catalog).then(update=>{
                res.status(200).json({
                    status:res.statusCode,
                    message:"Catalog Updated !"
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
    })
}


exports.delete=(req,res)=>{
    
    Setting.findOne({user_id:req.userData.user_id}).exec().then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            Catalog.deleteOne({_id:req.params.cat_id}).exec().then(result=>{
                res.status(200).json({
                    status:res.statusCode,
                    message:"Catalog Deleted !"
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
    })
}

exports.getByUserId=(req,res)=>{
    Setting.findOne({user_id:req.userData.user_id}).exec().then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            Catalog.find({user_id:req.params.user_id}).select('url').exec().then(data=>{
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
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    })
}


exports.getUserId=(req,res)=>{
    var url=req.params.user_id;
    Catalog.find({user_id:url}).exec().then(docs => {
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