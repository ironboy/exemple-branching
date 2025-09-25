import { useLoaderData } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

PetDetails.route = {
    path: '/pets/:id/:ownerId',
    loader: async ({ params }: { params: any }) => {
        let pet = await (await fetch(`/api/pets/${params.id}`)).json();
        let owner;
        if (params.ownerId !== 'null') {
            owner = await (await fetch(`/api/petOwners/${params.ownerId}`)).json();
        }
        return { pet, owner };
    }
}

export default function PetDetails() {
    const { pet, owner } = useLoaderData();
    const { id, name, species } = pet;
    const { id: ownerId, firstName, lastName, email } = owner || {};
    return <Row>
        <Col>
            <h2>Details about {name} (id: {id})</h2>
            <p>{name} is a {species}.</p>
            <hr />
            {!ownerId ? <p>{name} has no owner.</p> : <>
                <h3>Owner: {firstName} {lastName} (id: {ownerId}) </h3>
                <p><b>Email: </b>{email}</p>
            </>}
        </Col>
    </Row>;
}