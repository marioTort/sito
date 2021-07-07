import { Button } from 'bootstrap';
import React, {useState} from 'react';
import { Form } from 'react-bootstrap';

import api from '../../../services/api';

import { login, setIdUtente, setNomeUtente, setCognomeUtente } from '../../../services/auth';

export default function SignIn() {
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    async function handleSubmit() {
        await api.post('/api/login', { email, password })
            //SE IL TIPO IMPIEGATO === NULL -> ABBIAMO UN CLIENTE -> MOSTRA SCHERMATA CLIENTE
            //ALTRIMENTI MOSTRA SCHERMATA IMPIEGATI 
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1) {
                        //SUCCESS
                        login(res.data.token);
                        setIdUtente(res.data.id_client);
                        setNomeUtente(res.data.user_name);
                        setCognomeUtente(res.data.user_surname);

                        window.location.href = '/admin';
                    } else if (res.data.status === 2) {
                        alert('Attenzione! ' + res.data.error);
                    }
                } else {
                    alert('Errore del server');
                }
            })
    }
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}



