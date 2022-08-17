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

//required to create Reaction schema only as a subdocument in Thought model.
//should be defined first possibly.