const express = require('express');
const router = express.Router();

const messageCtrl = require("../controllers/messagesControllers")
const auth = require('../middleware/auth');

router.get('/', messageCtrl.getAll)
router.delete("/delete/:id", auth, messageCtrl.deleteMessage)
router.post('/createMessage/', auth, messageCtrl.createMessage)
router.get('/byID/:id', auth, messageCtrl.getById)
router.post("/modifyMessage/:id", auth,  messageCtrl.modifyMessage)







module.exports = router