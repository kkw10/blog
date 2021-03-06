const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Modeling a user "table"
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      validate: { min: 3 },
      allowNull: false
    },
    followers: {
      type: DataTypes.INTEGER(11),
    },
    followings: {
      type: DataTypes.INTEGER(11),
    },
    portrait: {
      type: DataTypes.STRING(200),
    },
    background: {
      type: DataTypes.STRING(200),
    },
    title: {
      type: DataTypes.STRING(200),
    },
    descript: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING(100),
    },
    favorite: {
      type: DataTypes.STRING(100),
    },
    contact: {
      type: DataTypes.STRING(100),
    },
  }, {
    // mysql에 한글을 저장하기 위한 옵션
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  // 테이블간의 관계 설정
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment, { as: 'comments' });
    db.User.belongsToMany(db.Post, { through: 'RecomendPost', as: 'RecomendedPost' })
    db.User.belongsToMany(db.Comment, { through: 'CommentsLike', as: 'Likers', foreignKey: 'LikersId' });
    db.User.belongsToMany(db.Comment, { through: 'CommentsDislike', as: 'Dislikers', foreignKey: 'DislikersId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingsId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowersId' });
  };

  // Static mehtods
  User.setPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  };

  User.prototype.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.dataValues.password);
    return result;
  };

  User.prototype.generateToken = function() {
    const token = jwt.sign(
      {
        id: this.dataValues.id,
        email: this.dataValues.email,
        nickname: this.dataValues.nickname
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2d',
      },
    );

    return token;
  };

  return User;
}