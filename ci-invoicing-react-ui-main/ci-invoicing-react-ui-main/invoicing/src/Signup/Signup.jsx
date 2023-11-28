import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import { Form } from "react-bootstrap"

export const Signup = () => {
    const [name, setname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        console.log("my chala")
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/signup/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"name":name,"email": username, "password": password}),
            });
            const data = await response.json();
            console.log(data)
            if (!data.message) {
                alert("Login Failed")
            }
            else{
                alert(data.message)
            }
        } catch (error){
            console.error('Error logging in', error)
        }
    }

    return(
        <div>
                    {/* 1 row is divided in 12 columns. */}
                    <div>
                        <div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33.6" height="33.6" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z" />
                                </svg>
                            </div>
                            <div ><h3>Sign up</h3></div>

                        </div>
                        <hr></hr>
                        <Form noValidate className="loginform" onSubmit={handleSignup}>
                            <Form.Group className="mb-3" controlId="validationCustomUsername">
                                <Form.Label>
                                    Name
                                </Form.Label>
                                <Form.Control
                                    value={name}
                                    type="name"
                                    name="name"
                                    className={`form-control`}
                                    placeholder="Name"
                                    onChange={(e)=>setname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustomUsername">
                                <Form.Label>
                                    Email address
                                </Form.Label>
                                <Form.Control
                                    value={username}
                                    type="email"
                                    name="email"
                                    className={`form-control`}
                                    placeholder="Your email"
                                    onChange={(e)=>setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustomPassword">
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    value={password}
                                    type="password"
                                    name="password"
                                    className={`form-control`}
                                    placeholder="Your password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                           
                            <button type="submit" >Signup</button>
                        </Form>
                    </div>

                </div>
    )
}