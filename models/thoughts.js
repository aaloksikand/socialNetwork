const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    reactions: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
      //the user that created the thought
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = thoughtSchema;
//Create a virtual called reactionCount that retrieves the length 
//of the thought's reactions array field on query.

Reaction (SCHEMA ONLY)

reactionId

Use Mongoose's ObjectId data type
Default value is set to a new ObjectId
reactionBody

String
Required
280 character maximum
username

String
Required
createdAt

Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query
Schema Settings

This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
