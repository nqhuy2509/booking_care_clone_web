'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         *
         */

        return queryInterface.bulkInsert('Users', [
            {
                email: 'admin@gmail.com',
                password: '12345',
                firstName: 'nguyen van',
                lastName: 'a',
                address: 'tphcm',
                gender: 1,
                roleId: 'R1',
                phonenumber: '0123456',
                positionId: 'prosessor',
                image: 'kajfks',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
}
