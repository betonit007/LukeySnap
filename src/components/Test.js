import React from 'react';
import firebase from './firebase';


class Test extends React.Component{
   
    state = {
        snapping: '',
        snaps: '',
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        })

        console.log(this.state.snaps);
    }

    componentDidMount() {
        let database = firebase.database();
        
        database.ref().on("value", snapshot => {
            const snapObj = snapshot.val();
            Object.keys(snapObj).map(i => console.log(snapObj[i].snap)) //using Object.keys to map thru obj like array
            this.setState({ snaps: snapObj });
            
           
        })
    };

    handleSubmit() {
        let database = firebase.database();
        database.ref().push({
            snap: this.state.snapping
        })
        console.log(this.state.snap);
        this.setState({ snapping: ''})
    }

    renderSnaps() {
        if (!this.state.snaps) {
            return null
        }
        else {
            return (
                Object.keys(this.state.snaps).map(
                    snap => (this.state.snaps[snap].snap 
                        ? <div>{this.state.snaps[snap].snap}</div> 
                        : null))
            )
        }
    }
    

    render() {
        return (
              <div className='container'>

                <div className='jumbotron'>
                    {this.renderSnaps()}
                </div>
              
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-lg">Text</span>
                    </div>
                    <input onChange={this.handleInputChange} type="text" className="form-control" name="snapping" value={this.state.snapping}/>
                </div>
                <button className="btn-primary btn" style={{marginTop:"5px"}} onClick={()=>this.handleSubmit()}>Submit</button>

              </div>

        )
    }
}

export default Test;