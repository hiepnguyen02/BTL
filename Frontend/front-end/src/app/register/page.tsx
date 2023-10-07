'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {Button, Col, Form, Image} from "react-bootstrap";
import loginImage from '../../img/login/login.png'
import dictionary from '../../img/login/dictionary.png'
import {auto} from "@popperjs/core";
import {useState} from "react";
import {loginService} from "@/service/LoginService/loginService";
import {loginRepository} from "@/repository/loginRepository";
import {log} from "util";

export default function Register() {
    const [userLogin, setUserLogin] = useState<UserLogin | null>({email: null, password: null});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const handleLogin = async () => {

        try {
            await loginService(userLogin, setIsLoading, setError);
        } catch (error) {

        }
    }
    // const handleLogin = () => {
    //     console.log("djhdjdhj");
    // }
    return (
        <Container fluid={"lg"}>
            <Row className={"mt-5"}>
                <Col>

                    <img src={dictionary.src} className={"position-absolute"}
                         style={{maxWidth: "30%"}}/>
                </Col>

                <img src={loginImage.src} style={{maxWidth: "80%"}}/>


                <Form className={"mt-3"}>
                    <Form.Group className="mb-2" controlId="formBasicEmail">

                        <Form.Label className={"fw-bold h4"}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" style={{height: 50}}
                                      onChange={value => {
                                          setUserLogin({
                                              email: value.target.value,
                                              password: userLogin != null ? userLogin.password : null
                                          })
                                      }}/>

                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">

                        <Form.Label className={"fw-bold h4"}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" style={{height: 50}}
                                      onChange={value => {
                                          setUserLogin({
                                              email: value.target.value,
                                              password: userLogin != null ? userLogin.password : null
                                          })
                                      }}/>

                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">

                        <Form.Label className={"fw-bold h4"}>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" style={{height: 50}}
                                      onChange={value => {
                                          setUserLogin({
                                              email: value.target.value,
                                              password: userLogin != null ? userLogin.password : null
                                          })
                                      }}/>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="fw-bold h4">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" style={{height: 50}}
                                      onChange={value => {
                                          setUserLogin({
                                              password: value.target.value,
                                              email: userLogin != null ? userLogin.email : null
                                          })
                                      }}
                        />
                    </Form.Group>


                </Form>

            </Row>

            <Row md={2}>
                <Col md={6} className={"mt-3"}>
                    <Button variant="primary" type="submit" style={{borderRadius: 18, width: "100%"}}
                            disabled={isLoading} onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                </Col>
                <Col className={"mt-3"}>
                    <Button variant="outline-success" type="button" style={{borderRadius: 18, width: "100%"}}
                    >
                        Chưa có tài khoản? Hãy đăng ký!
                    </Button>
                </Col>
            </Row>


        </Container>
    )
}

