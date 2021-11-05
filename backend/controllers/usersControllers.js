const express = require('express');
const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')
const app = express();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

// Connexion à la base de données
const sequelize = new Sequelize( 'groupomania','username','password',  
    { host: "192.168.64.2", dialect: "mysql", logging: false }      
)      
// Syncronisation des models avec la base de données (et  création des tables)
const User = UserModel(sequelize, DataTypes)


exports.createUser = (req, res) => {
    (console.log(req.body))
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create(
            {
                adresseMail: req.body.adresseMail,
                password: hash,
                pseudonyme: req.body.pseudonyme,
                textPresentation: req.body.textPresentation,
                photoPresentation: req.body.photoPresentation,
                sexe: req.body.sexe,
                createdAt: Date.now() - (7 * 24 * 60 * 60 * 1000),
                updatedAt: Date.now() - (7 * 24 * 60 * 60 * 1000)
              }
        )
    .then(user => {
        let texte = 'Le nouvel utilisateur a bien été créé, veuillez vous connecter.'
        res.status(200).json({texte, data:user})
    })
    .catch(error =>{
        res.status(406).json({ error })
    }) 
})
.catch(error =>{
    res.status(407).json({ error })
}) 
}

exports.userConnect = (req, res) => {
    User.findOne({ 
        where:  {adresseMail : req.body.adresseMail} })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
              }
              bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                if (!valid) {
                    return res.status(402).json({ error: 'Mot de passe incorrect !' });
                }
                    const token = jwt.sign({userId: user.id}, 'RANDOM_TOKEN_SECRET', {expiresIn: '12h'})
                    const sexe = user.sexe
                    const pseudonyme = user.pseudonyme
                    const messageSucces = `l'utilisateur s'est connecté avec un grand succès`
                    return res.json({messageSucces, data: user.id, token, sexe, pseudonyme})
                })
            .catch(error => res.status(500).json({ error }))
          })
          .catch(error => res.status(502).json({ error }))
      }

exports.userGetById = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
        res.json({user})
    })
}

exports.userModify = (req,res) => {

        User.update(
            {
            pseudonyme: req.body.pseudonyme,
            updatedAt: Date.now() - (7 * 24 * 60 * 60 * 1000),
            textPresentation: req.body.textPresentation,
            adresseMail: req.body.adresseMail,
            sexe: req.body.sexe
            },
            {where: {id: req.params.id}}
        )
        .then(User => {
            res.json({status:200, msg: 'Utilisateur Modifié ', id : req.params.id, user : User})
        })
        .catch(error => {
            res.status(402)
        })
    }



exports.userUpdatePassword = (req,res) => {

    User.findByPk(req.params.id)
    .then((user) => {
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.oldPassword, user.password)
          .then(valid => {
            if (!valid) {
                return res.status(402).json(  {error: 'Mot de passe incorrect !' ,status: 402  });
            } else {
                User.update(
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        User.update(
                            { password: hash },
                            {where: {id: req.params.id}}    
                        )
                        console.log(hash)
                        res.json({status:200, msg: 'mot de passe modifié modifiée'})
                    }) 
                    .catch(error => {
                        console.log(error)
                    })
                )
            }
          
      })
      .catch(error => res.status(502).json({ error }))
    })
}

exports.deleteAccount = (req,res) => {

    // Je vérifie que le mot de passe est correct => Si le mot de passe est faux, je renvoie 402, 
    User.findByPk(req.body.id)
        .then((user) => {
            console.log(user)
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
              }
              bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                if (!valid) {
                    return res.status(402).json(  {error: 'Mot de passe incorrect !' ,status: 402  });
                } else {
                    User.findByPk(req.params.id).then(message => {
                        User.destroy({
                            where: {id: user.id} 
                        })
                        .then(_ => {
                            const user = 'Le user a été supprimé avec succès'
                            res.json({message, data: user})
                        })
                    })
                }              
                 })
            .catch(error => res.status(500).json({ error })) 
          })
          .catch(error => res.status(502).json({ error }))

}
