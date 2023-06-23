import React from 'react'
import PropTypes from 'prop-types'

export default function LoginForm ({handleSubmit, ...props}) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={props.username}
              name="Username"
              placeholder="Username"
              onChange={props.handleUsernameChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={props.password}
              name="Password"
              placeholder="Password"
              onChange={props.handlePasswordChange}
            />
          </div>
          <button id="form-login-button" type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      );
    };

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,

}