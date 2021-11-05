import React from "react";
import Entete from "../components/entete/entete";
import PostMessages from "./postMessage/postMessage";
import axios from 'axios'
import { Link } from 'react-router-dom'
import Connexion from "./connexion/Connexion.js";
import classes from "./pageMessages.module.css"

import {Redirect } from 'react-router-dom'
import CadreUtilisateur from "./cadreUtilisateur/cadreUtilisateur";

class PageMessage extends React.Component {

    state = {

        //Affichage des messages
        ilLoaded : false,
        messagess : [],
        
        //Post
        imageSaisi : "",
        auteurSaisi : "",
        messageSaisi : "",
        createdAtSaisi : "",
        updatedAtSaisi : "",
        id : 0,

        // Gestion des images 
        selectedFile : null,

        // affichage d'une image dans le post 
        postImage : "",

        // Affichage d'une bannière de message
        banniere : "",

        // Pour raffrachir la page
        refresh : false,
        pseudoUtilisateur : ""
    }

    // Fonction de liaison avec la BDD
    componentDidMount = () => {
        // Appeler tous les messages dans la BDD 
        axios.get("http://localhost:8000/", {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        .then(reponse => {
            const messagess = reponse.data.data.map(message => {
                return{
                    id: message.id,
                    auteur: message.auteur,
                    photo: message.photo,
                    message: message.message,
                    createdAt: message.createdAt,
                    updatedAt: message.updatedAt,
                    created : message.created
                }
        })
        this.setState({messagess})
    })    
        .catch(error => {
            console.log(error)
        },1000)

        // Mettre à jour l'heure actuelle dans les states
        setInterval( () => {
            this.setState({
              createdAtSaisi : Date.now() - (7 * 24 * 60 * 60 * 1000),
              updatedAtSaisi : Date.now() - (7 * 24 * 60 * 60 * 1000),
              created : Date.now() - (7 * 24 * 60 * 60 * 1000)
            })

            axios.get("http://localhost:8000/", {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
            .then(reponse => {
                const messagess = reponse.data.data.map(message => {
                    return{
                        id: message.id,
                        auteur: message.auteur,
                        photo: message.photo,
                        message: message.message,
                        createdAt: message.createdAt,
                        updatedAt: message.updatedAt,
                        created : message.created,
                    }
            })
            this.setState({messagess})
        })
            .catch(error => {
                console.log("en attente de connexion pour chargement des données")
            },1000)
          },1000)
          // Demander le pseudonyme utilisateur grâce à l'id et le mettre dans les states
          if(localStorage.id > 0){
                const id = localStorage.id
                axios.get(`http://localhost:8000/getProfil/${id}`, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
                .then(reponse => {
                    console.log(reponse)
                    this.setState({auteurSaisi : reponse.data.user.pseudonyme})
                })
          } 
    }

    // Poster un nouveau message 
    postMessages = (imageUploaded, myFormRef) => {
        if(imageUploaded === ""){
            console.log("l'image envoyée ", imageUploaded)
            /* Je prépare mon nouveau message pour les states et la base de données */
            const newMessage = {
                message : this.state.messageSaisi,
                photo : '',
                auteur : localStorage.id,
                createdAt : this.state.createdAtSaisi,
                updatedAt : this.state.updatedAtSaisi,
                created : this.state.createdAtSaisi,
            }
            /* Envoi vers la base de donnée */
            
            axios.post('http://localhost:8000/createMessage/', newMessage, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")}})    
            // Rafrachissement de la page 
            this.setState({refresh : true})
                 } else { // S'il y a une image, j'importe l'image via une seconde route
                const ImageName = Date.now() + imageUploaded.name.split(" ").join("_")
                const fd = new FormData()
                fd.append('image', imageUploaded, ImageName)
                               
                axios.post("http://localhost:8000/uploadPhoto/", fd )
                    .then(res => { // J'utilise le retour de cette image 
                            const newMessage = {
                                message : this.state.messageSaisi,
                                photo : res.data.nom,
                                auteur : localStorage.id,
                                createdAt : this.state.createdAtSaisi,
                                updatedAt : this.state.updatedAtSaisi,
                                created : this.state.createdAtSaisi
                            }
                            /* Envoi vers la base de donnée */
                            axios.post('http://localhost:8000/createMessage/', newMessage, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} } ) 
                    })
                }
                axios.get("http://localhost:8000/", {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
                .then(reponse => {
                    const messagess = reponse.data.data.map(message => {
                        return{
                            id: message.id,
                            auteur: message.auteur,
                            photo: message.photo,
                            message: message.message,
                            createdAt: message.createdAt,
                            updatedAt: message.updatedAt,
                            created : message.created
                        }
                })
                this.setState({messagess})
                })    
                .catch(error => {
                    console.log(error)
                },1000)
                this.setState({refresh : true})
            }                           

    // Supprimer un message
    HandleDeleteMessage = (id) => {
        // Récupérer l'id 
        const messageIndex = this.state.messagess.findIndex(l => {
            return l.id === id
        })
        console.log(id)
        // 2 Suppression de la photo dans le serveur 
            axios.get(`http://localhost:8000/deletePhotoMessage/${id} `,{headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
            .catch(error => {
                console.log(error)
            })


        //Supprime dans la base de donnée
        const pathWithID = `http://localhost:8000/delete/${id}`
        console.log(pathWithID, "l'id supprimé :", id)
        axios.delete(pathWithID, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id") } }, {
             data: { id: id },
        });
        // J'informe l'utilisateur que le message est bien supprimé
        this.setState({banniere : 'Vous avez bien supprimé ce message'})
        setTimeout(() => {
            setTimeout(this.setState({banniere : ''}))
        }, 3000);

                // Supprime dans les states
                const newmessagess = [...this.state.messagess]      
                this.setState({messagess : newmessagess})
    }

    Connect = (data) => {
        axios.post("http://localhost:8000/User/login", data)
            .then(res => {           
                // Enregistrer l'id dans le local storage 
                localStorage.id = res.data.data
                localStorage.token = res.data.token
                localStorage.sexe = res.data.sexe
                this.setState({pseudoUtilisateur : res.data.pseudonyme})
                // Modifier le state pour afficher les postes 
                this.setState({display : true})
                console.log(res);
          })  
          .catch(res => {
            if(res.request.status === 401) {
                console.log("l'utilisateur n'existe pas")
                alert("Cet utilisateur n'existe pas")
            }
            if(res.request.status === 402) {
                console.log("le mot de passe est incorrect")
                alert("Votre mot de passe saisi est incorrect")
            }
            console.log(res.request.status)
          })
    }
    
    // Affichage des boutons Modifier Et Supprimer
    displayModifyAndDelete = (auteur, id) => {
        if( parseInt(localStorage.id) === auteur || parseInt(localStorage.id) === 1 ){
            return (
                <div className="btn-group col-1 h-25 " role="group" aria-label="Button group with nested dropdown">
                <button type="button" className="btn btn-dark">Actions</button>
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop4" type="button" className="btn btn-dark dropdown-toggle" value={id} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop4" >
                            <Link 
                                to={{
                                    pathname : "/ModifyMessage/"+(id),
                                    }} 
                                className="dropdown-item"
                                >
                                Modifier le message 
                            </Link> 
                       <button className="dropdown-item"  onClick={() => this.HandleDeleteMessage(id)} >Supprimer le message</button>                                             
                    </div>
                </div>
        </div>
            )
        }
    }

    render(){
        if(localStorage.id == null){ 
            return (    
                <Connexion 
                    Connect={(data) => this.Connect(data)}
                    banniere={this.state.banniere}
                />
            )
        }else {

        return(
            <>
                {/* Pour raffrachir la page */} 
                {this.state.refresh && <Redirect to='/' />}
                {<Redirect to='/accueil' />}

                <Entete 
                    clic={() => this.deconnect()}
                /> 
            {this.state.banniere !== "" 
            &&             
                <div className="alert alert-dismissible alert-warning">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <p className="mb-0">{this.state.banniere}</p>
                </div>
            }

                <form ref={(el) => this.myFormRef = el}>
                    <PostMessages 
                        envoi={(imageUploaded) => this.postMessages(imageUploaded)}
                        value={this.state.messageSaisi}
                        onChange={(event) => this.setState({messageSaisi:event.target.value})}
                        banniere={this.state.banniere}
                    />
                </form>        

                {/* Affichage de tous les messages postés du plus récent au plus vieux ! */} 

                {this.state.messagess.slice(0).reverse().map((message, index) => {
                    const lienImage = `http://localhost:8000/images/${message.photo}`
                    return(
                        <div className="container">
                            <div className="row pull-left">
                                <div className=" card border-info mb-3 w-75 col-10"  >
                                    <div className="card-header text-center">
                                        {"Message envoyé le : "+message.createdAt.replace(/T/g, "  à ").replace(/.000Z/g, " ")}
                                            <div>
                                        {message.createdAt !== message.updatedAt && "Message modifié le : "+message.updatedAt.replace(/T/g, "  à ").replace(/.000Z/g, " ")}
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="card-body row">
                                            {/* cadre utilisateur */}
                                            <div className=" col-sm-12 col-md-4 col-lg-3 col-xl-2 xxl-6">
                                                <CadreUtilisateur
                                                    id={message.auteur}
                                                    photo={message.photo}
                                                />  
                                            </div>
                                            {/* Message */}
                                            <div className="card text-white col-sm-12 col-md-8 col-lg-5 col-xl-6 xxl-6" >
                                                <img src={this.displayImage} alt="" />
                                                <p className="card-text">{message.message}</p>
                                            </div>
                                            {/* Photo du post  */}
                                            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 xxl-6">
                                                <img src={lienImage} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/* Bloc menu déroulant des Actions : Modifier et Supprimer */}
                                {this.displayModifyAndDelete(message.auteur, message.id)}

{/*                                 { parseInt(localStorage.id) === message.auteur  && 
                                    <div className="btn-group col-1 h-25 " role="group" aria-label="Button group with nested dropdown">
                                    <button type="button" className="btn btn-dark">Actions</button>
                                    <div className="btn-group" role="group">
                                        <button id="btnGroupDrop4" type="button" className="btn btn-dark dropdown-toggle" value={message.id} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop4" >
                                                <Link 
                                                    to={{
                                                        pathname : "/ModifyMessage/"+(message.id),
                                                        }} 
                                                    className="dropdown-item"
                                                    >
                                                    Modifier le message 
                                                </Link> 
                                           <button className="dropdown-item"  onClick={() => this.HandleDeleteMessage(message.id)} >Supprimer le message</button>                                             
                                        </div>
                                    </div>
                                </div>
                                } */}
                        </div>
                    </div> 
                    )
                })}
            </>
            )
        }    
    }
}



export default PageMessage
