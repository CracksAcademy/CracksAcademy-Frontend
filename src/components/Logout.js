import React from 'react'
import PropTypes from 'prop-types'

export default function Logout ({handleSubmitLogout, ...props}) {

    return (
        <form onClick={handleSubmitLogout}>
            <div className='text-center'>
            <button id='form-logout-button' className='btn btn-warning'>
            Logout
            </button>
            </div>
        </form>
    )

}