const Admin = require('../../model/admin');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
     var email = req.body.email;
    
    if (!email ) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    bcrypt.hash(req.body.password, 10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            });
        }else{
            const admin=new Admin({
                _id: new mongoose.Types.ObjectId,
                full_name:req.body.name,
                email: req.body.email,
                password:hash,
                role:req.body.role,
                status:req.body.status
            });

            admin.save().then(result => {
                res.status(200).json({
                    status: res.statusCode,
                    data:result
                });
            }).catch(err => {
                res.status(500).json({
                    error: err.message || "Some error occurred !!"
                });
            });
        }
    })
}