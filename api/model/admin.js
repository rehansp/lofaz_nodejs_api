const mongoose = require('mongoose');

const adminSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    full_name: String,
    email: String,
    password: String,
    role:String,
    status:Number
    
},{ timestamps: {createdAt:true, updatedAt:false} });

module.exports = mongoose.model("Admin", adminSchema);
