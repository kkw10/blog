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
    //...
  }
}