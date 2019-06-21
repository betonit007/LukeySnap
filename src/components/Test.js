import React from 'react';
import firebase from './firebase';

import YourSnap from './YourSnap';
import ThereSnap from './ThereSnap';


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

    }

    componentDidMount() {
        
        let database = firebase.database();
        
        database.ref().on("value", snapshot => {
            const snapObj = snapshot.val();
            if (snapObj) {
              //Object.keys(snapObj).map(i => console.log(snapObj[i].snap)) //using Object.keys to map thru obj like array
              this.setState({ snaps: snapObj });
            }
        })
        console.log(this.state);
    };
    ////This handles auto scroll to bottom of div where messages are update
    componentDidUpdate() {
        const messageDiv = this.refs.wrap;
        messageDiv.scrollTop = messageDiv.scrollHeight;
        console.log(this.props);
    }

    handleSubmit() {
        let database = firebase.database();
        database.ref().push({
            snap: this.state.snapping,
            user: this.props.googleUser
        })
        console.log(this.state.snap);
        this.setState({ snapping: ''})
    }

    renderIndividualSnap(snap) {
      if (this.state.snaps[snap].user === this.props.googleUser) {
          console.log(snap);
        return (
          <>
            <YourSnap 
              snapText={this.state.snaps[snap].snap}
              name = {this.state.snaps[snap].user}
            />
          </>               
        )
      }
      else {
          return (
            <>
              <ThereSnap 
                snapText={this.state.snaps[snap].snap}
                name = {this.state.snaps[snap].user}
              
              />
            </>      
          )
      }
    }

    renderSnaps() {
        if (!this.state.snaps) {
            return null
        }
        else {
            console.log(this.state.snaps);
            return (
                Object.keys(this.state.snaps).map(
                    snap => (this.state.snaps[snap].snap 
                        ? <div key={snap}>{this.renderIndividualSnap(snap)}</div>
                        : null))
            )
        }
    }
    //deletworks just need to passId
    deleteSnap() {
        let database = firebase.database();
        database.ref().child("-LhpRlRthxfBBM6SEKsz").remove();
    }
    

    render() {
        return (
              
              <>
                <div className='jumbotron' ref='wrap' style={{height:"70vh", overflowY:'auto'}}>
                    {this.renderSnaps()}
                </div>
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-lg">Text</span>
                    </div>
                    <input onChange={this.handleInputChange} type="text" className="form-control" name="snapping" value={this.state.snapping}/>
                </div>
                <button className="btn-primary btn" style={{marginTop:"5px"}} onClick={()=>this.handleSubmit()}>Submit</button>
              </>

        )
    }
}

export default Test;