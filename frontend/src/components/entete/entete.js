import React from "react"
import {Link} from 'react-router-dom'

class Entete extends React.Component {


    deconnect = () => {
        // Vider le local storage 
        localStorage.clear()
        alert("Vous êtes déconnecté")
    }

    render(){


        return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="http://localhost:3000/Accueil/">Groupomania</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to='/Accueil/' className="nav-link" href="www.google.fr">Forum
                                <span className="visually-hidden">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/PageProfil/' className="nav-link" href="#">Profil</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/Accueil/' className="nav-link" href="www.google.fr" onClick={() => this.deconnect()}>Deconnexion</Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>




            )
    }
}
export default Entete