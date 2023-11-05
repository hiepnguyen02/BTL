'use client'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Col, Collapse, Form, ListGroup, Modal, Spinner} from "react-bootstrap";
import translationIcon from "@/img/home/translation.png";
import searchIcon from '../img/home/search.png'
import {useCallback, useEffect, useState} from "react";
import {loginService} from "@/service/AuthenticationService/loginService";
import {searchWordService} from "@/service/WordService/wordService";
import {debounce, ListItem} from "@mui/material";
import WordDetail from "@/components/wordDetail";

export default function DictionaryTab() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [error, setError] = useState<string | null>("");
    const [result, setResult] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chosenWord, setChosenWord] = useState<Word>();

    const debouncedSearch = useCallback(
        debounce(async (value) => {
            try {
                searchWordService(value, setResult, setIsLoading, setError);
            } catch (error) {
            }
        }, 300),
        []
    );
    const handleInputChange = (event: any) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        debouncedSearch(newValue);
    };
    return (
        <>
            <Container className={"mt-4 justify-content-center"}>

                <Row xs="auto" className={"fw-bolder font-monospace "} style={{fontSize: 28}}>
                    <Col>
                        Dictionary

                    </Col>

                </Row>
                <Row className={"mt-5 align-content-center justify-content-center"}>
                    <Row xs={3} className={"align-items-center"}
                         style={{border: "solid", borderRadius: 18, width: "50vh"}}>
                        <Col xs="2">
                            <img src={searchIcon.src} style={{width: 40, margin: 0}}/>
                        </Col>
                        <Col xs="9">
                            <Form.Control size={"lg"} style={{border: "none", paddingLeft: 0}}
                                          className={"shadow-none"}
                                          placeholder={"Find a word!"}
                                          value={searchValue}
                                          onChange={(value) => {

                                              handleInputChange(value);
                                          }}/>
                        </Col>
                        {
                            isLoading ? <Col xs="1">
                                <Spinner animation="border" role="status" size={"sm"}></Spinner>
                            </Col> : null
                        }
                    </Row>

                    <Row>
                        <Modal.Dialog hidden={searchValue == ""} style={{width: "50vh"}}>
                            <Modal.Body>
                                {(result.length != 0) && (isLoading == false) ?
                                    <ListGroup style={{overflow: "scroll", maxHeight: "90vh"}}>
                                        {result.map(value =>
                                            <Button key={value.id} className={"border-0 p-0 btn-light"}
                                                    onClick={() => {
                                                        setChosenWord(value);
                                                        setSearchValue("");
                                                    }}>
                                                <ListGroup.Item
                                                    style={{background: "transparent"}}
                                                >
                                                    <Row>
                                                        <text
                                                            className={"font-monospace fw-semibold"}>{value.word}</text>
                                                        <text
                                                            className={"font-monospace "}>{value.spelling}</text>
                                                        <text className={"font-monospace "}>{value.define}</text>
                                                    </Row>


                                                </ListGroup.Item>
                                            </Button>
                                        )}
                                    </ListGroup> :
                                    <ListGroup>
                                        <ListItem>
                                            <text
                                                className={"font-monospace fw-semibold"}>No results found
                                            </text>
                                        </ListItem>
                                    </ListGroup>
                                }

                            </Modal.Body>
                        </Modal.Dialog>
                    </Row>

                </Row>

                {searchValue == "" ?
                    <Row className={"mt-5 "}>
                        {chosenWord != null ?

                            <Col>

                                <WordDetail define={chosenWord.define} id={chosenWord.id}
                                            spelling={chosenWord.spelling}
                                            type={chosenWord.type} word={chosenWord.word}/>

                            </Col>

                            : null}
                    </Row>

                    : null}


            </Container>
        </>
    )
}
