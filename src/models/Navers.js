const { DataTypes, Model } = require('sequelize');

class Navers extends Model {
  static init(sequelize){
    super.init({
      name: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      admission_date: DataTypes.DATE,
      job_role: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Naver',
      tableName: 'navers',
    })
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_naver_id', as: 'owner_naver'});
    this.belongsToMany(models.Project, {foreignKey: 'navers_id', through: 'navers_projects', as: 'projects', })
  }
};

module.exports = Navers;

