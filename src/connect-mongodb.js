const mongoose = require('mongoose');

const config = require('../../config');

module.exports = async () => {
    await mongoose.connect(config.mongodb.url, {dbName: config.project.name}).then(() => console.log('[Mongo Database] Connected.'));
    return;
};
