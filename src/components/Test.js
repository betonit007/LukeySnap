import React from 'react';
import firebase from './firebase';


class Test extends React.Component{
   
    state = {
        speed: 10
    }

    componentDidMount() {
        var database = firebase.database();
        
        database.ref().on("value", snap => {
            
            this.setState({ speed: snap.val().age });
           
        })
    };
    

    render() {
        return (
            <div>
                {this.state.speed}
            </div>

        )
    }
}

export default Test;