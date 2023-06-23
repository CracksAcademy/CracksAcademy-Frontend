import React from 'react'

export default function Logout ({handleSubmitLogout, ...props}) {

    return (
        <form onClick={handleSubmitLogout}>
            <div className='text-center'>
            <button id='form-logout-button' className='btn btn-warning'>
            Cerrar sesión
            </button>
            </div>
        </form>
    )

}