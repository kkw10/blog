const bcrypt = require('bcrypt');

// Modeling a user "table"
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    // mysql에 한글을 저장하기 위한 옵션
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });

  // 테이블간의 관계 설정
  User.associate = (db) => {
    
  }

  // Static mehtods
  User.setPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  }

  User.prototype.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.dataValues.password);
    return result;
  }

  return User;
}