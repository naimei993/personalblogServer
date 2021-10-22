const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid")
process.env.SECRET_KEY = "secret";

router.get("/test",(req,res) => {
    res.json({code:1})
})

router.post("/register",(req,res) => {
    console.log(req.body);
    const now = new Date();
    const userData = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        created:now
    }
    //  存之前先查
    Users.findOne({where:{email:userData.email}}).then( (user) => {
        if (!user) {
            //  加密
            bcrypt.hash(req.body.password,10,(err,hash) => {
                //  hash 加密后的内容
                userData.password = hash
                Users.create(userData)
                .then( user => {
                    res.json({status:user.email + " registered"})
                })
                .catch( err => res.send("error: "+ err))
            })
        }else {
            //  数据库存在
            res.json({status:1,msg:"此用户名已经存在"});
        }
    }).catch( err => res.send("error: "+err))
})

router.post("/login",(req,res) => {
    // console.log(req.body)
    //  拿到数据去表里查
    Users.findOne({where:{email:req.body.email}}).then( user => {
        //  查到用户
        if (user) {
            //  匹配密码
            if (bcrypt.compareSync(req.body.password,user.password)) {
                //  生成token
                delete user.dataValues.password;    //  删除密码字段
                let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                console.log(token);
                res.json({status:0,msg:"登陆成功",token})
                
            }else {
                res.send({status:1,msg:"账号或用户名错误"})
            }
        } else {
            res.status(400).json({status:1,msg:"账号或用户名错误"})
        }
    }).catch( err => res.send("error: "+ err))
})

module.exports = router;