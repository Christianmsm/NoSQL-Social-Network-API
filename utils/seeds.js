const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');


    await User.deleteMany({});


    console.log(userData)
    try {
    await User.insertMany(userData);
    console.log('success!');
    } catch (error) {
        console.error('error seeding', error);
    }

    console.table(userData);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});