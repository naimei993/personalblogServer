
module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('userInfo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowedNull:false
        },
        tel:{
            type:DataTypes.STRING(11),
        }
    })
}