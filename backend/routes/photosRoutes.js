const express = require('express');
const app = express();
const router = express.Router();
const multer = require("multer");
const photoCtrl = require("../controllers/photosControllers")
const auth = require('../middleware/auth');

// MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES 

// MULTER 
/* Permet de recupérer les type mimes */
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storageImage = (multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, './public/images') 
    },
    filename: (req, file, callback) => {
        /* Remplacer les espaces par des _ */
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    /* Renommer le fichier avec son nom d'origine + date + extension */
    callback(null, name );
    }
}))

const upload = multer({storage : storageImage})

// ROUTES MESSAGES 
router.post('/deleteMessageBDD/:id', photoCtrl.deletePhotoBDD)
router.get("/deletePhotoMessage/:id", photoCtrl.deletePhotoServeur)
router.post("/updatePhotoMessage/:id", upload.single('image') , photoCtrl.updatePhotoBDD)

// ROUTES USERS

router.get("/deletePhotoUser/:id", photoCtrl.deleteUserPhotoServeur) 
router.post('/deletePhotoUser_BDD/:id', photoCtrl.deleteUserPhotoBDD)
router.post("/updatePhotoUser/:id", upload.single('image'), photoCtrl.updateUserPhoto )
router.post("/uploadPhoto/", upload.single('image'), photoCtrl.uploadPhoto)

module.exports = router