const router = require('express').Router();
const postRoutes = require('./api/postRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
