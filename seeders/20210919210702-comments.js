const faker = require("faker")

const comments = [...Array(10)].map((comment) => (
	{
		text: faker.lorem.paragraph(),
		userId: 2,
		trackId: '5NwlxPHSKlRBLvOVwn2g7i',
		trackName: 'Save My Hide',
		artistName: 'Helloween',
		albumImage: 'https://i.scdn.co/image/ab67616d0000b27388b66dea655a68b22ed0a274',
		createdAt: new Date(),
		updatedAt: new Date(),

	}
))

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('comments', comments)
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('comments', null, {})
	}
};
