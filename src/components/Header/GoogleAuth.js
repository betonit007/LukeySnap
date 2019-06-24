import React from 'react';
import "./bootstrap-social.css";
import Test from '../Test';



const styleButton = {
    margin: '5px 0 5px 0'
}

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null,
        googleUser: null
    };
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: process.env.REACT_APP_DEV_OAUTH_ID,
                scope: 'email'
            }).then(() => {
              this.auth = window.gapi.auth2.getAuthInstance();
              const profile = this.auth.currentUser.get().getBasicProfile();
              this.setState({ isSignedIn: this.auth.isSignedIn.get(), googleUser: this.auth.isSignedIn.get() ? profile.getGivenName() : null });
              this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
        
    }

    onAuthChange = () => {
        const profile = this.auth.currentUser.get().getBasicProfile();
        this.setState({ isSignedIn: this.auth.isSignedIn.get(), googleUser: this.auth.isSignedIn.get() ? profile.getGivenName() : null })
    }


    renderAuthButton() {
      if (this.state.isSignedIn === null) {
          return null;
      }else if (this.state.isSignedIn) {
          return(
              <button onClick={this.auth.signOut} style={styleButton} className="btn btn-block btn-social btn-google">
                  <span className="fab fa-google"/>
                  Sign Out
              </button>
            ) 
      }
      else {
          return(
              <button onClick={this.auth.signIn} style={styleButton} className="btn btn-block btn-social btn-google">
                  <span className="fab fa-google" />
                  Sign In
              </button>
          ) }
    }

    render() {
        return(
            <div>
                {this.renderAuthButton()}
                <Test 
                  signedIn = {this.state.isSignedIn}
                  googleUser = {this.state.googleUser}
                
                />
            </div>
        )
    }
}

export default GoogleAuth;