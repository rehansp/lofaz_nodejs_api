const Vendor = require('../../model/vendor');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const Setting=require('../../model/setting');

exports.create = (req, res) => {
     var phone = req.body.phone;

    if (!phone ) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //Image Validation
    var vendor_img;

    if(!req.file){
        vendor_img="null";
    }else{
        vendor_img=req.file.filename;
    }
    var date = moment().format(); 
    var mobile_token = req.body.token;
    Vendor.findOne({phone:phone}).exec().then(docs => {
        if (docs) {
            Setting.findOne({user_id:docs._id}).then(data=>{
                if(data.account_status==true){
                    const token = jwt.sign({ phone: phone, user_id: docs._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "6h" });
                    Vendor.updateOne({ _id: docs._id }, { $set: { token: mobile_token } }).exec().then(uv => {
                        console.log("token Updated !!");
                    }).catch(err => {
                        console.log(err);
                    });
                    res.status(409).json({
                        status:res.statusCode,
                        message: "Already Vendor Exits !!",
                        token:token
                    });
                }else{
                    res.status(404).json({
                        message: "Account Disable !!"
                    });
                }
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            })
            
        } else {
            const vendor=new Vendor({
                _id: new mongoose.Types.ObjectId,
                full_name: req.body.full_name,
                username: req.body.username,
                phone: req.body.phone,
                email:req.body.email,
                account_type: req.body.account_type,
                business_name: req.body.business_name,
                acc_category: req.body.acc_category,
                photo: vendor_img,
                address_line1: req.body.address_line1,
                address_line2: req.body.address_line2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                country: req.body.country,
                about: req.body.about,
                currency: req.body.currency,
                token:mobile_token,
                views:req.body.views,
                last_login:date
            });

            vendor.save().then(result => {
                const token = jwt.sign({ phone: phone, user_id: result._id,username:result.username }, process.env.TOKEN_SECRET_KEY, { expiresIn: "6h" });
                const setting=new Setting({
                    _id: new mongoose.Types.ObjectId,
                    user_id: result._id,
                    whatsapp_status:true,
                    account_status:true,
                    shop_status:true,
                    order_status:true
                });
                
                setting.save().then(data=>{
                    console.log("Updated Setting !");
                }).catch(err=>{
                    console.log(err);
                });
                res.status(200).json({
                    status: res.statusCode,
                    message:"Vendor Account Created !!",
                    token:token,
                    data: result
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            });
        }
    }).catch(err => {
         console.log(err);
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
}

exports.count=(req,res)=>{
    var uname=req.params.username;
    Vendor.findOne({username:uname}).select('views').exec().then(docs => {
        var views=docs.views+1;
        Vendor.updateOne({ _id: docs._id }, { $set: { views: views } }).exec().then(uv => {
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


//Update Vendor details
exports.update=(req,res)=>{
    var vendor_img;
    var user_id=req.userData.user_id;
    if(!req.file){
        vendor_img="null";
    }else{
        vendor_img=req.file.filename;
    }
    
    Setting.findOne({user_id:user_id}).exec().then(validate=>{
        if(validate.account_status==true && validate.shop_status==true){
            const vendor=new Vendor({
                full_name: req.body.full_name,
                username: req.body.username,
                phone: req.body.phone,
                email:req.body.email,
                account_type: req.body.account_type,
                business_name: req.body.business_name,
                acc_category: req.body.acc_category,
                photo: vendor_img,
                address_line1: req.body.address_line1,
                address_line2: req.body.address_line2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                country: req.body.country,
                about: req.body.about
            });
            Vendor.updateMany({ _id: user_id },vendor).then(result=>{
                res.status(200).json({
                    status:res.statusCode,
                    message:"Vendor Updated !!"
                })
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

exports.getByUsername=(req,res)=>{
    var uname=req.params.username;
    Vendor.find({username:uname}).exec().then(docs => {
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