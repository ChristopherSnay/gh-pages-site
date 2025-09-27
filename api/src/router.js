const testController = require('./controllers/test-controller');

const router = require('express').Router();

router.route('/test').get(testController.get);

module.exports = router;
