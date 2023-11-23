import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Alert, Button, Col, Form, Modal, ProgressBar} from "react-bootstrap";
import speakerIcon from "@/img/home/marketing.png";
import styles from './WordDetail.module.css'
import editIcon from "@/img/home/edit.png";
import remove from "@/img/home/delete-2.png";
import {Word} from "@/types/word/Word";
import {Lang} from "@/types/Lang";
import {useEffect, useState} from "react";
import {addWordService, updateWordService} from "@/service/WordService/wordService";
import {valueOf} from "node";
import {ChildProp} from "next/dist/server/app-render/types";


export default function WordDetail({
                                       setChosenWord,
                                       chosenWord,
                                       setShowNoti,
                                       setProgress1,
                                       setUpdateNoti,
                                       setRemoveNoti
                                   }) {
    const synthesis = window.speechSynthesis;
    const [word, setWord] = useState(chosenWord);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowDeleteModal, setIsDeleteShowModal] = useState<boolean>(false);
    const [wordToAdd, setWordToAdd] = useState<Word | null>(
        chosenWord
    );
    const [isShowNoti, setIsShowNoti] = useState(false);
    const [progress, setProgress] = useState(0);
    const handleUpdateWord = () => {
        updateWordService(wordToAdd).then((e) => {
            console.log(e);
        })
    }
    const [isDeleted, setIsDeleted] = useState(false);

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
        };

        if (isShowNoti) {
            setIsShowNoti(true);

            const timer = setTimeout(hideNotification, 4000);

            return () => clearTimeout(timer);
        }
    }, [isShowNoti]);

    const speakText = () => {
        if (synthesis && chosenWord?.word) {
            const utterance = new SpeechSynthesisUtterance(chosenWord.word);
            synthesis.speak(utterance);
        }
    }
    return (
        <>{word != null ? <Container style={{
            borderRadius: 13, padding: 20, border: "solid", background: "lightpink", maxHeight: "60vh",
            overflow: "scroll"
        }}>
            <Row>


                <Col>
                    <Row>
                        <Col className={"h1 fw-bolder font-monospace"}>
                            {word.word}
                        </Col>

                    </Row>
                    <Row className={"align-items-center"}>
                        <Col xs="auto">
                            <Button className={styles.speaker}
                                    onClick={() => speakText()}
                            >
                                <img src={speakerIcon.src} style={{width: 40, margin: 0}}/>
                            </Button>
                        </Col>
                        <Col xs="auto" className={"font-monospace fw-bolder"} style={{color: "gray"}}>
                            {word.spelling}
                        </Col>
                    </Row>
                    <Row className={"mt-2"}>
                        <Col className={" h5 font-monospace "} style={{fontStyle: "italic"}}>
                            {word.type}
                        </Col>
                    </Row>
                    <Row className={"mt-1"}>
                        <Col className={"font-monospace"}>
                            {word.define}
                        </Col>
                    </Row>
                </Col>
                {
                    word.personalDictionary ?
                        <Col xs={1}>
                            <Row className={"justify-content-end"}>
                                <Col xs={"auto"} className={"p-0"}>
                                    <Button className={styles.edit}
                                            onClick={() => setIsShowModal(true)}
                                    >
                                        <img src={editIcon.src} style={{width: 40, margin: 0}}/>
                                    </Button>
                                    <Button className={styles.edit}
                                            onClick={() => {
                                                setIsDeleteShowModal(true);

                                            }}
                                    >
                                        <img src={remove.src} style={{width: 40, margin: 0}}
                                        />
                                    </Button>

                                </Col>
                            </Row>

                        </Col> : null
                }
            </Row>

        </Container> : null}

            <Modal
                show={isShowModal}
                onHide={() => setIsShowModal(false)}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className={"font-monospace fw-bolder"}>Update word to your personal
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
                                    personalDictionary: {id: wordToAdd != null ? wordToAdd.personalDictionary.id : null,},
                                    id: wordToAdd != null ? wordToAdd.id : null,
                                    word: value.target.value,
                                    define: wordToAdd != null ? wordToAdd.define : null,
                                    type: wordToAdd != null ? wordToAdd.type : null,
                                    lang: wordToAdd != null ? wordToAdd.lang : null,
                                    spelling: wordToAdd != null ? wordToAdd.spelling : null
                                })
                            }}
                                          defaultValue={wordToAdd?.word}
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
                                                  personalDictionary: {id: wordToAdd != null ? wordToAdd.personalDictionary.id : null,},
                                                  id: wordToAdd != null ? wordToAdd.id : null,
                                                  word: wordToAdd != null ? wordToAdd.word : null,
                                                  define: value.target.value,
                                                  type: wordToAdd != null ? wordToAdd.type : null,
                                                  lang: wordToAdd != null ? wordToAdd.lang : null,
                                                  spelling: wordToAdd != null ? wordToAdd.spelling : null
                                              })
                                          }} defaultValue={wordToAdd?.define}/>
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
                                    personalDictionary: {id: wordToAdd != null ? wordToAdd.personalDictionary.id : null,},

                                    id: wordToAdd != null ? wordToAdd.id : null,
                                    word: wordToAdd != null ? wordToAdd.word : null,
                                    define: wordToAdd != null ? wordToAdd.define : null,
                                    type: value.target.value,
                                    lang: wordToAdd != null ? wordToAdd.lang : null,
                                    spelling: wordToAdd != null ? wordToAdd.spelling : null
                                })
                            }} defaultValue={wordToAdd?.type}/>
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
                                    personalDictionary: {id: wordToAdd != null ? wordToAdd.personalDictionary.id : null,},
                                    id: wordToAdd != null ? wordToAdd.id : null,
                                    word: wordToAdd != null ? wordToAdd.word : null,
                                    define: wordToAdd != null ? wordToAdd.define : null,
                                    type: wordToAdd != null ? wordToAdd.type : null,
                                    lang: wordToAdd != null ? wordToAdd.lang : null,
                                    spelling: value.target.value
                                })
                            }} defaultValue={wordToAdd?.spelling}/>
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
                                    handleUpdateWord();
                                    setWord(wordToAdd);
                                    setIsShowModal(false);
                                    setProgress1(100);
                                    setShowNoti(true);
                                    setUpdateNoti(true);

                                }

                            }
                            }
                    >Update</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={isShowDeleteModal}
                onHide={() => setIsDeleteShowModal(false)}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title className={"font-monospace fw-bolder"}>Remove word from your personal
                        dictionary</Modal.Title>
                </Modal.Header>
                <Modal.Footer className={"justify-content-between"}>
                    <Button variant="secondary" onClick={() => setIsDeleteShowModal(false)}
                            style={{
                                borderRadius: 18,
                                borderWidth: 2,
                                borderStyle: "solid",
                                fontFamily: "monospace",
                                width: "48%",
                            }}
                    >
                        Cancel
                    </Button>
                    <Button variant="danger" className={styles.addButton} style={{
                        borderRadius: 18,
                        borderWidth: 2,
                        borderStyle: "solid",
                        fontFamily: "monospace",
                        width: "48%",
                    }}
                            onClick={() => {

                                setChosenWord(null);
                                setProgress1(100);
                                setShowNoti(true);
                                setRemoveNoti(true);


                            }
                            }
                    >Remove</Button>
                </Modal.Footer>
            </Modal>

        </>

    )
}
