import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

import { connect } from 'react-redux';
import firebase from '../components/firebase';

class SnapInput extends React.Component {
    
    renderInput({input, label, meta}) {  //Anytime that <Field> calls renderInput() it passes in formProps 
                                         //meta holds error message
        return(
            <div>
                <label>{label}</label>
                <input className='form-control' {...input}/>
                {meta.touched ? <div style={{color:'red'}}>{meta.error}</div> : <div></div>}
            </div>
        )
    }

    onSubmit(formValues, otherProps) {
        console.log(otherProps);
        let database = firebase.database();
        database.ref().push({
            snap: formValues.snapEntered,
            user: otherProps.FirstNam,
            img: otherProps.Image,
            userId: otherProps.UserId
        })
        this.props.reset('snapEntered'); //reduxForm method that empties input field after submission
    }

    render() {
        return (                         //Struggled with next line of code to get state props passed into reduxForm handleSubmit
            <form onSubmit={ this.props.handleSubmit((formValues)=>{this.onSubmit(formValues, this.props.userName);}) }> 
                <Field name="snapEntered" component={this.renderInput} label='Enter Snap'/>
                <button style={{marginTop:'5px'}} className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.snapEntered) {
      errors.snapEntered = 'You must enter a snap';
    }
    return errors;
}

const mapStateToProps = state => {
    return { userName: state.currentUserId};
}

const formWrapped = reduxForm({
    form: 'SnapInput',
    validate: validate
})(SnapInput);

export default connect(mapStateToProps)(formWrapped)


//BELOW IS PRIOR TO CONNECTING REDUX / CONNECT

// export default reduxForm({
//     form: 'SnapInput',
//     validate: validate
// })(SnapInput);