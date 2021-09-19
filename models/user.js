'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			models.user.hasMany(models.comment)
		}
	}
	user.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			spotifyId: {
				type: DataTypes.STRING,
				allowNull: false
			},
			profilePic: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'user',
		}
	)
	return user
}
