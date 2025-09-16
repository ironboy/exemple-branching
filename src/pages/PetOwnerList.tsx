import type PetOwner from "../interfaces/PetOwner";
import type Pet from "../interfaces/Pet";
import { useLoaderData } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';

PetOwnerList.route = {
  path: '/pet-owners',
  menuLabel: 'Pet owners',
  index: 2,
  loader: async () => ({
    owners: await (await fetch('/api/petOwners?orderby=firstName')).json(),
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
        <h2 className="mb-4">Pet owners</h2>
      </Col>
    </Row>
    <Row>
      {owners.map(({ id, firstName, lastName, email, pets }) => <Col
        xs={12}
        key={id}
        className="mb-3"
      >
        <Card>
          <Card.Body>
            <Card.Title>{firstName} {lastName}</Card.Title>
            <p>
              {firstName} has the mail-address <b>{email}</b>.
            </p>
            {!pets?.length ?
              <>Owns no pets.</> :
              <>
                <p className="mb-1">Owns the following pet{pets.length > 1 ? 's' : ''}:</p>
                <ul className="mb-0">
                  {pets.map(({ id, name, species }) => <li key={id}>
                    {name} ({species})
                  </li>)}
                </ul>
              </>
            }
          </Card.Body>
        </Card>
      </Col>)}
    </Row>
  </>;
}
