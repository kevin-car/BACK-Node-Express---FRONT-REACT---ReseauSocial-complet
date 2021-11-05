import React from "react"
import axios from "axios"

class CadreUtilisateur extends React.Component {
    state = {
        userPhoto : "", 
        userName : "",
        sexe : ""

    }

    componentDidMount = () => {
        axios.get(`http://localhost:8000/getProfil/${this.props.id}`, {headers: {"x-access-token": localStorage.getItem("token"), "id": localStorage.getItem("id")} })// Modifier l'id avec la valeur des props
        .then (res => {
             this.setState({userPhoto : res.data.user.photoPresentation})
             this.setState({userName : res.data.user.pseudonyme})
             this.setState({sexe : res.data.user.sexe})
        })      
        .catch (error => {
            this.setState({userPhoto : ""})
            this.setState({userName : "Utilisateur Supprimé"})
            this.setState({sexe : ""})
        })
    }

    render(){
        return(
            <div className={this.state.sexe === "Homme" ? "cadreUser card border-info mb-3" : "cadreUser card border-danger mb-3"}>
                <p className={this.state.sexe === "Homme" ? "text-center text-info" : "text-center text-danger"}>{this.state.userName}</p>
                { this.state.userPhoto !== "" && <img className="imgPerso" alt={`photo de profil de ${this.state.userName}` }src={`http://localhost:8000/images/${this.state.userPhoto}`}  />}
                {localStorage.sexe === "Femme" && this.state.userPhoto === "" && <img src={'http://localhost:8000/images/utils/persoStandards/femme.jpg'} alt="Profil de Marge Simpson" />}
                {localStorage.sexe === "Homme" && this.state.userPhoto === "" && <img src={'http://localhost:8000/images/utils/persoStandards/homme.jpg'} alt="Profil de Homer Simpson" />}
            </div>
        )
    }
}

export default CadreUtilisateur