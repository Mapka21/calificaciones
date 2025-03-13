module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grade: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      comments: {
        type: DataTypes.TEXT
      }
    });
  
    Activity.associate = (models) => {
      Activity.belongsTo(models.Subject);
    };
  
    return Activity;
  };