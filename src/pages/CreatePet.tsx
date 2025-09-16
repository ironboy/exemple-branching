import type PetOwner from "../interfaces/PetOwner";
import { useState } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from 'react-bootstrap';

CreatePet.route = {
  path: '/create-pet',
  menuLabel: 'Create pet',
  index: 4,
  loader: async () => await (await fetch('/api/petOwners?orderby=firstName')).json()
}

export default function CreatePet() {

  const owners = useLoaderData() as PetOwner[];

  const [pet, setPet] = useState({
    name: '',
    species: '',
    ownerId: null
  });

  const navigate = useNavigate();

  // handle changes to all input elements in the form
  // and update our pet state (an object)
  function setProperty(event: React.ChangeEvent) {
    let { name, value }: { name: string, value: string | number | null } =
      event.target as HTMLInputElement;
    // data conversion of ownerId "null" -> null, "3" -> 3 (string to number)
    if (name === 'ownerId') {
      value = isNaN(+value) ? null : +value;
    }
    // note: in order to update a state consisting of 
    // of an abstract type (object, array etc)
    // you need to provide a new instance
    // (but you can copy values from the old instance)
    setPet({ ...pet, [name]: value });
  }

  async function sendForm(event: React.FormEvent) {
    // prevent hard page reload
    event.preventDefault();
    // the backend does not like explicit null values
    // for now fix be removing them from the payload
    const payload: any = { ...pet };
    if (payload.ownerId === null) {
      delete payload.ownerId;
    }
    // send data about the new pet to rest-api
    // for fetch options see:
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    await fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    // navigate to
    navigate('/pets');
  }

  return <Row>
    <Col>
      <h2 className="mb-4">Add a new pet</h2>
      <Form onSubmit={sendForm}>
        <Form.Group>
          <Form.Label className="d-block">
            <p>Pet name</p>
            <Form.Control
              onChange={setProperty}
              type="text"
              name="name"
              placeholder="Pet name"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label className="d-block">
            <p className="mb-1">Species</p>
            <Form.Control
              onChange={setProperty}
              type="text"
              name="species"
              placeholder="Species"
              autoComplete="off"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mt-4">
          <Form.Label>
            <p className="mb-1">Owner</p>
            <Form.Select name="ownerId" onChange={setProperty}>
              <option value="null">No owner</option>
              {owners.map(({ id, firstName, lastName, email }) => <option
                key={id}
                value={id}
              >
                {firstName} {lastName} ({email})
              </option>)}
            </Form.Select>
          </Form.Label>
        </Form.Group>
        <Button type="submit" className="mt-4 float-end">Add pet</Button>
      </Form>
    </Col>
  </Row>
}