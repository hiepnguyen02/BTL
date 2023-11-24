'use client'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Alert, Button, Col, Collapse, Form, ListGroup, Modal, ProgressBar, Spinner} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {
    addWordToBookMarkService,
    getBookmarkListService, removeWordFromBookmarkService,
} from "@/service/WordService/wordService";
import styles from './BookmarkTab.module.css'
import {Word} from "@/types/word/Word";
import speakerIcon from "@/img/home/marketing.png";
import addedBookmarkIcon from "@/img/home/bookmark-2.png";
import bookmarkIcon from "@/img/home/bookmark.png";


export default function BookmarkTab({user, selectedTab}) {


    const [list, setList] = useState<Word[]>([]);
    useEffect(() => {
        if (selectedTab == 'bookmark') {
            getBookmarkListService().then((list) => {
                setList(list);
            });
        }

    }, [selectedTab])

    const synthesis = window.speechSynthesis;
    return (
        <Container className={"mt-4 justify-content-center"}>


            <Row xs="auto" className={"fw-bolder font-monospace "} style={{fontSize: 28}}>
                <Col>
                    Bookmark

                </Col>

            </Row>
            {
                user?.email != undefined ? <Row>

                        <Container style={{overflow: "scroll", maxHeight: "88vh"}}>
                            <ListGroup>
                                {
                                    list?.map(value => (
                                        <Container style={{
                                            borderRadius: 13,
                                            padding: 20,
                                            border: "solid",
                                            background: "lightpink",
                                            maxHeight: "60vh",
                                            overflow: "scroll",
                                            margin: 10,
                                        }} key={value.id}>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col className={"h1 fw-bolder font-monospace"}>
                                                            {value.word}
                                                        </Col>
                                                    </Row>
                                                    <Row className={"align-items-center"}>
                                                        <Col xs="auto">
                                                            <Button className={styles.speaker}
                                                                    onClick={() => {
                                                                        if (synthesis && value?.word) {
                                                                            const utterance = new SpeechSynthesisUtterance(value.word);
                                                                            synthesis.speak(utterance);
                                                                        }
                                                                    }}
                                                            >
                                                                <img src={speakerIcon.src}
                                                                     style={{width: 40, margin: 0, padding: 0}}/>
                                                            </Button>
                                                        </Col>
                                                        <Col xs="auto" className={"font-monospace fw-bolder"}
                                                             style={{color: "gray"}}>
                                                            {value.spelling}
                                                        </Col>
                                                    </Row>
                                                    <Row className={"mt-2"}>
                                                        <Col className={" h5 font-monospace "}
                                                             style={{fontStyle: "italic"}}>
                                                            {value.type}
                                                        </Col>
                                                    </Row>
                                                    <Row className={"mt-1"}>
                                                        <Col className={"font-monospace"}>
                                                            {value.define}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={1}>
                                                    <Row className={"justify-content-end"}>
                                                        <Col xs={"auto"} className={"p-0"}>

                                                            <Button className={styles.edit}
                                                                    onClick={() => {
                                                                        removeWordFromBookmarkService(value.id).then((e) => {
                                                                            getBookmarkListService().then((list) => {
                                                                                setList(list);
                                                                            });
                                                                        });
                                                                    }

                                                                    }
                                                            >
                                                                <img src={addedBookmarkIcon.src}
                                                                     style={{width: 40, margin: 0}}
                                                                />
                                                            </Button>

                                                        </Col>
                                                    </Row>

                                                </Col>

                                            </Row>

                                        </Container>
                                    ))
                                }
                            </ListGroup>
                        </Container>


                    </Row> :
                    <Row className={"m-5 text-center"}>
                        <Alert variant={"success"} style={{borderRadius: 12}}>
                            Please login to use this function!
                        </Alert>
                    </Row>
            }


        </Container>

    )
}
