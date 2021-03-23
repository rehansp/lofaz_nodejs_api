const jwt=require('jsonwebtoken');
const config=require('../config/nodemon.json')

module.exports=(req,res,next)=>{
    try{
        const token=req.headers['authorization'].split(' ')[1];
        // console.log(token);
        const decode =jwt.verify(token,config.env.SECRET_KEY);
        req.userData=decode;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Auth Failed"
        })
    }
}