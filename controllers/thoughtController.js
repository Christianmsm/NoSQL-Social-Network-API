const { Types } = require('mongoose');
const { Thought, User, reactions } = require('../models');

module.exports = {
getThoughts(req, res) {
    Thought.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},
getSingleThought(req, res) {
Thought.findOne({ _id: req.params.thoughtId })
.select('-__v')
.then((thought) =>
!thought
? res.status(404).json({ message: 'No user with that ID' })
: res.json(thought)
)
.catch((err) => res.status(500).json(err))
},
createThought(req, res) {
Thought.create(req.body)
.then((thought) => {
    return User.findOneAndUpdate(
        {username: req.body.username},
        {$addToSet: {thoughts: thought._id}},
        {new: true}
    )
})
.then((thought) => {
    res.status(200).json(thought)
})
.catch((err) => res.status(500).json(err));
},
updateThought(req, res) {
Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, {new: true})
.then((thought) => {
    res.status(200).json(thought)
})
.catch((err) => res.status(500).json(err));
},
deleteThought(req, res) {
Thought.findOneAndDelete({ _id: req.params.thoughtId })
.then((results) => {
    res.status(200).json(results)
})
.catch((err) => res.status(500).json(err));
},
addReaction(req, res) {
Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    {$addToSet: {reactions: {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
        createdAt: new Date()
    }}},
    {new: true}
    )
    .then((thought) => {
        res.status(200).json(thought)
    })
    .catch((err) => res.status(500).json(err));
},
deleteReaction(req, res) {
Thought.updateOne(
    { _id: req.params.thoughtId },
    { $pull: {reactions: {_id: req.params.reactionId}} },
    { new: true }
)
.then((results) => {
    res.status(200).json(results)
})
.catch((err) => res.status(500).json(err));
}

};