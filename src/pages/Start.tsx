import { Row, Col } from 'react-bootstrap';

Start.route = {
  path: '/',
  menuLabel: 'About',
  index: 1
}

export default function Start() {
  return <Row>
    <Col>
      <h2 className="mb-4">Petch Match: Admin System</h2>
      <p>Here we can register pets and pet owners, and assign pets to new owners.</p>
    </Col>
  </Row>
}