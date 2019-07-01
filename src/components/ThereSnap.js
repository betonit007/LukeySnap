import React from 'react';

const someStyle = {
  fontWeight:'bold'
}
 
const snapStyle = {
    marginRight: '5px'
}


const ThereSnap = (props) => {
    return (
        <div className='d-flex justify-content-end'>
          <div className="alert alert-success" role="alert" style={{maxWidth:'75%'}}>
            <span><img className='img-fluid img-thumbnail'style={{height:'45px', width:'45px'}} alt={props.name} src={props.img}></img></span>
          <span style={snapStyle}>{props.snapText}</span><span style={someStyle}> - {props.name}</span>
          </div>
        </div>
    )
}

export default ThereSnap;