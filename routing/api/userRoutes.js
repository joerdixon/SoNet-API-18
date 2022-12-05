const router = require("express").Router();
const { User } = require("../../models");

// All Users
router.get("/", (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => {
            res.json(err);
        });
});

// One User
router.get("/:userId", (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "User Not Found" })
            } else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
});

// New User
router.post("/", (req, res) => {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            res.json(err);
            console.log(err);
        });
});

// Update One User
router.put("/:userId", (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "User Not Found" })
            } else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
});

// Delete User
router.delete("/:userId", (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "User Not Found" })
            } else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
});

// New Friend
router.post("/:userId/friends", (req, res) => {
    User.findByIdAndUpdate(
        req.params.userId,
        {
            $addToSet: { friends: req.body.friendId },
        },
        { runValidators: true, new: true }
    )
        .then((user) => res.json(user))
        .catch((err) => {
            res.json(err);
            console.log(err);
        });
});

// Delete Friend
router.delete('/:userId/friends/:friendId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "User Not Found" })
            } else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
})

module.exports = router;