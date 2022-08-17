const { User, Thought } = require ('../models');

const userController = {
  
  getUsers(req, res) {
    User.find()
        .then(async (users) => {
          const allUsers = {
            users
          };
          return res.json(allUsers);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json (err);
        });
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.id })
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})
    .select('__v')
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({message: 'No User with this ID!'});
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
  },
  createUser(req, res) {
    User.create(req.body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {new: true, runValidators: true}
    )
  .then(dbUserData => {
    if(!dbUserData) {
      res.status(404).json({message: 'User not found'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => res.json(err))
  },
  deleteUser(req, res){
    User.findOneAndRemove({_id: req.params.id})
    .then((user) =>
    !user
    ?res.status(404).json({message: 'User not found'})
    :
    res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  addFriend(req, res) {
  User.findOneAndUpdate({_id: req.params.id}, {$push: { friends: req.params.friendId}}, {new: true})
  .populate({path: 'friends', select: ('-__v')})
  .select('-__v')
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({message: 'User not found'});
      return;
    }
  res.json(dbUserData);
  })
  .catch(err => res.json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.id}, {$pull: { friends: req.params.friendId}})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({message: 'User not found'});
        return;
      }
    res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = userController


