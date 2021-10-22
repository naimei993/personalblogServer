const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
// const DataTypes = require('sequelize/lib/data-types');
const db = new Sequelize('test', 'root', '8023', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
   
    define: {   //模型设置
        freezeTableName:true,    //自定义表面，不设置会自动将表名转为复数形式
        timestamps:false    //自动生成更新时间、创建时间字段：updatedAt,createdAt
    }
});

const sequelize = db;
const User = require(__dirname + "/models/user.js")(sequelize, DataTypes);
const UserInfo = require(__dirname + "/models/userInfo.js")(sequelize, DataTypes);
(async ()=>{
    let newUser = await User.create({
            id:123,
          userName: "admin",
          password: "123456",
      })
      
    //返回新添加的数据
    console.log(newUser,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
})()

db.authenticate().then(() => {
    db.sync({force:true})   //自动建表
    console.log('连接数据库成功......');
    // console.log(db.models)  //输出已经定义的模型
})
.catch(err => {
    console.error('连接数据库失败......', err);
});