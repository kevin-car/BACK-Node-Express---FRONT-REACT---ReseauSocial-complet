import axios from "axios";
import React from "react";
import Entete from "../../components/entete/entete";
import {withFormik} from "formik"
import { boolean } from "yup/lib/locale";
import UpdatePassword from "./updatePassword/updatePassword";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Bouton from "../../components/bouton/bouton";

class PageProfil extends React.Component{

    state = {
        adresseMail :       "", 
        pseudonyme :        "", 
        textPresentation :  "",
        photoPresentation : "",
        photo :             "", 
        sexe :              "",

        // Partie 2 , changement de photo
        fileSelected :      "",
        fileSelectedName :  "",

        // Raffraichissement de la page 
        refresh : false, 
        redirection : false
    }

  
    fileSelected = (event) => {
        // mettre l'image dans le state pour l'affichage de l'aperçu
       this.setState({fileSelected : URL.createObjectURL(event.target.files[0])})

       // mettre le nom de l'image dans le state pour le renvoyer au composant supérieur 
       const File = (event.target.files[0])
       this.setState({fileSelectedName : File})
    }

    handleChangePhoto = () => {
        const id = localStorage.id
        // Si une image a été chargé, on peut validé le changement de photo
        if(this.state.fileSelectedName !== ""){
            /* Suppression de l'ancienne photo (s'il y en a bien une) */
            if(this.props.values.myphotoPresentation !== "") {
                const path2 = "http://localhost:8000/deletePhotoUser/"
                axios.get(path2+id, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
                .then(reponse => {
                    console.log(reponse)
                })
            }
            /* Téléchargement de na nouvelle photo */
            const ImageName = Date.now() + this.state.fileSelectedName.name.split(" ").join("_")
            const fd = new FormData()
            fd.append('image', this.state.fileSelectedName, ImageName)
            
            const path = "http://localhost:8000/updatePhotoUser/"

            axios.post(path+id, fd, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
            .then(res => {
                console.log(res)   
            })   
            alert('La photo a bien été modifiée')
            window.location.reload()
        }else{
            alert("Vous n'avez pas ajouté de photo")
        }
        }


    componentDidMount = () =>{
        // Envoyer l'id 
        const send = "http://localhost:8000/getProfil/"
        const iDtoSend = localStorage.id
        // Récupérer les data de l'utilisateur et les ajouter dans les states
        axios.get(send+iDtoSend, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        .then(reponse => {
            console.log(reponse)
            // Récupérer les données de l'utilisateur pour alimenter les props.values
            this.props.values.adresseMail =         reponse.data.user.adresseMail
            this.props.values.pseudonyme =          reponse.data.user.pseudonyme
            this.props.values.textPresentation =    reponse.data.user.textPresentation
            this.props.values.sexe =                reponse.data.user.sexe
            this.props.values.createdAt =           reponse.data.user.createdAt
            this.props.values.myphotoPresentation = reponse.data.user.photoPresentation
        // Alimenter les states pour les valeur par défault   
            const myuser = {
                adresseMail:                        this.props.values.adresseMail,
                pseudonyme:                         this.props.values.pseudonyme,
                textPresentation:                   this.props.values.textPresentation,
                photoPresentation:                  this.props.values.myphotoPresentation,
                sexe:                               reponse.data.user.sexe,
                createdAt:                          reponse.data.user.createdAt,
                updatedAt:                          Date.now() - (7 * 24 * 60 * 60 * 1000),
                created :                           reponse.data.user.created
                }            
            this.setState(myuser)
    })
    }

    handleDeletePhoto = () => {
        // 1 Récupération de l'id de l'utilisateur et de la photo
        const myId = localStorage.id

        // 2 Suppression de la photo dans le serveur 
        axios.get(`http://localhost:8000/deletePhotoUser/${myId}`, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        // 3 Supression du string inscrit dans le champ photoPresentaion de la BDD 
        axios.post(`http://localhost:8000/deletePhotoUser_BDD/${myId}`, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        alert('Votre photo a été supprimée')
        window.location.reload()
    }

    deleteAccount = () => {
        var confirmSuppression = window.confirm('Souhaitez vous vraiment supprimer votre compte ? Attention, cette action est irréversible')
        const myId = localStorage.id
         const userToDelete = {
             id : window.localStorage.id, 
             password : this.props.values.passwordConfirm1
         }
        if(localStorage.id == 1) {
             alert("Vous ne pouvez pas supprimer l'utilisateur admin")
         } else if (confirmSuppression) {
             axios.post(`http://localhost:8000/deleteUser/${myId}`, userToDelete , {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
                .then(retour => {
                    console.log(retour)
                    alert('votre compte est suppprimé ')
                    localStorage.clear()
                    this.setState({redirection : true})

                })
                .catch(error => {
                    if (error.request.status === 402){
                        alert('mot de passe incorect')
                    } else {
                        console.log(error)
                    }
                })
        }
    }

    render(){
        //Charger le sexe coché lors du clique 
        var hommeChecked = boolean
        var femmeChecked = boolean
            if(this.props.values.sexe === "Homme"){
                hommeChecked = "checked"
                femmeChecked = false
            }
            if(!this.props.values.sexe === "Femme"){
                hommeChecked = false
                femmeChecked = "checked"
            }

       /* récupérer (le chemin de) la photo du profil pour la balise image */
       const lienImage = `http://localhost:8000/images/${this.props.values.myphotoPresentation}`
        
       if(this.state.redirection){
           return(
            <div className="form-group col-4">
            <p>Vous n'êtes plus connecté, cliquez ici pour retourner vers l'accueil</p>
            <Link to="/accueil/">  
                <Bouton className="color-white" couleur="secondary" type="button"  > 
                    Retourner vers L'accueil
                </Bouton>
            </Link>
        </div>      
        )
       } else {
        return(
            <>
                <Entete/>
                <div className="container col-lg-6 col-md-10 col-sm-12 p-4 mt-4 card border-success mb-3">
                    <form>
                        <fieldset>
                            <div className=" mt-4 text-center text-success">
                                <h2> MODIFIER SES DONNEES DE PROFIL</h2>
                            </div>  
                            {/* Sous bloc adresse mail */}
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-4 col-form-label">EMAIL</label>
                                <div className="col-sm-8">
                                    <input defaultValue={this.props.values.adresseMail} name='adresseMail' type="text"  className="form-control-plaintext" id="staticEmail" />
                                </div>
                            </div>
                             {/* Sous bloc pseudonyme */}
                            <div className="form-group row">
                                <label htmlFor="pseudonyme" className="col-sm-4 col-form-label">PSEUDONYME</label>
                                <div className="col-sm-8">
                                    <input onChange={this.props.handleChange} value={this.props.values.pseudonyme} name="pseudonyme" type="text" className="form-control me-sm-2" id="pseudonyme" />
                                </div>
                            </div>
                            {/* Sous bloc Biographie */}
                            <div className="form-group">
                                <label htmlFor="exampleTextarea" className="form-label mt-4" defaultValue={this.state.textPresentation}>Décrivez vous en quelques mots</label>
                                <textarea onChange={this.props.handleChange} value={this.props.values.textPresentation} name='textPresentation' className="form-control" id="exampleTextarea" rows="3"></textarea>
                            </div>
                            {/* Sous bloc choix du sexe */}
                            <fieldset className="form-group">
                                <legend className="mt-4">SEXE</legend>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                        <input onChange={this.props.handleChange} type="radio" className="form-check-input" name="sexe" id="optionsRadios1" value="Homme" checked={hommeChecked}/>
                                            Homme
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                        <input onChange={this.props.handleChange} type="radio" className="form-check-input" name="sexe" id="optionsRadios2" value="Femme" checked={femmeChecked}/>
                                            Femme
                                        </label>
                                    </div>
                            </fieldset>
                            <div className="mt-4">
                                <button type="button" onClick={this.props.handleSubmit} className="btn btn-primary mt-4">Valider</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                {/* Bloc choix de la photo de profil */}
                <div className='container col-lg-6 col-md-10 col-sm-12 p-4 card border-success mb-3'>
                    <form >
                        <div className=" mt-4 text-center text-success">
                            <h2> MODIFIER SA PHOTO DE PROFIL</h2>
                        </div>  
                            {this.props.values.myphotoPresentation !== "" && <img alt={`photo de l'utilisateur ${this.props.values.pseudonyme}`} src={lienImage} /> } {/* photo actuelle */}
                            {this.props.values.myphotoPresentation !== "" && this.state.fileSelected === "" && <i onClick={this.handleDeletePhoto} className="fas fa-times align-top"></i>}
                            {this.state.fileSelected && <i className="fas fa-3x fa-long-arrow-alt-right"></i>}
                            {this.state.fileSelected &&<img alt={`photo de l'utilisateur ${this.props.values.pseudonyme}`} src={this.state.fileSelected}/> }
                        <fieldset>
                            <input onChange={event => this.fileSelected(event)} value={this.props.values.photoPresentation} name='photo' className="form-control" type="file" id="formFile"/>
                        </fieldset>
                        <div className="mt-4">
                            <button onClick={() => this.handleChangePhoto()}  type="button" className="btn btn-primary">Valider</button>
                        </div>
                    </form>
                </div>
                {/* Bloc qui réalise la mise à jour du mot de passe */}
                <UpdatePassword />
                {/* Bloc qui permet de supprimer définitivement son compte sur le forum */}
                <div className='container col-lg-6 col-md-10 col-sm-12 p-4 card border-success mb-3'>
                    <form >
                        <div className=" mt-4 text-center text-success">
                            <h2> SUPPRIMER SON COMPTE DEFINITIVEMENT</h2>
                        </div>  
                        <div className="mt-4 ">
                            <p className="text-success text-danger">Merci de taper votre mot de passe et confirmer votre choix</p>
                            <div className="mt-4 text-center ">
                                <input onChange={this.props.handleChange} name="passwordConfirm1" type="text" className="form-control me-sm-2" id="passwordConfirm1" />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <button onClick={this.deleteAccount}  type="button" className="btn btn-danger">Supprimer Mon compte</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
    }
}

export default withFormik({

    mapPropsToValues : () => ({
        adresseMail : "", 
        pseudonyme : "", 
        textPresentation : "",
        photo : "", 
        sexe : "", 
        password :'',
        passwordConfirm1 : ""
    }),
    validate : values => {
        // Contient les règles de validations
    },
    handleSubmit:(values, {props}) => {
        const send = "http://localhost:8000/modifyUser/"
        const iDtoSend = localStorage.id
        
        const datamodified = {
            pseudonyme : values.pseudonyme,
            adresseMail : values.adresseMail,
            textPresentation : values.textPresentation,
            sexe : values.sexe
        }
        axios.post(send+iDtoSend, datamodified, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
        // Modifier le sexe enregistré dans le localStorage 
        localStorage.sexe = values.sexe
        alert('Le profil a été mis à jour ')
    }
    
    })(PageProfil)