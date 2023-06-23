import React from 'react'
import PropTypes from 'prop-types'

export default function Logout ({handleSubmitLogout, ...props}) {

    return (
        <form onClick={handleSubmitLogout}>
            <button id='form-logout-button'>
            Logout
            </button>
        </form>
    )

}