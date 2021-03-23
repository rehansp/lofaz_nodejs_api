const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    full_name: String,
    username: String,
    phone: Number,
    email:String,
    account_type: String,
    business_name: String,
    acc_category: Array,
    photo:String,
    address_line1: String,
    address_line2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    about: String,
    currency: String,
    token:String,
    login: String,
    views:Number,
    last_login:String,
    
},{ timestamps: {createdAt:true, updatedAt:true} });

module.exports = mongoose.model("Vendor", vendorSchema);