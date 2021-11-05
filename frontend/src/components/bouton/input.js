import React from "react";

class Input extends React.Component {

    render(){
        return(
            <input className="form-control" type="file" id="formFile" onChange={this.props.onChange} onClick={this.props.clic}></input>
        )
    }
}

export default Input