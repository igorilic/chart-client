import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    // await this.props.clientRegistration();
    // await this.props.requestToken(
    //   this.props.oauth.oauthHeaders,
    //   this.props.oauth.responseRegistration.secret,
    // );
    // await this.props.authorizeToken(this.props.oauth.responseRequestToken.oauth_token);
    // await this.props.accessToken(
    //   this.props.oauth.oauthHeaders,
    //   this.props.oauth.responseRegistration.secret,
    //   this.props.oauth.responseRequestToken.oauth_token_secret,
    // );
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

  render() {
    const { responseRegistration, isFetching } = this.props.oauth;
    return (
      <div className="App">
        <div className="App-container">
          <header className="App-header"> Discovergy Demo Client </header>
          {/* <button onClick={this.getMeters.bind(this)}>Press me</button> */}
          <div className="form">
            <div className="form--group">
              <label className="form--group--label" htmlFor="username">Username or Email</label>
              <input type="text" className="form--group--input" id="username" />
            </div>
            <div className="form--group">
              <label className="form--group--label" htmlFor="password">Password</label>
              <input type="password" className="form--group--input" id="password" />
            </div>
          </div>
          {/* {this.props.meters.meters.length ? ( */}
            <button style={{height: '40px', width: '150px', marginTop: '20px', marginLeft: '20px'}} onClick={this.getReadings.bind(this)}>Press for chart</button>
          {/* ) : ( */}
            {/* <p>Get meters first</p> */}
          {/* )} */}
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

function mapStateToProps({ oauth, meters }) {
  return {
    oauth,
    meters,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(App);
