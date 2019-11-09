const Express = require('express');
const router = Express.Router();
const postCtrl = require('./post.ctrl');

router.post('/', postCtrl.write);
router.get('/:id', postCtrl.read);
router.patch('/id', postCtrl.update);
router.delete('/id', postCtrl.delete);

module.exports = router;