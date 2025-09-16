import type PetOwner from "../interfaces/PetOwner";
import type Pet from "../interfaces/Pet";
import { useLoaderData } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';

PetOwnerList.route = {
  path: '/pet-owners',
  menuLabel: 'Pet owners',
  index: 2,
  loader: async () => ({
    owners: await (await fetch('/api/petOwners')).json(),
    pets: await (await fetch('/api/pets')).json(),
  })
}

export default function PetOwnerList() {
  const { owners, pets }: {
    owners: PetOwner[]; pets: Pet[]
  } = useLoaderData();

  // 'join'/add pets to each owner
  for (let owner of owners) {
    owner.pets = pets.filter(({ ownerId }) => ownerId == owner.id)
  }

  return <>
    <Row>
      <Col>
        <h2>Pet owners</h2>
      </Col>
    </Row>
    <Row>
      {owners.map(({ id, firstName, lastName, email }) => <Col
        xs={12}
        md={6}
        lg={4}
        key={id}
        className="mb-3"
      >
        <Card>
          <Card.Body>
            <Card.Title>{firstName} {lastName}</Card.Title>
            <Card.Text>
              {firstName} has the mail-address <b>{email}</b>.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>)}
    </Row>
  </>;
}
