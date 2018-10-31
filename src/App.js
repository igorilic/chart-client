import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import LineComponent from './components/Line';
import './App.css';

import {
  clientRegistration,
  requestToken,
  authorizeToken,
  accessToken,
  metersFetch,
} from './actions';

const actions = {
  clientRegistration,
  requestToken,
  authorizeToken,
  accessToken,
  metersFetch,
};

class App extends Component {

  async componentDidMount() {
    await this.props.clientRegistration();
    await this.props.requestToken(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret);
    await this.props.authorizeToken(this.props.oauth.responseRequestToken.oauth_token);
    await this.props.accessToken(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret, this.props.oauth.responseRequestToken.oauth_token_secret);
  }

  getMeters() {
    this.props.metersFetch(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret, this.props.oauth.responseAccessToken.oauth_token_secret)
  }

  render() {
    const {
      responseRegistration,
      isFetching
    } = this.props.oauth;
    return (
        <div className = "App">
          <div className = "App-container" >
            <header className = "App-header"> Discovergy Demo Client </header>
            <button onClick={this.getMeters.bind(this)}>Press me</button>
            {isFetching 
              ? <div>Loading...</div>
              : <p> {responseRegistration.key}</p>
            }
            <div className = "App-chart">
              <LineComponent />
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps({
  oauth,
  meters
}) {
  return {
    oauth,
    meters
  };
}

export default connect(mapStateToProps, actions)(App);