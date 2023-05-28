const { Schema, model } = require('mongoose');
const Reactions = require('./Reaction');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => createdAt.toISOString()
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        reactions: [Reactions],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;