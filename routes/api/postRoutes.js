//api/thoughts
//get all thoughts
//get a single thought by its _id
//post to create a new thought (don't forget to 
//push the created thought's _id to the associated 
//user's thoughts array field)
//put to update a thought by its _id
//delete to remove a thought by its _id

//api/thoughts/:thoughtId/reactions
//post to create a reaction stored in a single 
//thought's reactions array field
//delete to pull and remove a reaction by the
//reaction's reactionId value

const router = require('express').Router();
const {
  getSinglePost,
  getPosts,
  createPost,
} = require('../../controllers/postController');

router.route('/').get(getPosts).post(createPost);

router.route('/:postId').get(getSinglePost);

module.exports = router;
