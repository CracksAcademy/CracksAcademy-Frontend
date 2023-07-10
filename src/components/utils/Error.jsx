import React from 'react'
import gifImage from '../../resources/perro.gif'
import '../../css/Error.css'

function Error() {
  return (
    <div className="error-container">
      <div className="text-center">
        <h1>La página que buscas no existe (de momento)</h1>
      </div>
      <img src={gifImage} alt="GIF" className="error-gif" />
    </div>
  );
}

export default Error
