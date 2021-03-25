const { DataTypes, Model } = require('sequelize');

class Users extends Model {
  static init(sequelize){
    super.init({
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },{
      sequelize,
      modelName: 'User',
      tableName: 'users'
    });
  }

  static associate(models){
    this.hasMany(models.Naver, { foreignKey: 'owner_naver_id', as: 'my_navers'});
  }
}

module.exports = Users;
