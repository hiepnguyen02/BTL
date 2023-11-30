'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {Button, Col, Form, Image, Alert, Navbar, NavbarToggle, NavItem, Nav, Tabs, Tab} from "react-bootstrap";
import loginImage from '../../img/login/login.png'
import dictionary from '../../img/login/dictionary.png'
import {auto} from "@popperjs/core";
import React, {useEffect, useState} from "react";

import {useRouter} from "next/navigation";
import homeIcon from '../../img/home/homeIcon.png'
import dashBoardIcon from '../../img/home/dashboard.png'
import translationIcon from '../../img/home/translation.png'
import settingsIcon from '../../img/home/settings.png'
import bookIcon from '../../img/home/book.png'
import editIcon from '../../img/home/edit.png'
import userIcon from '../../img/home/user.png'
import checkIcon from '../../img/home/check.png'
import bookmarkIcon from '../../img/home/bookmark-3.png'
import puzzleIcon from '../../img/home/jigsaw.png'
import logoutIcon from '../../img/home/logout.png'
import Calendar from "react-calendar";
import {DateCalendar, DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DictionaryTab from "@/components/dictionaryTab";

import TranslateTab from "@/components/translateTab";
import config from "@/repository/config";
import {getUserByTokenService} from "@/service/UserService/userService";
import Link from "next/link";
import Config from "@/repository/config";
import BookmarkTab from "@/components/bookmarkTab";
import PuzzleGameTab from "@/components/puzzleGameTab";
import FlashcardBoardTab from "@/components/FlashcardBoardTab";
import styles from "@/components/PuzzleGameTab.module.css";


export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState<UserRegister | null>(null);
    useEffect(() => {
        getUserByTokenService().then((e) => {
            if (e?.email != null) {
                setUser(e);
            }
        })


    }, [],)

    const [selectedItem, setSelectedItem] = useState('dashBoard');

    const handleSelect = (selectedKey: string) => {
        setSelectedItem(selectedKey);
    };
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
                        <Tab.Container defaultActiveKey="dashBoard">
                            <Row>
                                <Col md={3}>

                                    <img src={homeIcon.src} style={{marginTop: 10, width: 80}}/>
                                    <text className={"font-monospace fw-bolder"} style={{marginLeft: 10}}>Study
                                        with
                                        me!
                                    </text>

                                    <Nav variant="pills" className="flex-column mt-4"
                                         onSelect={(value) => handleSelect(value!)}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="dashBoard"
                                                      style={selectedItem != "dashBoard" ? {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          color: "black",


                                                      } : {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          backgroundColor: "pink",
                                                          color: "black",
                                                          fontWeight: "bolder"

                                                      }}

                                            >
                                                <img src={dashBoardIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Dashboard</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="translate"
                                                      style={selectedItem != "translate" ? {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          color: "black",


                                                      } : {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          backgroundColor: "pink",
                                                          color: "black",
                                                          fontWeight: "bolder"

                                                      }}>
                                                <img src={translationIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Translate</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="dictionary"
                                                      style={selectedItem != "dictionary" ? {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          color: "black",


                                                      } : {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          backgroundColor: "pink",
                                                          color: "black",
                                                          fontWeight: "bolder"

                                                      }}>
                                                <img src={bookIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Dictionary</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="bookmark"
                                                      style={selectedItem != "bookmark" ? {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          color: "black",


                                                      } : {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          backgroundColor: "pink",
                                                          color: "black",
                                                          fontWeight: "bolder"

                                                      }}>
                                                <img src={bookmarkIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Bookmark</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="puzzleGame"
                                                      style={selectedItem != "puzzleGame" ? {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          color: "black",


                                                      } : {
                                                          fontSize: 18,
                                                          fontFamily: "monospace",
                                                          backgroundColor: "pink",
                                                          color: "black",
                                                          fontWeight: "bolder"

                                                      }}>
                                                <img src={puzzleIcon.src} style={{width: 30, marginRight: 10}}/>
                                                Puzzle Game</Nav.Link>
                                        </Nav.Item>


                                    </Nav>
                                </Col>
                                <Col>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="dashBoard"><FlashcardBoardTab user={user}/></Tab.Pane>
                                        <Tab.Pane eventKey="translate"><TranslateTab/></Tab.Pane>
                                        <Tab.Pane eventKey="dictionary"><DictionaryTab
                                            user={user} selectedTab={selectedItem}/></Tab.Pane>
                                        <Tab.Pane eventKey="bookmark"><BookmarkTab user={user}
                                                                                   selectedTab={selectedItem}/></Tab.Pane>
                                        <Tab.Pane eventKey="puzzleGame"><PuzzleGameTab user={user}/></Tab.Pane>
                                      
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>

                    </Col>

                    <Col md={3}>
                        {user == null ?
                            <Row className={"mt-4 justify-content-between"}>
                                <Row>

                                    <Col>
                                        <Button variant="outline-success" type="button"
                                                style={{borderRadius: 18, width: "100%"}}
                                                onClick={() => router.push("/register")}
                                        >
                                            To use all utilities, please create an account!
                                            <Link href={"/register"}></Link>
                                        </Button>
                                    </Col>
                                </Row>

                            </Row>
                            :
                            <Row>
                                <Row className={"mt-4 justify-content-between"}>
                                    <Col xs={4}>
                                        <text style={{marginLeft: 10}} className={"fw-bolder h5 font-monospace"}>Profile
                                        </text>
                                    </Col>
                                    <Col xs={2}>

                                        <Button variant="warning" type="submit" style={{
                                            borderRadius: 18,
                                        }}
                                                onClick={() => {
                                                    localStorage.removeItem(config.JWT_COOKIE_NAME);
                                                    router.push("/")

                                                }}
                                                className={styles.logoutButton}>
                                            <img src={logoutIcon.src} style={{width: 40,}}/>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row xs="auto" className={"justify-content-center mt-5 align-items-center"}>
                                    <img src={userIcon.src} style={{width: 160,}}/>
                                </Row>
                                <Row className={"mt-3 justify-content-center"}>
                                    <Col xs="auto">
                                        <text className={"fw-bold h6 font-monospace"} style={{color: "deeppink"}}>
                                            {`${user.firstName} ${user.lastName}`}
                                        </text>
                                        <img src={checkIcon.src} style={{width: 20, marginLeft: 10}}/>

                                    </Col>


                                </Row>
                                <Row className={"mt-1 justify-content-center"}>
                                    <Col xs="auto">
                                        <text className={"font-monospace"} style={{color: "gray"}}>{user.email}</text>
                                    </Col>
                                </Row>
                            </Row>

                        }


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

