module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('journal', {
        patient: {
            type: DataTypes.INTEGER,
        },
        journalDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        medicationTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mood: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        awake: {
            type: DataTypes.STRING,
            allowNull: false
        },
        asleep: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dailyNotes: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Journal;
};