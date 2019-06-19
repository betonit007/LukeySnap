import React from 'react';
import firebase from './firebase';


class Test extends React.Component{
   
    state = {
        snapping: '',
        snaps: '',
        user: 'Tim'
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
            if (snapObj) {
              Object.keys(snapObj).map(i => console.log(snapObj[i].snap)) //using Object.keys to map thru obj like array
              this.setState({ snaps: snapObj });
            }
           
        })
    };
    ////This handles auto scroll to bottom of div where messages are update
    componentDidUpdate() {
        const messageDiv = this.refs.wrap;
        messageDiv.scrollTop = messageDiv.scrollHeight;
    }

    handleSubmit() {
        let database = firebase.database();
        database.ref().push({
            snap: this.state.snapping,
            user: this.state.user
        })
        console.log(this.state.snap);
        this.setState({ snapping: ''})
    }

    renderIndividualSnap(snap) {
      if (this.state.snaps[snap].user === this.state.user) {
        return (<div>tim testt</div>)
      }
      else {
          return <div>not</div>
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
                        ? <div>{this.renderIndividualSnap(snap)}</div> 
                        : null))
            )
        }
    }
    

    render() {
        return (
              <div className='container'>
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
              </div>

        )
    }
}

export default Test;