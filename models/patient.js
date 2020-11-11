module.exports= (sequelize, DataTypes) => {
    const Patient= sequelize.define('patient', {
       name:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        preferredName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
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
// possibly remove careEnd
// make searchable by first and last name (possibly)

