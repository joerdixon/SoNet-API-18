// Moment for determining creation time.
const moment = require('moment');
// Import Mongoose
const mongoose = require('mongoose');

const Reaction = new mongoose.Schema(
    {
        reactId: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Schema.Types.ObjectId
        },
        reactContent: {
            type: String,
            require: true,
            validate: {
                // Reactions cannot be longer than 280 characters.
                validator: value => (value.length >= 1 && value.length <= 280)
            }
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: value => {
                return moment(value).local().format("MMM Do YYYY, h:mm:ss a");
            }
        }
    }
);

// Export for use in other files.
module.exports = Reaction