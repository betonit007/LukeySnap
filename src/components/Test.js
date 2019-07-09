import React from 'react';
import { connect } from 'react-redux';

import firebase from './firebase';
import YourSnap from './YourSnap';
import { getStoredSnaps } from '../actions';
import { getGifs } from '../actions';


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
        this.props.getGifs();
    }

    renderSnaps() {
        if (!this.props.snaps) {
            return null
        }
        else {
            return (
                Object.keys(this.props.snaps).map(
                    snap => (this.props.snaps[snap].snap 
                        ? <YourSnap 
                            key={snap}
                            snapText={this.props.snaps[snap].snap}
                            name = {this.props.snaps[snap].user}
                            img = {this.props.snaps[snap].img}
                            fireId = {this.props.snaps[snap].userId}
                            id = {this.props.user ? this.props.user: false}
                          /> : null))
            )}
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
  console.log(state);
  return {
    user: state.currentUserId,
    snaps: state.snaps};
  }

export default connect(mapStateToProps, {getStoredSnaps, getGifs})(Test);