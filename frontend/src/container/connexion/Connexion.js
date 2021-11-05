import React from "react";
import classes from "./connexion.module.css"
import { Link } from 'react-router-dom'
import {withFormik} from "formik"
import * as Yup from "yup"


class Connexion extends React.Component {
    
    state = {
        adresseMail : "",
        password : "",
        banniere : this.props.banniere
        }

    render(){
   
            return (
            <>
            {this.props.banniere != "" 
            &&             
                <div class="alert alert-dismissible alert-warning">
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    <h3 class="alert-heading">Warning!</h3>
                    <p class="mb-0">{this.props.banniere}</p>
                </div>
            }

            <form>
                {/* le logo */}
                <div className="container  col-lg-6 col-md-8 col-sm-10 col-xs-12">
                <div className="container text-center ">
                    <div className="row">
                        <div className=" container col-7">
                            <img src="http://localhost:8000/images/utils/icon-left-font-monochrome-white.png" alt="" />
                        </div>
                    </div>
                </div>

                    <div className=" mt-4 text-center text-success">
                        <h2> CONNEXION</h2>
                    </div>                    
                    <div className="form-group ">
                        <label>Adresse Email</label>
                        <input value={this.props.values.adresseMail} onBlur={this.props.handleBlur} name="adresseMail" onChange={this.props.handleChange} type="string" className="form-control" placeholder="Enter email" />
                        {this.props.touched.adresseMail && this.props.errors.adresseMail &&  <span style={{color:"red"}}> {this.props.errors.adresseMail} </span>}
                    </div>

                    <div className="form-group">
                        <label>Mot de Passe</label>
                        <input value={this.props.values.password} onBlur={this.props.handleBlur} name="password" onChange={this.props.handleChange}  type="password" className="form-control" placeholder="Enter password" />
                        {this.props.touched.password === true && this.props.errors.password &&  <span style={{color:"red"}}> {this.props.errors.password} </span>}

                    </div>

                    <div className="form-group ">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Enregistrer les identifiants </label>
                        </div>
                    </div>
                    <div className=" text-center">
                        <button className="btn btn-dark btn-lg btn-block " onClick={this.props.handleSubmit}>Connexion</button>
                    </div>  
                    <div className=" mt-4 text-center text-success">
                        <h2> PAS ENCORE INSCRIT - CLIQUEZ ICI</h2>
                    </div>

                    <div className=" text-center ">
                        <button type="submit" className="btn btn-dark btn-lg btn-block" >
                            <Link 
                                to={{
                                    pathname : "/Inscription"
                                    }} 
                                className="dropdown-item" 
                                >
                                Inscription
                            </Link> 
                        </button>
                    </div>
                </div>
            </form>
            </>
        )
    }
}
export default withFormik({

    mapPropsToValues : () => ({
        adresseMail : "",
        password : "",
    }),
    validationSchema : Yup.object().shape({
        adresseMail : Yup.string()
        .email("Ceci ne ressemble à une adresse email. Merci d'insérer votre adresse mail")
        .required("le champ adresse Mail est obligatoire pour se connecter"),
        password : Yup.string()
        .required("Le champ mot de passe est obligatoire pour se connecter")
    }),
    handleSubmit : (values, {props}) => {
        const data = {
            "adresseMail" : values.adresseMail,
            "password" : values.password
        }
        props.Connect((data))
    }
    
    })(Connexion)
