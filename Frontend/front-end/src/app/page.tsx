'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {Button, Col, Form, Image} from "react-bootstrap";
import loginImage from '../img/login/login.png'
import dictionary from '../img/login/dictionary.png'
import {useState} from "react";
import {loginService} from "@/service/AuthenticationService/loginService";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Home() {
    const [userLogin, setUserLogin] = useState<UserLogin | null>({email: null, password: null});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();
    const handleLogin = async () => {
        try {
            await loginService(userLogin, setIsLoading, setError);
            router.push("/home");

        } catch (error) {
            setIsLoading(false);
            setError("Thông tin đăng nhập không không hợp lệ.")

        }
    }
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

                        <Form.Label className={"fw-bold h4"}>Địa chỉ email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập địa chỉ email" style={{height: 50}}
                                      onChange={value => {
                                          setUserLogin({
                                              email: value.target.value,
                                              password: userLogin != null ? userLogin.password : null
                                          })
                                      }}/>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="fw-bold h4">Mật khẩu</Form.Label>
                        <Form.Control type="password" placeholder="Nhập mật" style={{height: 50}}
                                      onChange={value => {
                                          setUserLogin({
                                              password: value.target.value,
                                              email: userLogin != null ? userLogin.email : null
                                          })
                                      }}
                        />
                    </Form.Group>
                    {error != null ?
                        <text className={"text-danger"}>{error}</text>
                        : null
                    }


                </Form>


            </Row>

            <Row md={2}>
                <Col md={6} className={"mt-3"}>
                    <Button variant="primary" type="submit" style={{borderRadius: 18, width: "100%"}}
                            disabled={isLoading}
                            onClick={handleLogin}
                    >
                        Đăng nhập
                    </Button>
                </Col>
                <Col className={"mt-3"}>
                    <Button variant="outline-success" type="button" style={{borderRadius: 18, width: "100%"}}
                            onClick={() => router.push("/register")}
                    >
                        Chưa có tài khoản? Hãy đăng ký!
                        <Link href={"/register"}></Link>
                    </Button>
                </Col>
            </Row>
            <Row className={"mt-3"}>
                <Col xs="6">
                    <Button variant="outline-warning" type="button" style={{borderRadius: 18, width: "100%"}}
                            onClick={() => router.push("/home")}
                    >
                        Bỏ qua tạo tài khoản - Dùng thử với một số tính năng hạn chế!
                    </Button>
                </Col>
            </Row>


        </Container>
    )
}
