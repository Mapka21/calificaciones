module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Subject.associate = (models) => {
      Subject.hasMany(models.Activity);
    };
  
    return Subject;
  };