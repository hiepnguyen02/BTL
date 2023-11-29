'use client'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Col, Collapse, Form, ListGroup, Modal, Nav, Spinner} from "react-bootstrap";
import translationIcon from "@/img/home/translation.png";
import searchIcon from '../img/home/search.png'
import React, {useCallback, useEffect, useState} from "react";
import {loginService} from "@/service/AuthenticationService/loginService";
import {searchWordService} from "@/service/WordService/wordService";
import {debounce, ListItem} from "@mui/material";
import WordDetail from "@/components/wordDetail";
import speakerIcon from "@/img/home/marketing.png";
import styles from './TranslateTab.module.css'
import {EventKey} from "@restart/ui/types";
import {translateService} from "@/service/TranslateService/translateService";

export default function TranslateTab() {
    const [error, setError] = useState<string | null>("");
    const [result, setResult] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [from, setFrom] = useState<EventKey>("fromEng");
    const [to, setTo] = useState<EventKey>("toVi");
    const [translateValue, setTranslateValue] = useState<string>("");

    const debouncedTranslate = useCallback(
        debounce(async (value) => {

            try {
                translateService(value, from, to, setResult, setIsLoading, setError);
            } catch (error) {
            }
        }, 300),
        [from, to]
    );


    const handleInputChange = (event: any) => {
        const newValue = event.target.value;
        setTranslateValue(event.target.value);
        // debouncedTranslate(newValue);

    };
    useEffect(() => {
        translateService(translateValue, from, to, setResult, setIsLoading, setError);
        // debounce(async () => {
        //
        //     try {
        //
        //     } catch (error) {
        //     }
        // }, 300)

    }, [translateValue]);

    return (
        <>
            <Container className={"mt-4 justify-content-center"}>
                <Row>
                    <Col xs="auto" className={"fw-bolder font-monospace "} style={{fontSize: 28}}>
                        Translate
                    </Col>
                </Row>
                <Row xs={2} className={"mt-4 justify-content-between"}>
                    <Col style={{width: "48%"}}>
                        <Row className={"justify-content-center"}>
                            <Col xs="auto">
                                <Nav variant="underline" defaultActiveKey="fromEng"
                                     className={styles.navbar} activeKey={from}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="fromEng"
                                                  className={"font-monospace fw-bolder"}
                                                  onClick={() => {
                                                      setTo("toVi");
                                                      setFrom("fromEng");
                                                      if (from == "fromVi") {
                                                          setTranslateValue(result);
                                                      }

                                                  }}
                                        >English</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="fromVi" className={"font-monospace fw-bolder"}
                                                  onClick={() => {
                                                      setTo("toEng");
                                                      setFrom("fromVi");
                                                      if (from == "fromEng") {
                                                          setTranslateValue(result);
                                                      }
                                                  }}
                                        >Tiếng
                                            Việt</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                            </Col>
                        </Row>
                        <Row style={{
                            padding: 10,
                            borderRadius: 18,
                            border: "solid",
                            background: "lightpink",
                            maxHeight: "60vh",
                            minHeight: "30vh",
                            overflow: "scroll"
                        }} className={"mt-4"}>
                            <Col>
                                <Form.Control
                                    style={{
                                        border: "none",
                                        paddingLeft: 0,
                                        backgroundColor: "transparent"
                                    }}
                                    className={"shadow-none h-100"}
                                    placeholder={"Type here to translate!"}
                                    value={translateValue}
                                    onChange={(value) => handleInputChange(value)}
                                    as="textarea"
                                />

                            </Col>

                        </Row>
                    </Col>
                    <Col style={{width: "48%"}}>
                        <Row className={"justify-content-center"}>
                            <Col xs="auto">
                                <Nav variant="underline" defaultActiveKey="toVi"
                                     className={styles.navbar} activeKey={to}
                                >
                                    <Nav.Item>
                                        <Nav.Link eventKey="toEng"
                                                  className={"font-monospace fw-bolder"}
                                                  onClick={() => {
                                                      setTo("toEng");
                                                      setFrom("fromVi");
                                                      if (from == "fromEng") {
                                                          setTranslateValue(result);
                                                      }
                                                  }}
                                        >English</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="toVi" className={"font-monospace fw-bolder"}
                                                  onClick={() => {
                                                      setTo("toVi");
                                                      setFrom("fromEng");
                                                      if (from == "fromVi") {
                                                          setTranslateValue(result);
                                                      }
                                                  }}
                                        >Tiếng
                                            Việt</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                            </Col>
                        </Row>
                        <Row style={{
                            borderRadius: 18,
                            padding: 20,
                            border: "solid",
                            background: "lightpink",
                            maxHeight: "60vh",
                            minHeight: "30vh",
                            overflow: "scroll"
                        }} className={"mt-4"}>
                            <Col>
                                {translateValue != "" ? isLoading ? "translating..." : result : ""}
                            </Col>

                        </Row>
                    </Col>

                </Row>

            </Container>
        </>
    )
}
