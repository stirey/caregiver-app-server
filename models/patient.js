module.exports= (sequelize, DataTypes) => {
    const Patient= sequelize.define('patient', {
       name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        preferredName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthSex: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false,
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
        caregiverNotes: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return Patient
}

// Meals (breakfast, lunch, dinner)
// Search by first and/or last name