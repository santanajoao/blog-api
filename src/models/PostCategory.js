'use strict';

/**
 * 
 * @param {import('DataTypes').DataTypes} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Category.belongsToMany(BlogPost, {
      as: 'blog_posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return PostCategory;
};
