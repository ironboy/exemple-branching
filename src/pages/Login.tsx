import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

// TODO:
// * Tell the user if log in unsuccesful
// * If succesful go to start page / first allowed page
// * Adjust menu choices according to user role
// +
// * Read the login status on each hard page reload using GET /api/login
// * Show Logout if logged in and call DELETE /api/login when Logout is clicked

// Thomas finish example for those in class having trouble with it
// 26 september.

Login.route = {
    path: '/login',
    menuLabel: 'Login',
    index: 10
}

export default function Login() {

    const [loginCreds, setLoginCreds] = useState({
        email: '',
        password: ''
    });

    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string | number | null } =
            event.target as HTMLInputElement;
        setLoginCreds({ ...loginCreds, [name]: value });
    }

    async function send(event: React.FormEvent) {
        // prevent page reload (default browser behavior) on submit
        event.preventDefault();
        // send login credentials to correct rest route and look at the result
        const result = await (await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginCreds)
        })).json();
        console.log(result)
    }

    return <Row>
        <Col>
            <Form onSubmit={send}>
                <Form.Group>
                    <Form.Label className="d-block">
                        <p className="mb-1">Email</p>
                        <Form.Control
                            onChange={setProperty}
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                        />
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="d-block">
                        <p className="mb-1">Password</p>
                        <Form.Control
                            onChange={setProperty}
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            minLength={8}
                        />
                    </Form.Label>
                </Form.Group>
                <Button type="submit" className="mt-4 float-end">Login</Button>
            </Form>
        </Col>
    </Row>
}