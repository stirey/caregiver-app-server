module.exports= (sequelize, DataTypes) => {
    const Patient= sequelize.define('patient', {
       name:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        medication: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        careStart: {
            type: DataTypes.STRING,
            allowNull: false
        },
        careEnd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caregiverNotes: {
            type: DataTypes.STRING,
            allowNull: false
        }
 
    })
    return Patient
}
