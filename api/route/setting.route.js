module.exports=app=>{
    var setting=require('../controller/vendor/setting.controller');
    var route=require('express').Router();
    const auth = require('../middleware/auth-check');

    route.put('/:user_id',auth,setting.update); //update Setting
    route.get('/:user_id',auth,setting.getSetting); //Get Setting
    route.use('/testing',auth,(req,res)=>{
        res.send("Setting Api Working");
    });

    app.use('/api/setting',route);
}