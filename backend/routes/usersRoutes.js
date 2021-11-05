const express = require('express');
const router = express.Router();

const app = express();
const multer = require("multer");

const userCtrl = require("../controllers/usersControllers")
const auth = require('../middleware/auth');

router.post('/User/new', userCtrl.createUser)
router.post("/User/login", userCtrl.userConnect)
router.get("/getProfil/:id", auth, userCtrl.userGetById)
router.post("/modifyUser/:id", auth, userCtrl.userModify)
router.post("/updatePassword/:id", auth, userCtrl.userUpdatePassword)
router.post("/deleteUser/:id", userCtrl.deleteAccount)

module.exports = router