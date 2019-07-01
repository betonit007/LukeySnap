import React from 'react';
import GoogleAuth from './Header/GoogleAuth';
import Test from './Test';
import SnapInput from './SnapInput'

const App = () => {
    return(
        <div className='container'>
            <GoogleAuth/>
            <Test />
            <SnapInput />
        </div>
    )
}

export default App;