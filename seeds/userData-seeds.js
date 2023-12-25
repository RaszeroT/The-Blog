const User = require('../models/User')

const userData = [
    {
        id: 1,
        name: 'Anna Turner',
        email: 'anna@email.com',
        password: 'password12345',
    },
    {
        id: 2,
        name: 'Timber Middlebrooks',
        email: 'timbir@email.com',
        password: 'password12345',
    },
    {
        id: 3,
        name: 'Travis Shanhun',
        email: 'travis@email.com',
        password: 'password12345',
    }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers