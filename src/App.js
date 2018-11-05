import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies} from 'react-cookie';
import ChartComponent from './components/Chart';
import './App.css';

import {
  clientRegistration,
  requestToken,
  authorizeToken,
  accessToken,
  metersFetch,
  fieldsFetch,
  readingFetch,
  changeFieldValue,
  setoauthState
} from './actions';
import qs from 'qs';
const actions = {
  clientRegistration,
  requestToken,
  authorizeToken,
  accessToken,
  metersFetch,
  fieldsFetch,
  readingFetch,
  changeFieldValue,
  setoauthState
};

class App extends Component {
  componentDidMount() {
    const {cookies} = this.props;
    if (cookies.get('discovergy')) {
      this.props.setoauthState('login');
    } else {
      this.props.setoauthState('logout');
    }
  }

  async auth() {
    if (this.props.oauth.loggedIn) {
      await this.getMeters();
      await this.getReadings();
    } else {
      await this.oauth();
      await this.props.cookies.set('discovergy', {username: this.props.oauth.form.username, password: this.props.oauth.form.password, token: qs.stringify(this.props.oauth.oauthHeaders)})
    }
  }

  async oauth() {
    await this.props.clientRegistration();
    await this.props.requestToken(
      this.props.oauth.oauthHeaders,
      this.props.oauth.responseRegistration.secret,
    );
    await this.props.authorizeToken(
      this.props.oauth.responseRequestToken.oauth_token,
      this.props.oauth.form.username,
      this.props.oauth.form.password
    );
    await this.props.accessToken(
      this.props.oauth.oauthHeaders,
      this.props.oauth.responseRegistration.secret,
      this.props.oauth.responseRequestToken.oauth_token_secret,
    );
    await this.getMeters();
    await this.getReadings();
  }

  getMeters() {
    this.props.metersFetch(
      this.props.oauth.oauthHeaders,
      this.props.oauth.responseRegistration.secret,
      this.props.oauth.responseAccessToken.oauth_token_secret,
    );
  }

  getReadings() {
    this.props.readingFetch();
    // this.props.readingFetch(
    //   this.props.oauth.oauthHeaders,
    //   this.props.oauth.responseRegistration.secret,
    //   this.props.oauth.responseAccessToken.oauth_token_secret,
    //   this.props.meters.meters[0].meterId,
    // );
  }

  handleChange(event) {
    const {id, value} = event.target;
    this.props.changeFieldValue(id, value);
  }

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <header className="App-header"> Discovergy Demo Client </header>
          {this.props.oauth.loggedIn
            ? ''
            : (
                <div className="form">
                  <div className="form--group">
                    <label className="form--group--label" htmlFor="username">Username or Email</label>
                    <input
                      type="text"
                      className="form--group--input"
                      id="username"
                      onChange={this.handleChange.bind(this)}
                      value={this.props.oauth.form.username}  
                      />
                  </div>
                  <div className="form--group">
                    <label className="form--group--label" htmlFor="password">Password</label>
                    <input 
                      type="password"
                      className="form--group--input"
                      id="password"
                      onChange={this.handleChange.bind(this)}
                      value={this.props.oauth.form.password}
                      />
                  </div>
                </div>
            )
          }
          {!this.props.oauth.loggedIn 
            ? <button style={{height: '40px', width: '150px', marginTop: '20px', marginLeft: '20px'}} onClick={this.auth.bind(this)}>Login</button>
            : <p>You are logged in!</p>
          }
          <div className="App-chart">
           {this.props.meters.readings.length ?
             <ChartComponent chartData={this.props.meters.readings} />
            : '' }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ oauth, meters }, ownProps) {
  return {
    oauth,
    meters,
    cookies: ownProps.cookies,
  };
}

export default withCookies(connect(
  mapStateToProps,
  actions,
)(App));
