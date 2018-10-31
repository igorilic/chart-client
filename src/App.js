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
  accessToken
} from './actions';

const actions = {
  clientRegistration,
  requestToken,
  authorizeToken,
  accessToken
};

class App extends Component {

  async componentDidMount() {
    await this.props.clientRegistration();
    await this.props.requestToken(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret);
    await this.props.authorizeToken(this.props.oauth.responseRequestToken.oauth_token);
    await this.props.accessToken(this.props.oauth.oauthHeaders, this.props.oauth.responseRegistration.secret, this.props.oauth.responseRequestToken.oauth_token_secret);
  }

  render() {
    const {
      responseRegistration,
      isFetching
    } = this.props.oauth;
    return ( <
      div className = "App" >
      <
      div className = "App-container" >
      <
      header className = "App-header" > Discovergy Demo Client < /header> {
        isFetching
          ?
          < div > Loading... < /div> :
          < p > {
            responseRegistration.key
          } < /p>
      } <
      div className = "App-chart" >
      <
      LineComponent / >
      <
      /div> <
      /div> <
      /div>
    );
  }
}

function mapStateToProps({
  oauth
}) {
  return {
    oauth
  };
}

export default connect(mapStateToProps, actions)(App);