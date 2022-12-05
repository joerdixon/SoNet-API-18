// Extract our needed values/objects from the mongoose package.
const { connect, connection } = require('mongoose');

// This connection string functions similarly to the port variable for express.
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';

// Connect using our connection string with an options object.
connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Export for use in server.js
module.exports = connection;