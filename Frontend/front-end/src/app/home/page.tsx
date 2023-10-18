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

export default function Page() {
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
    const handleLogin = () => {
        console.log("djhdjdhj");
    }
    return (

        <Container fluid={"lg"}>
            <Row>
                <Col>
                    <img

                </Col>
            </Row>


        </Container>
    )
}

