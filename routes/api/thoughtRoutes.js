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
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// api/thoughts
router.route('/')
    .get(getThoughts)

// /api/thoughts/:id
router
    .route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)

// /api/thoughts/userId
router
    .route('/:userId')
    .post(createThought);

  // /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

  // /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);


module.exports = router;
