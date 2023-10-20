'use client'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Col, Form, ListGroup, Modal} from "react-bootstrap";
import translationIcon from "@/img/home/translation.png";
import searchIcon from '../img/home/search.png'
import {useEffect, useState} from "react";
import {loginService} from "@/service/AuthenticationService/loginService";
import {searchWordService} from "@/service/WordService/wordService";
import {ListItem} from "@mui/material";
import WordDetail from "@/components/wordDetail";

export default function DictionaryTab() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [error, setError] = useState<string | null>("");
    const [result, setResult] = useState<EnglishWord[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chosenWord, setChosenWord] = useState<EnglishWord>();
    const handleSearch = async (value: string) => {

        try {
            await searchWordService(value, setResult, setIsLoading, setError);

        } catch (error) {
            setIsLoading(false);
            setError("Thông tin đăng nhập không không hợp lệ.")

        }
    }

    return (
        <>
            <Container className={"mt-4 justify-content-center"}>
                <Row>
                    <Col xs="auto" className={"fw-bolder font-monospace "} style={{fontSize: 28}}>
                        Dictionary
                    </Col>

                    <Col xs="6" style={{marginLeft: 40}}>
                        <Row className={"align-items-center"} style={{border: "solid", borderRadius: 18}}>
                            <Col xs="auto">
                                <img src={searchIcon.src} style={{width: 40, margin: 0}}/>
                            </Col>
                            <Col xs="auto">
                                <Form.Control size={"lg"} style={{border: "none", paddingLeft: 0}}
                                              className={"shadow-none"}
                                              placeholder={"Find a word!"}
                                              value={searchValue}
                                              onChange={(value) => {
                                                  setSearchValue(value.target.value);
                                                  handleSearch(value.target.value);
                                              }}/>
                            </Col>
                        </Row>

                        <Row>
                            <Modal.Dialog hidden={searchValue == ""} style={{width: "100%"}}>
                                <Modal.Body>
                                    {result.length != 0 ?
                                        <ListGroup style={{overflow: "scroll", maxHeight: "90vh"}}>
                                            {result.map(value =>
                                                <Button key={value.id} className={"border-0 p-0 btn-light"}
                                                        onClick={() => setChosenWord(value)}
                                                >
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
                    </Col>
                </Row>
                {searchValue == "" ? <Row className={"mt-3"}>
                    {chosenWord != null ? <Col>
                        <WordDetail define={chosenWord.define} id={chosenWord.id} spelling={chosenWord.spelling}
                                    type={chosenWord.type} word={chosenWord.word}/>
                    </Col> : null}
                </Row> : null}


            </Container>
        </>
    )
}
