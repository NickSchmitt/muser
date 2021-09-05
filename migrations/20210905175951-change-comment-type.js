'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn('comments', 'text', {
			type: Sequelize.TEXT
		})
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn('comments', 'text', {
			type: Sequelize.STRING
		})
	}
};
