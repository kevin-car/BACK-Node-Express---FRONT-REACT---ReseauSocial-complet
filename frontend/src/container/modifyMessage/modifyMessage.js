import React from "react";
import Bouton from "../../components/bouton/bouton";
import classes from "./modifyMessage.module.css"
import Entete from "../../components/entete/entete";
import axios from "axios"
import { Link} from "react-router-dom"
import {withFormik} from "formik"




class ModifyMessage extends React.Component {
    state = {
        message : "",
        fileSelected : "",
        fileSelectedName : ""
    }

    // Alimentation du state avec la photo que l'on choisi
    fileSelected = (event) => {
        // mettre l'image dans le state pour l'affichage de l'aperçu
       this.setState({fileSelected : URL.createObjectURL(event.target.files[0])})

       // mettre le nom de l'image dans le state pour le renvoyer au composant supérieur 
       const File = (event.target.files[0])
       this.setState({fileSelectedName : File})
    }
    

/* Récupérer les éléments du message à modifier en fonction de son id */
    componentDidMount = () => {
        let ID = this.props.match.params.id
        // Appeler tous les messages dans la BDD 
        axios.get(`http://localhost:8000/byID/${ID}`, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        .then(reponse => {
            console.log(reponse)
            // J'ajoute toutes les données, l'ID récupéré du paramètre d'URL, le reste du serveur
            this.props.values.id = ID
            this.props.values.auteur = reponse.data.data.auteur
            this.props.values.photo = reponse.data.data.photo
            this.props.values.message = reponse.data.data.message
            this.props.values.createdAt = reponse.data.data.createdAt
            this.props.values.updatedAt = reponse.data.data.updatedAt
            // Je mets à jour mes states avec les données que j'ai récupérées du serveur
            const stateUpdated = {
                id : this.props.values.id,
                auteur : this.props.values.auteur,
                photo : this.props.values.photo,
                message : this.props.values.message,
                updatedAt : this.props.values.updatedAt
            } 
            this.setState(stateUpdated)
        })
        .catch(error => {
            console.log(error)
        })
    }

handleDeletePhoto = () => {
    // 1 Récupération de l'id placé en fin d'URL
// Supprimons l'éventuel dernier slash de l'URL
var urlcourante = document.location.href; 
urlcourante = urlcourante.replace(/\/$/, "");
// Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
const queue_url = urlcourante.substring(urlcourante.lastIndexOf( "/" )+1 )
console.log(' Queue URL : \n'+queue_url)

    // 2 Suppression de la photo dans le serveur 
    axios.get(`http://localhost:8000/deletePhotoMessage/${queue_url} `,{headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        .catch(error => {
            console.log(error)
        })
    axios.post(`http://localhost:8000/deleteMessageBDD/${queue_url}`,{headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        .catch(error => {
            console.log(error)
        })
    this.setState({photo : ""})
    this.setState({fileSelectedName : ""})
    this.myFormRef.reset();

}

    confirmerModification = () => {
        // Si la modification est sans Photo 
        if(this.state.fileSelected === "") {
            // préparation de notre envoi au serveur Node
            const messageModifie = {
                message : this.props.values.message,
                auteur : this.props.values.auteur,
            }
            let ID = this.props.match.params.id
            // Envoi de notre modification à Node
            axios.post(`http://localhost:8000/modifyMessage/${ID}`, messageModifie, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
                .then((reponse) => {
                    console.log('modification envoyée au serveur')
                })    
                .catch(error => {
                    console.log("front : il y a eu cette erreure", error)
                })
            
        } else {
            // Si la modification est l'ajout ou la modification d'une photo (en mopdifiant également le texte si nécéssaire)
            const id = this.props.values.id
            /* Suppression de l'ancienne photo dans le server */
            const path2 = "http://localhost:8000/deletePhotoMessage/"
            axios.get(path2+id, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
            .then(reponse => {
                console.log(reponse)
            })
            /* Téléchargement de na nouvelle photo */
        const ImageName = Date.now() + this.state.fileSelectedName.name.split(" ").join("_")
        const fd = new FormData()
        fd.append('image', this.state.fileSelectedName, ImageName)
        const path = "http://localhost:8000/updatePhotoMessage/"
        axios.post(path+id, fd, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        .then(res => {
            console.log(res)   
        })   
        const messageModifie = {
            message : this.props.values.message,
            auteur : this.props.values.auteur,
        }
        let ID = this.props.match.params.id
        // Envoi de notre modification à Node
        axios.post(`http://localhost:8000/modifyMessage/${ID}`, messageModifie, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
            .then((reponse) => {
                console.log('modification envoyée au serveur')
            })    
            .catch(error => {
                console.log("front : il y a eu cette erreure", error)
            })
        }
    }    

    render(){
        const classBloc = `${classes.modifyMessage} container w-100 `

        return (
                <>
                <Entete/>
                <form className={classBloc}>
                    <div className='row'>
                    <label htmlFor="exampleTextarea" className="form-label mt-4">Ecrivez votre message et cliquez sur postez pour qu'il se rajoute aux posts du forum</label>
                        <div className="form-group col-8">
                            <textarea 
                            name='message'
                            className="form-control" 
                            id="exampleTextarea" rows="3" 
                            onChange={this.props.handleChange}
                            value={this.props.values.message}
                            />
                        </div>
                        <div className="form-group col-4">

                            <Link  to="/accueil/"> 
                                <Bouton className="" couleur="primary" type="button" clic={() => this.confirmerModification()}> 
                                    MODIFIER 
                                </Bouton>
                            </Link>

                            <Link to="/accueil/">  
                                <Bouton className="color-white" couleur="secondary" type="button"  > 
                                    RETOUR
                                </Bouton>
                            </Link>
                        </div>
                        <div className="container">
                            <label htmlFor="exampleTextarea" className="form-label mt-4">Modifiez ou ajouter la photo</label>
                            <form ref={(el) => this.myFormRef = el}>
                                <input className="form-control" type="file" onChange={event => this.fileSelected(event)}/>
                            </form>
                                {this.state.photo && <img alt='photoMessage' src={`http://localhost:8000/images/${this.state.photo}` } /> }
                                {this.state.photo && <i onClick={this.handleDeletePhoto} className="fas fa-times align-top"></i>}
                                {this.state.fileSelected && <i class="fas fa-3x fa-long-arrow-alt-right"></i>}
                                {this.state.fileSelected && <img alt='photoMessage' src={this.state.fileSelected } /> }
                            </div>
                    </div>
                </form>
            </> 
        )
    }
}
export default withFormik({

    mapPropsToValues : () => ({
            id: "",
            auteur: "",
            photo: "",
            message: "",
            createdAt: "",
            updatedAt: "",
            created : ""
       }),
    validate : values => {
        // Contient les règles de validations
    },
    handleSubmit:(values, {props}) => {
        this.confirmerModification()
    }
    
    })(ModifyMessage)
