const connection = require('../config/connection');

const { User, Thought } = require('../models');

const { Schema, Types, model } = require("mongoose");

const userData = [
]

const thoughtData = [
    {
        thoughtContent: "I wish internet was free",
        username: "joerdixon"
    },
    {
        thoughtContent: "I have lost the ability to laugh",
        username: "jimmyg99"
    },
    {
        thoughtContent: "Why are some apples green?",
        username: "joerdixon"
    },
    {
        thoughtContent: "Mongo is pretty cool I guess.",
        username: "jrehfuss"
    },
    {
        thoughtContent: "Lebron is not top 3 all time.",
        username: "jordanlover23"
    },
]

const reactionData = [
    {
        reactContent: 'Cant believe this!',
        username: 'Dad',
        reactId: new Types.ObjectId()
    },
    {
        reactContent: 'Wowee!',
        username: 'timmy123',
        reactId: new Types.ObjectId()
    },
    {
        reactContent: 'OMG',
        username: 'bert556',
        reactId: new Types.ObjectId()
    },
    {
        reactContent: 'You might be right...',
        username: 'hans23solo',
        reactId: new Types.ObjectId()
    },
    {
        reactContent: 'Bad take.',
        username: 'niagarafalls222',
        reactId: new Types.ObjectId()
    },
]

// Returns a random index
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Returns a specified number of random reactions.
const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push(getRandomArrItem(reactionData));
    }
    return results;
};

// Return the error if there is one.
connection.on('error', (err) => err);

// When we connect...
connection.once('open', async () => {
    console.log('connected');

    // Delete all existing users
    await User.deleteMany({});

    // Delete all existing thoughts
    await Thought.deleteMany({})

    // Create new thoughts array
    const thoughts = []

    // Here we are iterating through the seeded thoughts and attaching random reactions to them.
    thoughtData.forEach(thought => {
        const reactions = getRandomReactions(3);
        thought.reactions = reactions;
        thoughts.push(thought)
    })

    // Insert our new array into the database.
    await Thought.collection.insertMany(thoughts)

    await User.collection.insertOne({
        username: 'joerdixon',
        thoughts: [...thoughts.map(thought => thought._id)]
    })

    process.exit(0);
});