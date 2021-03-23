const Customer=require('../../model/customer');
const mongoose=require('mongoose');
const moment=require('moment');

exports.create = (req, res) =>{

    var cust_img;
    if(!req.file){
        cust_img="null";
    }else{
        cust_img=req.file.filename;
    }

    var date = moment().format(); 
    var customer = new Customer({
        _id: new mongoose.Types.ObjectId,
        full_name : req.body.name,
        phone : req.body.phone,
        photo : cust_img,
        address_line1 : req.body.address_line1,
        address_line2 : req.body.address_line2,
        city : req.body.city,
        state : req.body.state,
        zip : req.body.zip,
        country : req.body.country,
        mobile_token : req.body.token,
        last_login : date,
        status : req.body.customer_Status
    });

    customer.save().then(result=>{
        res.status(200).json({
            status: res.statusCode,
            data:result
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message || "Some error occurred !!"
        });
    });
}
