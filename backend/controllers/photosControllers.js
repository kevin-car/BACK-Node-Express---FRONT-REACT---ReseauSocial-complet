const express = require('express');
const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')
const app = express();
const MessageModel = require('../models/message');
const UserModel = require('../models/user');
const auth = require ('../middleware/auth.js')
// Connexion à la base de données
const sequelize = new Sequelize( 'groupomania','username','password',  
    { host: "192.168.64.2", dialect: "mysql", logging: false }      
)      
// Syncronisation des models avec la base de données (et  création des tables)
const Message = MessageModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

// Supprime le champ photo d'un message grâce à son ID
exports.deletePhotoBDD = (req,res) => {
    // requête d'update d'un utilisateur
    Message.update(
        { photo: "" },
        {where: {id: req.params.id}}
    )
    .then(message => {
        res.status(200).json( 'Supression de la photo dans la base de donnée :  OK ')
    })
    .catch(error => {
        res.status(400).json(" L'effacement de l'image dans la BDD n'a pas été réalisé")
    })
}

exports.deletePhotoServeur = (req,res) => {
    // Récupérer le nom de l'ancienne photo
    Message.findOne({
        where: {
            id: req.params.id
            }
    })
    .then(user => {
        res.json(user)
        var fs = require('fs')
        const path = "./public/images/"
        const photo = user.dataValues.photo
        fs.unlinkSync(`./public/images/${photo}`)
    })
}

exports.updatePhotoBDD = (req,res) => {
    // Modifier la photo
    Message.update(
        { photo: req.file.filename },
        {where: {id: req.params.id}},
    )
    res.json({status:200, msg: 'photo modifiée', nom : req.file.filename})
}

exports.deleteUserPhotoServeur = (req,res) => {
    // Récupérer le nom de l'ancienne photo
    User.findOne({
        where: {
            id: req.params.id
          }
    })
    .then(user => {
        res.json(user)
        var fs = require('fs');
        const photo = user.dataValues.photoPresentation
        fs.unlinkSync(`./public/images/${photo}`);
    })
}

exports.deleteUserPhotoBDD = (req,res) => {
    // Modifier la photo
    User.update(
        {photoPresentation: "" },
        {where: {id: req.params.id}},
    )
    res.json({status:200, msg: 'photo supprimée'})
}

exports.updateUserPhoto = (req,res) => {
    // Modifier la photo
    User.update(
        {    photoPresentation: req.file.filename },
        {where: {id: req.params.id}},
    )
    res.json({status:200, msg: 'photo modifiée', nom : req.file.filename})
}

exports.uploadPhoto = (req,res) => {
    res.json({status:200, msg: 'photo enregistrée', nom : req.file.filename})
}