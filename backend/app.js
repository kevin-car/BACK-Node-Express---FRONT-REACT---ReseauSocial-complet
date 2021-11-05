const express = require('express');
const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')
const app = express();
const messagesRoutes = require('./routes/messagesRoutes')
const photosRoutes = require('./routes/photosRoutes')
const userRoutes = require('./routes/usersRoutes')

var cors = require('cors')

  /* CORS - règles de sécurité  */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}); 
     
app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

// Connexion à la base de données
const sequelize = new Sequelize(
    'groupomania',  
    'username',    
    'password',  
    {  
        host: "192.168.64.2", 
        dialect: "mysql", 
/*         dialectOptions: {
            timezone: 'Etc/GMT-2'
        },  */
        logging: false    
    }      
)      


// Se connecter à la base de données
sequelize.authenticate()   
    .then(_ => console.log('Connexion OK !'))  
    .catch(error => console.error(`Connection failed ${error} `)) 



/*  ---- FONCTION DE SYNCRONISATION ----   */ 
/* ATTENTION / cela efface tout les messages et remets le site en paramètre par défault / ATTENTION*/

/* sequelize.sync({force: true})
    .then(_ => console.log('la base de donnée a bien été remise à zéro et syncronisée')) */

    



    
// Permet l'affichage de toutes les images dans le fil d'actualité et page profil
app.use(express.static('public'));  
app.use('/images', express.static('images'));
  
app.use('/' , messagesRoutes)
app.use('/', photosRoutes)
app.use('/', userRoutes)


module.exports = app