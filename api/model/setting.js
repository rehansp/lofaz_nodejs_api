const mongoose=require('mongoose');

const settingSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    user_id: String,
    whatsapp_status: Boolean,
    account_status: Boolean,
    shop_status:Boolean,
    order_status:Boolean,
},{
    timestamps:{
        createdAt: true,
        updatedAt: false
    }
});


module.exports=mongoose.model("Setting",settingSchema);