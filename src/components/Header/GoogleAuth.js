import React from 'react';
import "./bootstrap-social.css";
import { connect } from 'react-redux';
import { getUserId } from '../../actions';

const styleButton = {
    margin: '5px 0 5px 0'
}

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: process.env.REACT_APP_DEV_OAUTH_ID,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                if (this.auth.isSignedIn.get()) {
                  this.auth.isSignedIn.listen(this.onAuthChange);
                  let profile = this.getUserObject();
                  this.props.getUserId(profile);
                }    
                else {
                    this.auth.isSignedIn.listen(this.onAuthChange);
                    this.props.getUserId({signedOut: true})
                }
            });
        });
    }

    onAuthChange = () => {
        if (this.auth.isSignedIn.get()) {
            let userInfo = this.getUserObject();
            this.props.getUserId(userInfo);
        }
        else {
            this.props.getUserId({signedOut: true});
        }
    }

    getUserObject() {
        let profile2 = this.auth.currentUser.get().getBasicProfile();
        let allUserInfo2 = {UserId: profile2.getId(),FirstNam: profile2.getGivenName(),LastName: profile2.getFamilyName(),Image: profile2.getImageUrl()} 
        return allUserInfo2
    }


    renderAuthButton() {
      if (this.props.currentUserId === null) {
          return null;
      }else if (this.props.currentUserId.UserId) {
          return(
              <button onClick={this.auth.signOut} style={styleButton} className="btn btn-block btn-social btn-google">
                  <span className="fab fa-google"/>
                  {`Welcome ${this.props.currentUserId.FirstNam}, Press to Sign Out!`}
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, {getUserId})(GoogleAuth);