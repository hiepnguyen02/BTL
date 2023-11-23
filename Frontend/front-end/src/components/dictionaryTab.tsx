'use client'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Alert, Button, Col, Collapse, Form, ListGroup, Modal, ProgressBar, Spinner} from "react-bootstrap";
import translationIcon from "@/img/home/translation.png";
import searchIcon from '../img/home/search.png'
import addIcon from '../img/home/plus-sign.png'
import cancelIcon from '../img/home/cancel.png'
import personalWord from '../img/home/word-of-mouth.png'
import {useCallback, useEffect, useState} from "react";
import {loginService} from "@/service/AuthenticationService/loginService";
import {addWordService, searchWordService} from "@/service/WordService/wordService";
import {debounce, ListItem} from "@mui/material";
import WordDetail from "@/components/wordDetail";
import styles from './DictionaryTab.module.css'
import {Lang} from "@/types/Lang";
import {valueOf} from "node";
import {searchWordUserService} from "@/service/UserService/userService";
import {Word} from "@/types/word/Word";
import {boolean} from "zod";

export default function DictionaryTab(user: UserRegister) {
    const [searchValue, setSearchValue] = useState<string>("");
    const [error, setError] = useState<string | null>("");
    const [result, setResult] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [chosenWord, setChosenWord] = useState<Word | null>();
    const [wordToAdd, setWordToAdd] = useState<Word | null>({
            personalDictionary: {id: null},
            id: null,
            word: null,
            define: null,
            type: null,
            lang: Lang.ENG,
            spelling: null
        }
    );
    const [isShowNoti, setIsShowNoti] = useState(false);
    const [updateNoti, setUpdateNoti] = useState(false);
    const [removeNoti, setRemoveNoti] = useState(false);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        return () => {
            console.log(user.email);
        };
    }, [user]);


    useEffect(() => {
        const decreaseProgress = () => {
            if (progress > 0) {
                setProgress(progress - 1);
                console.log(progress - 1);
            }
        };
        const timer = setInterval(decreaseProgress, 30);
        return () => clearInterval(timer);
    }, [progress])

    useEffect(() => {
        const hideNotification = () => {
            setIsShowNoti(false);
            setRemoveNoti(false);
            setUpdateNoti(false);
        };

        if (isShowNoti) {
            setIsShowNoti(true);

            const timer = setTimeout(hideNotification, 4000);

            return () => clearTimeout(timer);
        }
    }, [isShowNoti]);

    const debouncedSearch = useCallback(
        debounce(async (value) => {
            try {
                user.email ? searchWordUserService(value, setResult, setIsLoading, setError) :
                    searchWordService(value, setResult, setIsLoading, setError)
            } catch (error) {
            }
        }, 300),
        [user]
    );
    const handleInputChange = (event: any) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        debouncedSearch(newValue);
    };
    const handleAddWord = () => {
        addWordService(wordToAdd).then((e) => {
            console.log(e);
        })
    }
    return (
        <>
            <Container className={"mt-4 justify-content-center"}>


                <Row xs="auto" className={"fw-bolder font-monospace "} style={{fontSize: 28}}>
                    <Col>
                        Dictionary

                    </Col>

                </Row>

                <Row className={"mt-5 align-items-center justify-content-center "}>
                    <Col xs={9}>
                        <Row className={"justify-content-between"}>
                            <Col xs={9}>
                                <Row style={{border: "solid", borderRadius: 18}} className={"align-items-center"}>
                                    <Col xs={3}>
                                        <img src={searchIcon.src} style={{width: 40, margin: 0}}/>
                                    </Col>
                                    <Col>
                                        <Form.Control size={"lg"} style={{border: "none", paddingLeft: 0}}
                                                      className={"shadow-none"}
                                                      placeholder={"Find a word!"}
                                                      value={searchValue}
                                                      onChange={(value) => {

                                                          handleInputChange(value);
                                                      }}/>
                                    </Col>
                                    {
                                        isLoading ? <Col xs={1}>
                                                <Spinner animation="border" role="status" size={"sm"}></Spinner>
                                            </Col> :
                                            <Col xs={2}>
                                                <Button className={styles.cancelButton} variant="outline-warning"
                                                        style={{borderRadius: 36}}
                                                        type="button"
                                                        onClick={() => {
                                                            setSearchValue("")
                                                        }}
                                                >
                                                    <img src={cancelIcon.src} style={{width: 30, margin: 0}}/>
                                                </Button>

                                            </Col>
                                    }

                                </Row>
                                <Row>
                                    <Modal.Dialog hidden={searchValue == ""} style={{width: "100%"}}>
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


                                                                <Row style={{alignItems: "center"}}>

                                                                    {
                                                                        value.personalDictionary?.id != null ?
                                                                            <Col xs={3}>
                                                                                <Row
                                                                                >
                                                                                    <Col
                                                                                    >
                                                                                        <img src={personalWord.src}
                                                                                             style={{
                                                                                                 width: 30,
                                                                                                 margin: 0,

                                                                                             }}/>
                                                                                    </Col>

                                                                                </Row>
                                                                                <Row
                                                                                    className={"font-monospace" +
                                                                                        " text-muted"}
                                                                                    style={{fontSize: 13}}>
                                                                                    <Col> Your word</Col>

                                                                                </Row>


                                                                            </Col> : null
                                                                    }

                                                                    <Col>
                                                                        <Row>
                                                                            <text
                                                                                className={"font-monospace fw-semibold"}>{value.word}</text>
                                                                            <text
                                                                                className={"font-monospace "}>{value.spelling}</text>
                                                                            <text
                                                                                className={"font-monospace "}>{value.define}</text>
                                                                        </Row>
                                                                    </Col>
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
                            <Col xs={2}>
                                <Row>
                                    <Button variant="primary" type="button"
                                            style={{borderRadius: 36, fontFamily: "monospace"}}
                                            onClick={() => {
                                                if (user.email != undefined) {
                                                    setIsShowModal(true)
                                                } else {
                                                    setIsShowNoti(true);
                                                    setProgress(100);
                                                }

                                            }

                                            }
                                    >
                                        <img src={addIcon.src} style={{width: 40, margin: 0}}/>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>

                {searchValue == "" ?
                    <Row className={"mt-5 "}>
                        {chosenWord != null ?

                            <Col>

                                <WordDetail setChosenWord={setChosenWord} chosenWord={chosenWord}
                                            setShowNoti={setIsShowNoti} setProgress1={setProgress}
                                            setUpdateNoti={setUpdateNoti} setRemoveNoti={setRemoveNoti}
                                />

                            </Col>

                            : null}
                    </Row>

                    : null}
                <Modal
                    show={isShowModal}
                    onHide={() => setIsShowModal(false)}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title className={"font-monospace fw-bolder"}>Add word to your personal
                            dictionary</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                            >
                                <Form.Label className={"font-monospace fw-bolder"}
                                            style={{
                                                backgroundColor: "lightpink",
                                                borderRadius: 18,
                                                padding: 6,
                                                borderWidth: 2,
                                                borderStyle: "solid"
                                            }} required={true}>Your
                                    word</Form.Label>
                                <Form.Control as="textarea" rows={1} style={{
                                    borderRadius: 18,
                                    borderWidth: 2,
                                    borderStyle: "solid"
                                }} onChange={value => {
                                    setWordToAdd({
                                        personalDictionary: {id: null},
                                        id: null,
                                        word: value.target.value,
                                        define: wordToAdd != null ? wordToAdd.define : null,
                                        type: wordToAdd != null ? wordToAdd.type : null,
                                        lang: wordToAdd != null ? wordToAdd.lang : null,
                                        spelling: wordToAdd != null ? wordToAdd.spelling : null
                                    })
                                }}
                                />
                                <Form.Label className={"font-monospace fw-bolder mt-2"}
                                            style={{
                                                backgroundColor: "lightpink",
                                                borderRadius: 18,
                                                padding: 6,
                                                borderWidth: 2,
                                                borderStyle: "solid"
                                            }}>Define</Form.Label>
                                <Form.Control as="textarea" rows={1} style={{
                                    borderRadius: 18,
                                    borderWidth: 2,
                                    borderStyle: "solid"
                                }}
                                              onChange={value => {
                                                  setWordToAdd({
                                                      personalDictionary: {id: null},
                                                      id: null,
                                                      word: wordToAdd != null ? wordToAdd.word : null,
                                                      define: value.target.value,
                                                      type: wordToAdd != null ? wordToAdd.type : null,
                                                      lang: wordToAdd != null ? wordToAdd.lang : null,
                                                      spelling: wordToAdd != null ? wordToAdd.spelling : null
                                                  })
                                              }}/>
                                <Form.Label className={"font-monospace fw-bolder mt-2"}
                                            style={{
                                                backgroundColor: "lightpink",
                                                borderRadius: 18,
                                                padding: 6,
                                                borderWidth: 2,
                                                borderStyle: "solid"
                                            }}>Type of word</Form.Label>
                                <Form.Control as="textarea" rows={1} style={{
                                    borderRadius: 18,
                                    borderWidth: 2,
                                    borderStyle: "solid"
                                }} onChange={value => {
                                    setWordToAdd({
                                        personalDictionary: {id: null},

                                        id: null,
                                        word: wordToAdd != null ? wordToAdd.word : null,
                                        define: wordToAdd != null ? wordToAdd.define : null,
                                        type: value.target.value,
                                        lang: wordToAdd != null ? wordToAdd.lang : null,
                                        spelling: wordToAdd != null ? wordToAdd.spelling : null
                                    })
                                }}/>
                                <Form.Label className={"font-monospace fw-bolder mt-2"}
                                            style={{
                                                backgroundColor: "lightpink",
                                                borderRadius: 18,
                                                padding: 6,
                                                borderWidth: 2,
                                                borderStyle: "solid"
                                            }}>Language</Form.Label>
                                <Form.Control as="select" style={{
                                    borderRadius: 18,
                                    borderWidth: 2,
                                    borderStyle: "solid"
                                }} onChange={value => {
                                    setWordToAdd({
                                            personalDictionary: {id: null},
                                            id: null,
                                            word: wordToAdd != null ? wordToAdd.word : null,
                                            define: wordToAdd != null ? wordToAdd.define : null,
                                            type: wordToAdd != null ? wordToAdd.type : null,
                                            lang: value.target.value,
                                            spelling: wordToAdd != null ? wordToAdd.spelling : null
                                        }
                                    );
                                }} value={wordToAdd?.lang} defaultValue={Lang.ENG}
                                >
                                    <option value={Lang.ENG}>English</option>
                                    <option value={Lang.VI}>Vietnamese</option>
                                </Form.Control>
                                <Form.Label className={"font-monospace fw-bolder mt-2"}
                                            style={{
                                                backgroundColor: "lightpink",
                                                borderRadius: 18,
                                                padding: 6,
                                                borderWidth: 2,
                                                borderStyle: "solid"
                                            }}>Pronounce</Form.Label>
                                <Form.Control as="textarea" rows={1} style={{
                                    borderRadius: 18,
                                    borderWidth: 2,
                                    borderStyle: "solid"
                                }} onChange={value => {
                                    setWordToAdd({
                                        personalDictionary: {id: null},
                                        id: null,
                                        word: wordToAdd != null ? wordToAdd.word : null,
                                        define: wordToAdd != null ? wordToAdd.define : null,
                                        type: wordToAdd != null ? wordToAdd.type : null,
                                        lang: wordToAdd != null ? wordToAdd.lang : null,
                                        spelling: value.target.value
                                    })
                                }}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsShowModal(false)}
                                style={{
                                    borderRadius: 18,
                                    borderWidth: 2,
                                    borderStyle: "solid",
                                    fontFamily: "monospace"
                                }}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" className={styles.addButton} style={{
                            borderRadius: 18,
                            borderWidth: 2,
                            borderStyle: "solid",
                            fontFamily: "monospace"
                        }}
                                onClick={() => {
                                    if (wordToAdd?.word != null) {
                                        handleAddWord();
                                        setIsShowModal(false);
                                        setIsShowNoti(true);
                                        setProgress(100);
                                    }

                                }
                                }
                        >Add word</Button>
                    </Modal.Footer>
                </Modal>


            </Container>
            {isShowNoti ?
                <Container style={{
                    right: 30, bottom: 20, position: "absolute", padding: 0,
                    width: "50vh"
                }}>
                    <Row>
                        <Col>
                            <Alert show={true}
                                   dismissible={true}
                                   className={"font-monospace"}
                                   style={{marginBottom: 0, borderRadius: 0}}
                                   variant={"success"}


                            >
                                {/*{user.email != null ? `Added ${wordToAdd?.word} to your personal dictionary` :*/}
                                {/*    `Login to use this function`*/}
                                {/*}*/}
                                {user.email == null ? `Login to use this function` : updateNoti ?
                                    "Your word is updated" : removeNoti ? "Your word is removed" : `Added ${wordToAdd?.word} to your personal dictionary`
                                }


                            </Alert>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ProgressBar now={progress}
                                         style={{height: 8, borderRadius: 0}}/>
                        </Col>
                    </Row>

                </Container> : null
            }

        </>
    )
}
