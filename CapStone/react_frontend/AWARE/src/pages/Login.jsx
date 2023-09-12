
// NEEDS CSS FORMATTING!!!


import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState({})

    function validate(email, password) {
        if (email.length > 0 && password.length > 0) {
            return true
        }
        return false
    }

    function submit() {
        if (validate(email, password)) {
            var api_url = "http://localhost:5000/api/user/login?email=" + email + "&password=" + password
            console.log("The url:", api_url)
            fetch(
                api_url,
                // {
                //     mode: 'no-cors',
                //     method: 'GET',
                //     headers: {
                //         "Access-Control-Allow-Origin": "*",
                //     }
                // }
                )
                .then(res => res.json())
                .then(res => setResponse(res))
                .catch(err => console.log(err))
        } else {
            console.log("login does not meet requirements")
        }
    }

    useEffect(() => {
        console.log(3)
        if (Object.keys(response).length === 0) {
            console.log("no response")
        } else {
            if (response.login === false) {
                // display "incorrect email or password"
                console.log("incorrect login")
            } else {
                // redirect to wherever
                console.log("logged in")
            }
        }
    }, [response])

    return (
        <div className="Login">
             <Form onSubmit={submit}>
                <Stack gap={3}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            size="lg"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            size="lg"
                            type="password"
                            value={password}
                            onChange={(p) => setPassword(p.target.value)}
                        />
                    </Form.Group>
                    <Button size="lg" type="submit">
                        Login
                    </Button>
                </Stack>
             </Form>
        </div>
    )
}