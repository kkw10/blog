module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'    
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.User, { through: 'RecomendPost', as: 'Recomenders'})
    db.Post.belongsToMany(db.HashTag, { through: 'PostHashTag' });
    db.Post.hasMany(db.Comment);
  }

  return Post;
}