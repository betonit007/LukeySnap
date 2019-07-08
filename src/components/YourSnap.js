import React from 'react';

const someStyle = {
  fontWeight:'bold'
}
 
const snapStyle = {
    marginLeft: '5px'
}


const YourSnap = (props) => {
  console.log(props);
    return (
      <div className={props.id.signedOut ? 'd-flex justify-content-center' : props.id.UserId === props.fireId ? 'd-flex justify-content-end' : 'd-flex'}>
          <div className="alert alert-primary" role="alert" style={{maxWidth:'75%'}}>
            <span><img className='img-fluid img-thumbnail'style={{height:'45px', width:'45px'}} alt={props.name} src={props.img}></img></span>
             <span style={someStyle}>{props.name}- </span><span style={snapStyle}>{props.snapText}</span>
          </div>
        </div>
    )
}

export default YourSnap;