const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    'users',
    {
        id:{
            type:Sequelize.INTEGER, //  int类型
            primaryKey:true,    //  主键
            autoIncrement:true, //  自增
        },
        name:{
            type:Sequelize.STRING,  //  字符串
        },
        email:{
            type:Sequelize.STRING,  //  字符串
        },
        password:{
            type:Sequelize.STRING,  //  字符串
        },
        created:{
            type:Sequelize.DATE,  //  时间类型
            defaultValue:Sequelize.NOW, //  默认值 当前时间
        }
    },{
        timestamps:false,   //  不自动加上createdAt和updatedAt
    }
)