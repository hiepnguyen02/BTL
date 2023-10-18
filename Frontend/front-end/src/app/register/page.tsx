'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {Button, Col, Form, Image, Alert} from "react-bootstrap";
import loginImage from '../../img/login/login.png'
import dictionary from '../../img/login/dictionary.png'
import {auto} from "@popperjs/core";
import {useState} from "react";
import {loginService} from "@/service/AuthenticationService/loginService";
import {loginRepository} from "@/repository/AuthenticationRepository/loginRepository";
import {log} from "util";
import {registerService} from "@/service/AuthenticationService/registerService";
import {set} from "zod";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function Register() {
    const [userRegister, setUserRegister] = useState<UserRegister | null>({
        firstName: null,
        lastName: null, password: null, email: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const router = useRouter();
    const handleRegister = async () => {

        try {
            await registerService(userRegister, setIsLoading, setError);
            setShowAlert(true);
        } catch (error) {

        }
    }
    // const handleLogin = () => {
    //     console.log("djhdjdhj");
    // }
    return (

        <Container fluid={"lg"}>

            {
                showAlert ?
                    <Row md={2} className={" justify-content-center align-items-center"}
                         style={{height: "100vh"}}
                    >

                        <Row xs={1} className={" justify-content-center align-items-center"}>
                            <Col xs={12}>
                                <Alert variant={"success"} style={{borderRadius: 12}}>
                                    Đăng ký tài khoản thành công, xin mời đăng nhập!
                                </Alert>
                            </Col>
                            <Col className={"mt-3"}>
                                <Button variant="success" type="button"
                                        style={{borderRadius: 36, width: "100%"}}
                                        onClick={() => router.push("/")}
                                >
                                    Bấm vào đây để quay lại trang đăng nhập!
                                </Button>
                            </Col>
                        </Row>

                    </Row>
                    :
                    <>
                        <Row className={"mt-5"}>
                            <Col>

                                <img src={dictionary.src} className={"position-absolute"}
                                     style={{maxWidth: "30%"}}/>
                            </Col>
                            <img src={loginImage.src} style={{maxWidth: "80%"}}/>
                            <Form className={"mt-3"}>
                                <Form.Group className="mb-2" controlId="formBasicEmail">

                                    <Form.Label className={"fw-bold h4"}>Tên</Form.Label>
                                    <Form.Control type="name" placeholder="Tên" style={{height: 50}}
                                                  onChange={value => {
                                                      setUserRegister({
                                                          firstName: value.target.value,
                                                          lastName: userRegister != null ? userRegister.lastName : null,
                                                          email: userRegister != null ? userRegister.email : null,
                                                          password: userRegister != null ? userRegister.password : null
                                                      })
                                                  }}/>

                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicEmail">

                                    <Form.Label className={"fw-bold h4"}>Họ</Form.Label>
                                    <Form.Control type="name" placeholder="Họ" style={{height: 50}}
                                                  onChange={value => {
                                                      setUserRegister({
                                                          firstName: userRegister != null ? userRegister.firstName : null,
                                                          lastName: value.target.value,
                                                          email: userRegister != null ? userRegister.email : null,
                                                          password: userRegister != null ? userRegister.password : null
                                                      })
                                                  }}/>

                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicEmail">

                                    <Form.Label className={"fw-bold h4"}>Địa chỉ email </Form.Label>
                                    <Form.Control type="email" placeholder="Nhập địa chỉ email" style={{height: 50}}
                                                  onChange={value => {
                                                      setUserRegister({
                                                          firstName: userRegister != null ? userRegister.firstName : null,
                                                          lastName: userRegister != null ? userRegister.lastName : null,
                                                          email: value.target.value,
                                                          password: userRegister != null ? userRegister.password : null
                                                      })
                                                  }}/>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="fw-bold h4">Mật khẩu</Form.Label>
                                    <Form.Control type="password" placeholder="Nhập mật khẩu" style={{height: 50}}
                                                  onChange={value => {
                                                      setUserRegister({
                                                          firstName: userRegister != null ? userRegister.firstName : null,
                                                          lastName: userRegister != null ? userRegister.lastName : null,
                                                          email: userRegister != null ? userRegister.email : null,
                                                          password: value.target.value
                                                      })
                                                  }}
                                    />
                                </Form.Group>


                            </Form>

                        </Row>

                        <Row md={2}>
                            <Col md={6} className={"mt-3"}>
                                <Button variant="success" type="submit" style={{borderRadius: 18, width: "100%"}}
                                        disabled={isLoading} onClick={handleRegister}>
                                    Đăng ký
                                </Button>
                            </Col>
                            <Col className={"mt-3"}>
                                <Button variant="outline-success" type="button"
                                        style={{borderRadius: 18, width: "100%"}}
                                        onClick={() => router.push("/")}
                                >
                                    Đã có tài khoản? Hãy đăng nhập!
                                </Button>
                            </Col>
                        </Row>
                    </>
            }


        </Container>
    )
}

