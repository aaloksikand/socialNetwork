const router = require('express').Router();
const postRoutes = require('./api/thoughtRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
