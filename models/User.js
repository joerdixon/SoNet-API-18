const mongoose = require('mongoose');

// This regex ensures that we are only getting emails.
const emailAuth = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: value => {
                    // Check their email against our regular expression
                    return emailAuth.test(value)
                },
                message: 'Invalid email address'
            }
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Virtual to return the number of friends a user has.
userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length
    });

const User = mongoose.model('User', userSchema)

module.exports = User;