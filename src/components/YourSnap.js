import React from 'react';

const someStyle = {
  fontWeight:'bold'
}
 
const snapStyle = {
    marginLeft: '5px'
}


const YourSnap = (props) => {
    return (
        <div className='d-flex'>
          <div className="alert alert-primary" role="alert" style={{maxWidth:'75%'}}>
             <span style={someStyle}>{props.name}</span><div style={snapStyle}>{props.snapText}</div>
          </div>
        </div>
    )
}

export default YourSnap;