import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopupWindow from './PopupWindow';
import { toQuery, generateRandomString, generateHash, base64UrlEncode } from '../utils/utils';

class GitHubLogin extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectUri: PropTypes.string.isRequired,
    scope: PropTypes.string,
  }

  static defaultProps = {
    buttonText: 'Sign in with Spotify',
    scope: 'user-read-private',
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  }

  onBtnClick = async () => {
    const { clientId, scope, redirectUri } = this.props;
    const state = base64UrlEncode(generateRandomString(16));
    const verifier = base64UrlEncode(generateRandomString(45));
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      response_type: "code",
      code_challenge_method: "S256",
      code_challenge: base64UrlEncode(generateHash(verifier)),
      state
    });
    console.log(search);
    const popup = this.popup = PopupWindow.open(
      'spotify-authorization',
      `https://accounts.spotify.com/authorize?${search}`,
      { height: 1000, width: 600 }
    );

    this.onRequest();
    popup.then(
      data => this.onSuccess({data, state, verifier}),
      error => this.onFailure(error)
    );
  }

  onRequest = () => {
    this.props.onRequest();
  }

  onSuccess = (data) => {
    // if (!data.access_token) {
    //   return this.onFailure(new Error('\'access_token\' not found'));
    // }

    this.props.onSuccess(data);
  }

  onFailure = (error) => {
    this.props.onFailure(error);
  }

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return <button {...attrs}>{ children || buttonText }</button>;
  }
}

export default GitHubLogin;
