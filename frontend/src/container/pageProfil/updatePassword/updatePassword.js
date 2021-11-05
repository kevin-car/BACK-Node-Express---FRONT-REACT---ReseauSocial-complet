import React from "react";
import {withFormik} from "formik"
import axios from "axios";
import * as Yup from "yup"

class UpdatePassword extends React.Component {
    render(){
        return(
        <>
            <div className='container col-lg-6 col-md-10 p-4 col-sm-12 card border-success mb-3'>
                <fieldset>
                    <div className=" mt-4 text-center text-success">
                        <h2> MODIFIER SON MOT DE PASSE</h2>
                    </div>  

                    <div className='container'>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword" className="form-label mt-4">Taper votre ancien mot de passe</label>
                            <input onChange={this.props.handleChange} onBlur={this.props.handleBlur} id="password"  type="password" name="passwordConfirm1" type="text" placeholder="Entrer votre ancien mot de passe" className="form-control me-sm-2" id="passwordConfirm1" />
                        </div>
                    </div>
                    
                    <div className='container'>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword" className="form-label mt-4">Tapez votre nouveau mot de passe</label>
                            <input onChange={this.props.handleChange} onBlur={this.props.handleBlur} value={this.props.values.password} name="password"  type="password" className="form-control" id="password"  placeholder="Entrer un mot de passe"/>
                            {this.props.errors.password && this.props.touched.password && <span style={{color:"red"}}> {this.props.errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword2" className="form-label mt-4">Confirmez votre nouveau mot de passe</label>
                            <input onChange={this.props.handleChange} onBlur={this.props.handleBlur} value={this.props.values.password2}  name='password2' type="password" className="form-control" id="password2" placeholder="Confirmez le mot de passe"/>
                            { this.props.errors.password2 && this.props.touched.password && <span style={{color:"red"}}> {this.props.errors.password2}</span>}
                            <div className="mt-4">
                                <button className="mt-4" onClick={this.props.handleSubmit} type="button" className="btn btn-primary">VALIDER</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
        )
    }
}

export default withFormik({

    mapPropsToValues : () => ({
        password : "", 
        password2 : "",
        confirmPassword1: ""
    }),
    validationSchema : Yup.object().shape({
        password : Yup.string()
        .required("Pour modifier votre mot de passe, entrez votre nouveau mot de passe ici")
        .min(3, "Pas assez de caractères")
        .max(16, "Trop de caractères"),
        password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les 2 mots de passe ne correspondent pas')
        .required("Merci de confirmer votre nouveau mot de passe ici ! ")
    }),
    handleSubmit : (values, {props}) => {

        const id = localStorage.id
        const password = { oldPassword : values.passwordConfirm1, password : values.password}
        axios.post(`http://localhost:8000/updatePassword/${id}`, password, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })
            .then(res => {
                if(res.status === 200) {
                    alert("Votre mot de passe vient d'être modifié")
                    console.log(res)
                }
                if(res.status === 402) {
                    alert("Votre ancien mot de passe est incorrect")
                    console.log(res)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    })(UpdatePassword)