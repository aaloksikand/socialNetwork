const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema (
  {
    //created reactionSchema
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method for format
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const thoughtSchema = new Schema (
  {
    //defining thoughtText
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    //defining createdAt
    createdAt: {
      type: Date,
      default: Date.now,
      //user a getter method
    },
    username: {
      type: String,
      required: true
    },
    reactions: //array of nested documents created with the reactionSchema
  },
  {
    toJSON: {
      virtuals: true,  //required for reactionCount
      getters: true,  //required for timestamp format
    }
  }
)
//creatging reactionCount virtual from class activity 21
// postSchema.virtual('commentCount').get(function () {
//   return this.comments.length;
// });
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thoughts = model ('Thought', thoughtSchema);

module.exports = Thoughts;