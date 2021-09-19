module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction()
		try {
			await queryInterface.addColumn(
				'comments',
				'trackName',
				{
					type: Sequelize.DataTypes.STRING,
				},
				{ transaction }
			)
			await queryInterface.addColumn(
				'comments',
				'artistName',
				{
					type: Sequelize.DataTypes.STRING,
				}, { transaction }
			)
			await queryInterface.addColumn(
				'comments',
				'albumImage',
				{
					type: Sequelize.DataTypes.STRING
				}, { transaction }
			)

			await transaction.commit()
		} catch (err) {
			await transaction.rollback()
			throw err
		}
	},
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction()
		try {
			await queryInterface.removeColumn('comments', 'trackName', { transaction })
			await queryInterface.removeColumn('comments', 'artistName', { transaction })
			await queryInterface.removeColumn('comments', 'albumImage', { transaction })
			await transaction.commit()
		} catch (err) {
			await transaction.rollback()
			throw err
		}
	}
}