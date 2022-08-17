const { Thought, User } = require('../models');

const thoughtController = {

    getThoughts(req, res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createThought(req, res){
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate({ _id: req.params.userId},
                {$push: { thoughts: _id }}, 
                {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'Error'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },
    updateThought(req, res){
        Thought.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thoughts found'});
                return;
            }
                res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    deleteThought(req, res){
        Thought.findOneAndDelete({_id: req.params.id})
        .then(dbThoughtData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts found'});
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts found'});
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))

    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new : true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No reactions found'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }
};



module.exports = thoughtController; 