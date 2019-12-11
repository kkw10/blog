module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subCommentsNumb: {
      type: DataTypes.INTEGER(11),
    },
    parentCommentId: {
      type: DataTypes.INTEGER(11),
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'    
  });

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsToMany(db.User, { 
      through: 'CommentsLike', 
      as: 'Likers', 
      foreignKey: 'LikedComment' 
    });
    db.Comment.belongsToMany(db.User, { 
      through: 'CommentsDislike', 
      as: 'Dislikers', 
      foreignKey: 'DislikedComment' 
    });
  }

  return Comment;
}
