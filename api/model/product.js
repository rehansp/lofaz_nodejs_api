const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title : String,
    url   : String,
    mrp   : Number,
    price : Number,
    desc : String,
    photo  : Array,
    website : String, 
    trends  : String,
    featured_or_trend : Number,
    unit_count : Number,
    unit       : String,  
    cat_id     : String, 
    sub_id     : String,
    user_id    : String,
    status     : Boolean,
    views      : Number,
    stock   : Number
},{
    timestamps:{
        createdAt: true,
        updatedAt: true
    }
});


module.exports=mongoose.model("Product",productSchema);