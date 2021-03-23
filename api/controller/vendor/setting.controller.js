const Setting=require('../../model/setting');
const mongoose=require('mongoose');

exports.update = (req, res) =>{

    var user_id=req.userData.user_id;

    Setting.findOne({user_id:user_id}).then(validate=>{
        console.log(validate);
        if(validate.account_status==true){
            const setting=new Setting({
                whatsapp_status:req.body.whatsapp_status,
                shop_status:req.body.shop_status,
                order_status:req.body.order_status
            });
            Setting.updateMany({ user_id:req.params.user_id},setting).then(result=>{
                res.status(201).json({
                    status:res.statusCode,
                    message:"Setting Updated !!"
                });
            }).catch(err=>{
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            })
        }else{
            res.status(404).json({
                message:"Please try Again !!"
            });
        }
        
    }).catch(err=>{
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
}

exports.getSetting = (req, res) =>{

    var user_id=req.userData.user_id;

    Setting.findOne({user_id:user_id}).then(validate=>{
        if(validate.account_status==true){
            Setting.find({ user_id: req.params.user_id }).select('user_id whatsapp_status shop_status order_status').exec().then(result=>{
                res.status(200).json({
                    status:res.statusCode,
                    message:result
                });
            }).catch(err=>{
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            })
        }else{
            res.status(404).json({
                message:"Please try Again !!"
            });
        }
        
    }).catch(err=>{
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
}