const postsController = require('./controllers/posts-controller');
const testController = require('./controllers/test-controller');

const router = require('express').Router();

// posts
router.route('/posts').get(postsController.get);
router.route('/posts').post(postsController.save);
router.route('/posts').delete(postsController.delete);
router.route('/posts/:filename').get(postsController.getByFilename);

router.route('/test').get(testController.get);

module.exports = router;
