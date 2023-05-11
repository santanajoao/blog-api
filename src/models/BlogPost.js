'use strict';

/**
 * 
 * @param {import('DataTypes').DataTypes} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(),
    }
  }, {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId', as: 'users'
    });
  };

  return BlogPost;
};
