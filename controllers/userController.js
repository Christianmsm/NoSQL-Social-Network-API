const {  User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with this ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    addUserFriend(req, res) {
        User.findOne({ username: req.body.username }, { new: true })
        .select('-__v')
        .then((user) => {
            return User.findByIdAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: user._id}},
                {new: true}
            )
        })
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, {new: true})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => res.status(500).json(err));
    },
    deleteUserFriend(req, res) {
        User.updateOne(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendsId}},
            {new: true}
        )
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((err) => res.status(500).json(err));
    }
};