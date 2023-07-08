import React from 'react'
import PropTypes from 'prop-types'
import logo from '../../resources/logo.png';

export default function LoginForm ({handleSubmit, ...props}) {
      return (
        <>
        <div className="row justify-content-center">
        <div className="col-sm-6 col-md-4">

        <div className="pt-5" style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '130px', height: '130px' }} />
      </div>
        <h1 className="text-center pt-4 pb-4">Inicio de sesión</h1>
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
            Iniciar sesión
          </button>
        </form>
        </div>
        </div>
        </>
      );
    };

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,

}
