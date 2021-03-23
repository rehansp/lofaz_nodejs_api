const mongoose = require('mongoose');

const catalogSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    url: String,
    title: String,
    photo: String,
    user_id: String,
    active:Boolean,
    view:Number
    
},{ timestamps: {createdAt:true, updatedAt:true} });

module.exports = mongoose.model("Catalog", catalogSchema);
