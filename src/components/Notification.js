import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (

    <div class="alert alert-warning mt-4">
        {message}
    </div>


  )
}

export default Notification