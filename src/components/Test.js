import React from 'react';
import { connect } from 'react-redux';

import firebase from './firebase';
import YourSnap from './YourSnap';
import ThereSnap from './ThereSnap';
import { getStoredSnaps } from '../actions';


class Test extends React.Component{
   

    componentDidMount() {
        
        let database = firebase.database();
        database.ref().on("value", snapshot => {
            const snapObj = snapshot.val();
            if (snapObj) {
              //Object.keys(snapObj).map(i => console.log(snapObj[i].snap)) //using Object.keys to map thru obj like array
              this.props.getStoredSnaps(snapObj);
            }
        })

    };
    ////This handles auto scroll to bottom of div where messages are update
    componentDidUpdate() {
        const messageDiv = this.refs.wrap;
        messageDiv.scrollTop = messageDiv.scrollHeight;
        console.log(this.props);
    }

    renderIndividualSnap(snap) {
      if (this.props.user) {
        if (this.props.snaps[snap].user === this.props.user.FirstNam) {
          return (
            <>
              <YourSnap 
                snapText={this.props.snaps[snap].snap}
                name = {this.props.snaps[snap].user}
                img = {this.props.snaps[snap].img}
              />
            </>               
          )
        }
        else {
            return (
              <>
                <ThereSnap 
                  snapText={this.props.snaps[snap].snap}
                  name = {this.props.snaps[snap].user}
                  img = {this.props.snaps[snap].img}
                
                />
              </>      
            )
        }
      }
  }

    renderSnaps() {
        if (!this.props.snaps) {
            return null
        }
        else {
            return (
                Object.keys(this.props.snaps).map(
                    snap => (this.props.snaps[snap].snap 
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
                <div className='jumbotron' ref='wrap' style={{height:"70vh", overflowY:'auto'}}>
                    {this.renderSnaps()}
                </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    user: state.currentUserId,
    snaps: state.snaps};
  }

export default connect(mapStateToProps, {getStoredSnaps})(Test);