const { Model, DataTypes } = require('sequelize');


class Projects extends Model {
    static init(sequelize){
      super.init({
        name: DataTypes.STRING, 
        },{
        sequelize,
        modelName: 'Project',
        tableName: 'projects',
      })
    }

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner_project'});
      this.belongsToMany(models.Naver, {foreignKey: 'project_id', through: 'navers_projects', as: 'navers'});
    }
};

module.exports = Projects;