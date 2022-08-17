//api/users routes
//GET all users
//GET a single user by its _id and populated thought and friend data
//POST a new user
//PUT to update a user by its _id
//DELETE to remove a user by its _id
//BONUS: Remove a user's associated thoughts when deleted.

//api/users/:userId/friends/:friendId
//post to add a new friend to a user's friend list
//delete to remove a friend from a user's friend list

const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)

// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;
