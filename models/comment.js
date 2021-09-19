'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class comment extends Model {

		static minLen = 3

		static associate(models) {
			models.comment.belongsTo(models.user)
		}
	}
	comment.init({
		text: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Comment text is required."
				},
				len: {
					args: [comment.minLen],
					msg: `Comment text must be at least ${comment.minLen} letters long.`
				},
			}
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true
			}
		},
		trackId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		trackName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		artistName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		albumImage: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true
			}
		}
	}, {
		sequelize,
		modelName: 'comment',
	})
	return comment
}