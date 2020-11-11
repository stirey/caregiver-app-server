module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('patient', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // nickname: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: false
        // },
        age: {
            type: DataTypes.INTEGER,
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
        },
        owner: {
            type: DataTypes.INTEGER 
        }

    })
    return Patient
}