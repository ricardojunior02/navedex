module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('navers_projects', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    project_id: {
      type: Sequelize.INTEGER,
      references: { model: 'projects', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },
    navers_id: {
      type: Sequelize.INTEGER,
      references: { model: 'navers', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
   })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('navers_projects')
  }
};
