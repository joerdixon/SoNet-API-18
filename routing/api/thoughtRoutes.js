const router = require("express").Router();
const { Thought, User } = require("../../models");

// All Thoughts
router.get("/", (req, res) => {
    Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            res.json(err);
        });
});

// One Thought
router.get("/:thoughtId", (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "Thought Not Found" })
            } else {
                res.json(thought);
            }
        })
        .catch((err) => res.status(500).json(err));
});

// New Thought
router.post("/", (req, res) => {
    Thought.create(req.body).then((thought) => {
        User.findByIdAndUpdate(
            req.body.userId,
            {
                $addToSet: { thoughts: thought._id },
            },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(200).json({ message: "Thought Created" })
                } else {
                    res.json(thought);
                }
            })
            .catch((err) => res.status(500).json(err));
    });
});

// Update Thought
router.put("/:thoughtId", (req, res) => {
    Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "Thought Not Found" })
            } else {
                res.json(thought);
            }
        })
        .catch((err) => res.status(500).json(err));
});

// Delete Thought
router.delete("/:thoughtId/:userId", (req, res) => {
    Thought.findByIdAndDelete(req.params.thoughtId).then((thought) => {
        if (!thought) {
            res.status(404).json({ message: "No Thought Found" })
        } else {
            User.findByIdAndUpdate(
                req.params.userId,
                {
                    $pull: { thoughts: req.params.thoughtId },
                },
                { new: true }
            ).then((user) => {
                if (!user) {
                    res.status(404).json({ message: "No User Found" })
                } else {
                    res.json(user)
                }
            })
        }
    });
});

// New Reaction
router.post("/:thoughtId/reactions", (req, res) => {
    Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
            $addToSet: { reactions: req.body },
        },
        { new: true }
    ).then((thought) => {
        if (!thought) {
            res.status(404).json({ message: "Thought Not Found" })
        } else {
            res.json(thought);
        }
    })
});

// Delete Reaction
router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findByIdAndUpdate(req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "Thought Not Found" })
            } else {
                res.json(thought);
            }
        })
        .catch((err) => res.status(500).json(err));
})

module.exports = router;