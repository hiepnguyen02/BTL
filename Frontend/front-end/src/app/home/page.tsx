'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {Button, Col, Form, Image, Alert, Navbar, NavbarToggle, NavItem, Nav, Tabs, Tab} from "react-bootstrap";
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
import homeIcon from '../../img/home/homeIcon.png'
import dashBoardIcon from '../../img/home/dashboard.png'
import translationIcon from '../../img/home/translation.png'
import settingsIcon from '../../img/home/settings.png'
import bookIcon from '../../img/home/book.png'
import editIcon from '../../img/home/edit.png'
import userIcon from '../../img/home/user.png'
import checkIcon from '../../img/home/check.png'
import Calendar from "react-calendar";
import {DateCalendar, DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DictionaryTab from "@/components/dictionaryTab";
import {TextField} from "@mui/material";

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
        <Container
            fluid={true}
            style={{
                background: "pink",
                overflow: "hidden",
                height: "100vh",
                padding: 20,
            }}>

            <Container className={"bg-white"}
                       fluid={true}
                       style={{
                           padding: 20,
                           borderRadius: 30,
                           height: "100vh",

                       }}>
                <Row>
                    <Col md={9}>
                        <Tab.Container defaultActiveKey="dictionary">
                            <Row>
                                <Col md={3}>

                                    <img src={homeIcon.src} style={{marginTop: 10, width: 80}}/>
                                    <text className={"font-monospace fw-bolder"} style={{marginLeft: 10}}>Study
                                        with
                                        me!
                                    </text>

                                    <Nav variant="pills" className="flex-column mt-4">
                                        <Nav.Item>
                                            <Nav.Link eventKey="dashBoard"
                                                      style={{
                                                          fontSize: 18,
                                                          fontFamily: "monospace",

                                                      }}>
                                                <img src={dashBoardIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Dashboard</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="translate"
                                                      style={{fontSize: 18, fontFamily: "monospace"}}>
                                                <img src={translationIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Translate</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="dictionary"
                                                      style={{fontSize: 18, fontFamily: "monospace"}}>
                                                <img src={bookIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Dictionary</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="setting"
                                                      style={{fontSize: 18, fontFamily: "monospace"}}>
                                                <img src={settingsIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Settings</Nav.Link>
                                        </Nav.Item>

                                    </Nav>
                                </Col>
                                <Col>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="dashBoard">First tab content</Tab.Pane>
                                        <Tab.Pane eventKey="translate">Second tab content</Tab.Pane>
                                        <Tab.Pane eventKey="dictionary"><DictionaryTab/></Tab.Pane>
                                        <Tab.Pane eventKey="setting">Second tab content</Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>

                    </Col>

                    <Col md={3}>
                        <Row className={"mt-4 justify-content-between"}>
                            <Col xs={4}>
                                <text style={{marginLeft: 10}} className={"fw-bolder h5 font-monospace"}>Profile
                                </text>
                            </Col>
                            <Col xs={2}>
                                <img src={editIcon.src} style={{width: 26}}/>
                            </Col>
                        </Row>
                        <Row xs="auto" className={"justify-content-center mt-5"}>
                            <img src={userIcon.src} style={{width: 160}}/>
                        </Row>
                        <Row className={"mt-3 justify-content-center"}>
                            <Col xs="auto">
                                <text className={"fw-bold h6 font-monospace"} style={{color: "deeppink"}}>Hiep Nguyen
                                </text>
                                <img src={checkIcon.src} style={{width: 20, marginLeft: 10}}/>

                            </Col>


                        </Row>
                        <Row className={"mt-1 justify-content-center"}>
                            <Col xs="auto">
                                <text className={"font-monospace"} style={{color: "gray"}}>hiep2002hd</text>
                            </Col>
                        </Row>
                        <Row className={"mt-3 font-monospace"}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DateCalendar defaultValue={dayjs(Date.now())}/>

                            </LocalizationProvider>

                        </Row>
                    </Col>
                </Row>


            </Container>
        </Container>
    )
}

