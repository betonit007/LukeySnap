import React from 'react';

const someStyle = {
  fontWeight:'bold'
}
 
const snapStyle = {
    marginLeft: '5px'
}


const YourSnap = (props) => {
    return (
      <div className={!props.id ? 'd-flex' : props.id.UserId === props.fireId ? 'd-flex justify-content-end' : ''}>
          <div className="alert alert-primary" role="alert" style={{maxWidth:'75%'}}>
            <span><img className='img-fluid img-thumbnail'style={{height:'45px', width:'45px'}} alt={props.name} src={props.img}></img></span>
             <span style={someStyle}>{props.name}- </span><span style={snapStyle}>{props.snapText}</span>
          </div>
        </div>
    )
}

export default YourSnap;