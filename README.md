Auteur : Kevin CARPENTIER  
Linkedin : https://www.linkedin.com/in/kevin-carpentier/  
GitHub : https://github.com/kevin-car/  

Projet 7 - Créez un réseau social d’entreprise

SCENARIO :    
Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.  
Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂  
Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.  
  
  
Pour visualiser ce projet, il faudra installer et lancer :  
	-  Le gestionnaire de base de donnée  
	-  le serveur backend  
	-  le serveur frontend

### 1/ GESTIONNAIRE DE BASE DE DONNEE 
#### //Installation
Télécharger et installer le logiciel XAMPP : https://www.apachefriends.org/fr/index.html
Laissez les paramètres par défault. 
#### //Lancement
	- Lancer le logiciel. 
	- Aller dans l'onglet 'général', cliquer sur 'start'
	- Aller dans l'onglet Services, cliquer sur 'Start All'
### 2/ INSTALLATION DU SERVEUR BACKEND 
#### //Installation
	- Ouvrir son terminal
	- Se placer sur le dossier backend 
	- taper la commande 'npm install' puis appuyer entrer 
#### //Lancement
	- Ouvrir son terminal
	- Se placer sur le dossier backend 
	- taper la commande 'npm start' puis appuyer entrer 
Vous devriez voir  ceci :  
Listening on port 8000  
Connexion OK !
	
### 3/ INSTALLATION DU SERVEUR FRONTEND 
#### //Installation
	- Ouvrir son terminal
	- Se placer sur le dossier frontend 
	- taper la commande 'npm install' puis appuyer entrer 
#### //Lancement
	- Ouvrir son terminal
	- Se placer sur le dossier frontend 
	- taper la commande 'npm start' puis appuyer entrer 
Une onglet de votre navigateur favoris doit s'ouvrir sur le port : 3000  
Si cela ne se produit pas : allez à cette adresse : http://localhost:3000/
  
Félicitation, vous êtes maintenant sur l'application WEB de Groupomania
  
  
# A FAIRE LORS DU PREMIER DEMARRAGE
## INITIALISER LA BASE DE DONNEE
Pour l'installation sur le serveur, il faudra initialiser la base de donnée. 
	- Entrer dans le dossier 'backend' puis le fichier app.js  
	- Décommentez les ligne 48 et 49  
	- Quand le message 'la base de donnée a bien été remise à zéro et syncronisée', recommentez ces mêmes lignes  
Vous pouvez voir ces instructions en vidéo juste ici :  
https://youtu.be/K3LDh5dTuwA

## CRÉER LE COMPTE SUPER UTILISTEUR
Le 1er utilisateur qui sera inscrit sera automatiquement le 'super utilisateur'. 
Il aura le droit de supprimer et modifier n'importe quel post.  
Tous les comptes utilisateurs peuvent être supprimés via la page profil, sauf le compte 'super utilisateur'.
	
