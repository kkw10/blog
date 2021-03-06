module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likeNumb: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikeNumb: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    subCommentsNumb: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0,
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
