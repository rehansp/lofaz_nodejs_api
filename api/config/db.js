const mongoose = require('mongoose');
const dotEnv = require('dotenv');
dotEnv.config();

const url = process.env.DB_SERVER;

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(data=>{
    console.log("Database Connected !");
}).catch(err=>{
    console.log(err);
});




module.exports = mongoose;