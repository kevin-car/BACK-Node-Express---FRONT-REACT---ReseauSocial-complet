const express = require('express');
const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')
const app = express();
const MessageModel = require('../models/message');
// Connexion à la base de données
const sequelize = new Sequelize( 'groupomania','username','password',  
    { host: "192.168.64.2", dialect: "mysql", logging: false })      
// Syncronisation des models avec la base de données (et  création des tables)
const Message = MessageModel(sequelize, DataTypes)



// Récupère tous les post pour la page principal notamment
exports.getAll = (req, res, next) => {
    Message.findAll()
    .then(messagess => {
        const letexte = "la liste est bien récupérée"
/*         console.log(letexte)
 */        res.status(200).json(
            ({data : messagess})
        );
    })
    .catch(error => res.status(400).json({ error }));
}

// Supression d'un message par son ID 
exports.deleteMessage = (req, res) => {
    const id = req.params.id;
        Message.findByPk(req.params.id).then(message => {
            Message.destroy({
                where: {id: message.id} 
            })
            .then(_ => {
                const message = 'Le message a été supprimé avec succès'
                res.json({message, data: message})
            })
        })
}

// Création d'un message, la photo n'est pas géré. Seul le nom de la photo est récupéré
exports.createMessage = (req, res) => {
    Message.create(req.body)
    .then(message => {
        let texte = 'message a bien été posté'
        res.json({texte, data:message})
        console.log(req.headers['x-access-token'])
    })
    .catch(error => console.log("ca na pas fonctionné", error))
}

exports.getById = (req, res) => {
    Message.findByPk(req.params.id)
        .then(message => {
        res.json({data:message})
        })
}

exports.modifyMessage = (req,res) => {
    // requête d'update d'un utilisateur
    Message.update(
        {
        auteur: req.body.auteur,
        updatedAt: Date.now() - (7 * 24 * 60 * 60 * 1000),
        message: req.body.message,
        },
        {where: {id: req.params.id}}
    )
    .then(message => {
        res.status(200).json( 'modification OK ')
    })
}