import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default function BasicCard({ object, profile = false }) {
  const cardStyles = {
    marginBottom: '20px',
  };

  const cardBodyStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const cardImageStyles = {
    width: '120px',
    height: '120px',
    marginRight: '10px',
  };

  const cardTextStyles = {
    flex: '1',
  };

  const [rol, setRol] = React.useState(object.rolUser);

  useEffect(() => {
    if (object.rolUser === 'COACH') {
      setRol("PROFESOR")
    } else if (object.rolUser === 'STUDENT') {
      setRol("ALUMNO")
    } else if (object.rolUser === 'ADMIN') {
      setRol("ADMINISTRADOR")
    }
  }, [object.rolUser])


  return (
    <Card style={cardStyles}>
      <Card.Body style={cardBodyStyles}>
        <div>
          <Card.Img variant="top" src={object.avatar} style={cardImageStyles} />
        </div>
        <div className="text-center" style={cardTextStyles}>
          <Card.Title>{object.username}</Card.Title>
          <Card.Text>
            {object.name} {object.lastName}<br />
            {object.email}<br />
            <b>{rol}</b>
          </Card.Text>
          {!profile && (
            <Link to={`/users/${object.id}`}>
              <Button variant="primary">Ver</Button>
            </Link>
          )}
          {profile && (
            <Link to={`/users/${object.id}/edit`}>
              <Button variant="primary">Editar</Button>
            </Link>
          )}

        </div>
      </Card.Body>
    </Card>
  );
}