const mongoose=require('mongoose');

const customerSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    full_name : String,
    phone : Number,
    photo : String,
    address_line1 : String,
    address_line2 : String,
    city : String,
    state : String,
    zip : String,
    country : String, 
    mobile_token : String,
    last_login : String,
    status : Number
},{
    timestamps:{
        createdAt: true,
        updatedAt: true
    }
});


module.exports=mongoose.model("Customer",customerSchema);