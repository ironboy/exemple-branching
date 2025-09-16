import { useLoaderData } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';

interface Pet {
  id: number;
  name: string;
  species: string;
  ownerId: number | null;
}

PetList.route = {
  path: '/pet-list',
  menuLabel: 'Pet List',
  index: 2,
  loader: async () => await (await fetch('/api/pets')).json()
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
      {pets.map(({ id, name, species }) => <Col
        xs={12}
        md={6}
        lg={4}
        xxl={3}
        key={id}
        className="mb-3"
      >
        <Card>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {name} is a {species}.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>)}
    </Row>
  </>;
}
