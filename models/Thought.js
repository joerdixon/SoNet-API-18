// Moment for determining the creation time.
const moment = require('moment');
// Import Mongoose
const mongoose = require('mongoose');
// Require our reaction model.
const reactSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema(
    {
        thoughtContent: {
            type: String,
            required: true,
            validate: {
                validator: value => {
                    // Posts cannot be longer than 280 characters.
                    return value.length >= 1 && value.length <= 280
                },
                message: "Thoughts can be no longer than 280 characters!"
            }
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: value => {
                return moment(value).local().format("MMM Do YYYY, h:mm:ss a");
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactSchema]
    }
);

// Creating a virtual to return the length(number) of reactions on a post.
thoughtSchema.virtual('reactCount')
    .get(() => { this.reactions.length })

// Format and export the model.
const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = Thought;