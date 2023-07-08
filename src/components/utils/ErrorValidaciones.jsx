import { BsExclamationTriangleFill } from 'react-icons/bs';
import React from 'react';

export default function ErrorValidaciones({mensaje}) {
  return (
    <div className="error-message" style={{ color: 'orange'}}>
                <BsExclamationTriangleFill className="warning-icon" />
                {mensaje}
    </div>
  );
}
