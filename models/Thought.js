const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
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
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

let reactionCount = thoughtSchema.virtual('reactions').get(function() {
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;