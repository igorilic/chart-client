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
  fieldsFetch,
  readingFetch,
} from './actions';

const actions = {
  clientRegistration,
  requestToken,
  authorizeToken,
  accessToken,
  metersFetch,
  fieldsFetch,
  readingFetch,
};

class App extends Component {

  async componentDidMount() {
    this.auth();   
  }

  async auth() {
    await this.props.clientRegistration();
    await this.props.requestToken(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret);
    await this.props.authorizeToken(this.props.oauth.responseRequestToken.oauth_token);
    await this.props.accessToken(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret, this.props.oauth.responseRequestToken.oauth_token_secret);
  }

  getMeters() {
    this.props.metersFetch(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret, this.props.oauth.responseAccessToken.oauth_token_secret);
  }

  getReadings() {
    // this.props.readingFetch(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret, this.props.oauth.responseAccessToken.oauth_token_secret, this.props.meters.meters[0].meterId)
    this.props.readingFetch('hsl(286, 70%, 50%)');
  }


  render() {
    return (
        <div className = "App">
          <div className = "App-container" >
            <header className = "App-header"> Discovergy Demo Client </header>
            <button onClick={this.getMeters.bind(this)}>Press me</button>
            {this.props.meters.meters.length
              ? <button onClick={this.getReadings.bind(this)}>Press me</button>
              : <p>Get meters first</p>
            }
            {this.props.meters.readings.length
              ? <div className = "App-chart">
                  <LineComponent readings={this.props.meters.readings[0]} />
                </div>
              : ''
            }
            
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