import type Pet from "../interfaces/Pet";
import { useLoaderData } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';

PetList.route = {
  path: '/pets',
  menuLabel: 'Pets',
  index: 3,
  loader: async () => await (await fetch('/api/petsWithOwnerInfo?orderby=name')).json()
}

export default function PetList() {
  const pets = useLoaderData() as Pet[];
  return <>
    <Row>
      <Col>
        <h2>Pets</h2>
      </Col>
    </Row>
    <Row>
      {pets.map(({
        id,
        name,
        species,
        ownerId,
        ownerFirstName,
        ownerLastName
      }) => <Col
        xs={12}
        md={6}
        lg={4}
        key={id}
        className="mb-3"
      >
          <Card className="pet-card">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                {name} is a {species}.
              </Card.Text>
              <Card.Text>{name} {ownerId ?
                <>has the owner {ownerFirstName} {ownerLastName}.</> :
                <>has no owner.</>
              }</Card.Text>
            </Card.Body>
          </Card>
        </Col>)}
    </Row >
  </>;
}
