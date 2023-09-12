
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
            api_url = "http://localhost:5000/api/user/sign-up?email=" + email + "&password=" + password
            fetch(api_url)
                .then(res => res.json())
                .then(res => setResponse(res))
                .catch(err => console.log(err))
        } else {
            console.log("signup does not meet requirements")
        }
    }

    useEffect(() => {
        if (Object.keys(response).length === 0) {
            // why no reponse when successfully sign up
            console.log("no response")
        } else {
            console.log(response)
            if (response["signed-up"] === false) {
                if (response["Error"] === "User Account Already Exists") {
                    console.log("user already has account")
                } else {
                    console.log("unknown error")
                }
                
            } else {
                // redirect to wherever
                console.log("signed up")
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
                        Sign Up
                    </Button>
                </Stack>
             </Form>
        </div>
    )
}