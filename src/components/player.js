import React , {Component} from 'react';


class Player extends Component{
    
    render(){
        
        return(
            <div className="card">
                    <span className="number">{this.props.number}</span>
                    
                    <span className="suit">{this.props.suit}</span>
            </div>
        );
    }

}

export default Player;