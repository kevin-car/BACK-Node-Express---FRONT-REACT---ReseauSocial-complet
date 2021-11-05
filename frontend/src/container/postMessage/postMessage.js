import React from "react";
import classes from "./postMessage.module.css"
import Input from "../../components/bouton/input";
import Bouton from "../../components/bouton/bouton";


class PostMessages extends React.Component {

    state = {
        fileSelected : "",
        fileSelectedName : "", 
    }  
  
    fileSelected = (event) => {
        // mettre l'image dans le state pour l'affichage de l'aperçu
       this.setState({fileSelected : URL.createObjectURL(event.target.files[0])})

       // mettre le nom de l'image dans le state pour le renvoyer au composant supérieur 
       const File = (event.target.files[0])
       this.setState({fileSelectedName : File})
    }

    handleDeletePhoto = () => {
        this.myFormRef.reset();
        this.setState({fileSelected : ""})
        this.setState({fileSelectedName : ""})
    }

    render(){
        const classBloc = `${classes.blocFormulaire} container w-100 `
        const imageUploaded = this.state.fileSelectedName
        return (
            <form className={classBloc}>
                <div className='row'>
                <label htmlFor="exampleTextarea" className="form-label mt-4">Ecrivez votre message et cliquez sur postez pour qu'il se rajoute aux posts du forum</label>
                    <div className="form-group col-8">
                        <textarea  
                        className="form-control" 
                        id="exampleTextarea" rows="3" 
                        value={this.props.value}
                        onChange={this.props.onChange}
                        maxLength='255'
                        />

                    </div>
                    <div className="form-group col-4">
                            <form ref={(el) => this.myFormRef = el}>
                                <Input type="file" className="form-control" id="formFile" onChange={event => this.fileSelected(event)}> Parcourir</Input>
                            </form>
                                <Bouton couleur="primary" type="button" clic={() => this.props.envoi(imageUploaded)}> Envoyer </Bouton>                   
                            <div className='row w-auto'>
                                <img className="w-auto" src={this.state.fileSelected}/>
                                {this.state.fileSelected && <i onClick={this.handleDeletePhoto} className="fas fa-times align-top"></i>}
                            </div>

                    </div>
                </div>
            </form>
        )
    }
}

export default PostMessages