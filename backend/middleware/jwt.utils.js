// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'sdnkjsdfsdf02465dfsdflkSQDKLNF23KSDJFNSDKfdgdfgFSOKJSDHFGKJfdgDHGDKJF3200656230065652302623';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
      // Inscrire ici les informations que je souhaite inclure dans le TOKEN
    return jwt.sign({
      userId: userData.id,
    },
    JWT_SIGN_SECRET,
    { // Date d'expiration, l'utilisateur devra se reconnecter toutes les 24h
      expiresIn: '1h'
    })
  }
}