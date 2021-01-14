import React , {Component} from 'react';


class Card extends Component{
    render(){
        return(
            <div className="card" onClick={this.props.onClick}>
                    <h6 className="number">{this.props.number}</h6>
                    <br></br>
                    <h6 className="suit">{this.props.suit}</h6>
            </div>
        );
    }

}

export default Card;