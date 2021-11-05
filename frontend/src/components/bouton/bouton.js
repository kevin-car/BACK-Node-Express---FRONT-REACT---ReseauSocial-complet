import React from "react";

class Bouton extends React.Component {

    render(){
        const classBtn = ` btn btn-${this.props.couleur} text-white`
        return(
            <button  type={this.props.type} onClick={this.props.clic} className={classBtn} > {this.props.children} </button>
        )
    }
}

export default Bouton