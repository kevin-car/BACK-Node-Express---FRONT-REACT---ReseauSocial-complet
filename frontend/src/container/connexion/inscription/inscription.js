import React from "react";
import axios from "axios"
import {withFormik} from "formik"
import * as Yup from "yup"
import Input from "../../../components/bouton/input";
import Bouton from "../../../components/bouton/bouton";
import { Link } from "react-router-dom";

class Inscription extends React.Component {

    state = {
        fileSelected : "",
        fileSelectedName : ""
    }  

    fileSelected = (event) => {
        // mettre l'image dans le state pour l'affichage de l'aperçu
       this.props.values.fileSelected = URL.createObjectURL(event.target.files[0])
       this.setState({fileSelected : URL.createObjectURL(event.target.files[0])})

       // mettre le nom de l'image dans le state pour le renvoyer au composant supérieur 
       const File = (event.target.files[0])
       this.props.values.fileSelectedName = {
        File
       } 
       this.setState({fileSelectedName : File})
    }

    handleDeletePhoto = () => {
        this.myFormRef.reset();
        this.setState({fileSelected : ""})
        this.setState({fileSelectedName : ""})
        this.props.values.fileSelected = ""
        this.props.values.fileSelectedName = ""
    }

    render(){
        return(
            <>
                            {/* le logo */}
                <div className="container-fluid text-center ">
                    <div className="row">
                        <div className=" container col-7">
                            <img src="http://localhost:8000/images/utils/icon-left-font-monochrome-white.png" alt="" />
                        </div>
                    </div>
                </div>

            <div className="container col-lg-6 col-md-10 col-sm-12">
                <form>
                    <fieldset>
                    <div className="text-center text-success ">
                        <h2> FORMULAIRE D'INSCRIPTION</h2>
                    </div>  
                        <div className="form-group ">
                            <label htmlFor="exampleInputEmail1" className="form-label mt-4">Adresse Email *</label>
                            <input onChange={this.props.handleChange} onBlur={this.props.handleBlur} value={this.props.values.adresseMail} name="adresseMail"  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@mail.com"/>
                            {this.props.touched.adresseMail && this.props.errors.adresseMail && <span style={{color:"red"}}> {this.props.errors.adresseMail}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="pseudonyme" className="form-label mt-4">Pseudonyme *</label>
                            <input onChange={this.props.handleChange} onBlur={this.props.handleBlur} value={this.props.values.pseudonyme} name="pseudonyme" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@mail.com"/>
                            { this.props.touched.pseudonyme && this.props.errors.pseudonyme && <span style={{color:"red"}}> {this.props.errors.pseudonyme}</span>}

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword" className="form-label mt-4">Mot de passe *</label>
                            <input onChange={this.props.handleChange} onBlur={this.props.handleBlur} value={this.props.values.password} name="password"  type="password" className="form-control" id="exampleInputPassword1" placeholder="azerTY%1230e"/>
                            {this.props.touched.password && this.props.errors.password && <span style={{color:"red"}}> {this.props.errors.password}</span>}

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword2" className="form-label mt-4">Confirmez votre mot de passe *</label>
                            <input onChange={this.props.handleChange} onBlur={this.props.handleBlur} value={this.props.values.password2} name="password2" type="password" className="form-control" id="exampleInputPassword1" placeholder="azerTY%1230e"/>
                            {this.props.touched.password2 && this.props.errors.password2 && <span style={{color:"red"}}> {this.props.errors.password2}</span>}

                        </div>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            <label  htmlFor="exampleTextarea" className="form-label mt-4" >Biographie </label>
                            <textarea onChange={this.props.handleChange} onBlur={this.props.handleBlur} value={this.props.values.textPresentation} name="textPresentation" className="form-control" id="exampleTextarea" rows="3" placeholder="Parlez nous un petit peu de vous"></textarea>
                        </div>
                        {/* Sous bloc photo de profil */}
                        <div className="form-group">
                            <label htmlFor="formFile" className="form-label mt-4">Photo de profil</label>
                            <form ref={(el) => this.myFormRef = el}>
                                <Input type="file" onChange={event => this.fileSelected(event)} name="photo" className="form-control" id="formFile" /> 
                            </form>
                            
                            {this.state.fileSelected && <img alt='photoMessage' src={this.state.fileSelected } /> }
                            {this.state.fileSelected && <i onClick={this.handleDeletePhoto} className="fas fa-times align-top"></i>}
                        </div>

                        <fieldset className="form-group">
                            <legend className="mt-4">Sexe *</legend>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input value="Homme" onChange={this.props.handleChange} type="radio" className="form-check-input" name="sexe" id="optionsRadios1" />
                                        Homme
                                </label>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input value='Femme'  onChange={this.props.handleChange} type="radio" className="form-check-input" name="sexe" id="optionsRadios2" />
                                        Femme
                                </label>
                            </div>
                            {this.props.touched.sexe && this.props.errors.sexe && <span style={{color:"red"}}> {this.props.errors.sexe}</span>}
                        </fieldset>
                        <div className='mt-3'>
                        <button type="submit" className="btn btn-primary " onClick={this.props.handleSubmit}>S'INSCRIRE</button>
                                <Link to="/accueil/"> 
                                    <Bouton className="color-white" couleur="secondary" type="button"  > 
                                        RETOUR
                                    </Bouton>
                                </Link>
                        </div>
 
                    </fieldset>
                </form>
            </div>
        </>
        )
    }
}

export default withFormik({
    mapPropsToValues : () => ({
        adresseMail : "",
        pseudonyme : "",
        password : "", 
        password2: "", 
        textPresentation : "", 
        photo : "", 
        sexe : ""
    }),
    validationSchema : Yup.object().shape({
        adresseMail : Yup.string()
        .email("ceci n'est pas un type d'email reconnu")
        .required("l'adresse mail est obligatoire"),
        pseudonyme : Yup.string()
        .min(3, "Pas assez de caractères")
        .max(16, "Trop de caractères")
        .required("le pseudonyme est obligatoire"),
        password : Yup.string()
        .min(3, "Pas assez de caractères")
        .max(16, "Trop de caractères")
        .required("le mot de passe est obligatoire"),
        password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les 2 mots de passe ne correspondent pas')
        .required("la confirmation du mot de passe est obligatoire"),
        textPresentation: Yup.string()
        .max(256, "votre description est trop grande"),
        sexe: Yup.string()
        .required("merci de renseigner votre sexe")
        })  
    ,
    handleSubmit:(values, {props}) => {
        if(!values.fileSelected){
            const newUser = {
                "adresseMail" : values.adresseMail,
                "pseudonyme" : values.pseudonyme,
                "password" : values.password,
                "textPresentation": values.textPresentation,
                "photoPresentation": values.photo,
                "sexe": values.sexe
            }   
            // Vérifier que l'adresse mail ne soit pas déjà présente dans notre BDD 
                    
            axios.post("http://localhost:8000/User/new", newUser)
            .then (res => {
                console.log(res.status)
                if(res.status === 200){
                    /* this.props.history.replace("/") */
                    alert('Votre compte a bien été créé') 

                    window.location.replace("http://localhost:3000/")    
                }
            })
            .catch(error => {
                if(error.request.status === 406) {

                alert("Cette adresse mail est déjà utilisée, merci d'en choisir une nouvelle")
                }
            })
        }
        if(values.fileSelected) {
                const ImageName = Date.now() + values.fileSelectedName.File.name.split(" ").join("_")
                console.log("ImageName" , ImageName)
                const fd = new FormData()
                fd.append('image', values.fileSelectedName.File, ImageName)
                console.log('fd', fd)
                
                axios.post("http://localhost:8000/uploadPhoto/", fd )
                .then(res => { // J'utilise le retour de cette image 
                    console.log("1er retour : ",res)
                    const nomImage = values.fileSelectedName.File.name
                    console.log(nomImage)

                    const newUser = {
                        "adresseMail" : values.adresseMail,
                        "pseudonyme" : values.pseudonyme,
                        "password" : values.password,
                        "textPresentation": values.textPresentation,
                        "photoPresentation": res.data.nom,
                        "sexe": values.sexe,
                    }                                                 
                    axios.post("http://localhost:8000/User/new", newUser)
                    .then (res => {
                        console.log(res.status)
                        if(res.status === 200){
                            /* this.props.history.replace("/") */
                            window.location.replace("http://localhost:3000/")            
                        }
                    })
                    .catch(resp => {
                        if(res.status === 406)
                        alert('Cet adresse Email est déjà utilisée')
                        console.log(resp.error)
                    })
                })
        }
    }

    
    })(Inscription)