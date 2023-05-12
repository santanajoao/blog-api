'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts_categories', {
      post_id: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      category_id: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
    });
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('posts_categories');
  }
};
