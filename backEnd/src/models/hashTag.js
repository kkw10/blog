module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define('HashTag', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'    
  });

  HashTag.associate = (db) => {
    db.HashTag.belongsToMany(db.Post, { through: 'PostHashTag' });
  }

  return HashTag;
}