const mongoose = require('mongoose');
const config = require('../config/nodemon.json');

const url = "mongodb+srv://rehan:"+config.env.MONGO_ATLAS_PWD+"@rehan.qjzvb.mongodb.net/lofaz";

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(data=>{
    console.log("Database Connected !");
}).catch(err=>{
    console.log(err);
});




module.exports = mongoose;