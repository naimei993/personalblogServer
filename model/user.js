module.exports = (sequelize, DataTapes) => {
    console.log("BBBBBBBBBBBBBBB");
    return sequelize.define('user', {
        id: {
            type: DataTapes.INTEGER,
            primaryKey: true
        },
        userName: {
            type: DataTapes.STRING,
            Unique: true,
            allowedNull: false
        },
        password: {
            type: DataTapes.STRING,
        }
    })
}