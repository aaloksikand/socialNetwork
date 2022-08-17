//deconstructing Schema and model from Mongoose package
const { Schema, model } = require ('mongoose'); 

//defining User
const userSchema = new Schema (
{
  //defining username
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  //defining email
  email: {
    type: String,
    required: true,
    unique: true,
    match:  [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
  },
  //defining thoughts referencing thoughts model
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  //defining friends referencing same User model
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
{
  toJSON: {
    //virtuals required for friendCount
    virtuals: true,
    getters: true,
  }
}
)

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});
const User = model ('User', userSchema)

module.exports = User;