const postsController = require('./controllers/posts.controller');
const testController = require('./controllers/test-controller');
const postTypesController = require('./controllers/post-types.controller');

const router = require('express').Router();

// posts
router.route('/posts').get(postsController.get);
router.route('/posts').post(postsController.save);
router.route('/posts').put(postsController.update);
router.route('/posts/:filename').delete(postsController.delete);
router.route('/posts/:filename').get(postsController.getByFilename);

router.route('/post-types').get(postTypesController.get);

router.route('/test').get(testController.get);

module.exports = router;
