module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('patient', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        preferredName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ethnicity: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }

    })
    return Patient
}