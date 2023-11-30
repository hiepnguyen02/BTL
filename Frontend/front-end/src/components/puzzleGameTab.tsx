'use client'
import React, {useCallback, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Alert, Button, Col, ListGroup, ProgressBar} from "react-bootstrap";
import {PuzzleBoard} from "@/types/game/PuzzleBoard";
import {addToBookmarkFromPuzzle, checkService, generateBoardService} from "@/service/PuzzleService/puzzleGameService";
import PuzzleComponent from "@/components/puzzleGameElement";
import styles from './PuzzleGameTab.module.css'
import {generateBoardDictionaryRepository} from "@/repository/PuzzleRepository/puzzleGameRepository";
import speakerIcon from "@/img/home/marketing.png";
import {getBookmarkListService, removeWordFromBookmarkService} from "@/service/WordService/wordService";
import addedBookmarkIcon from "@/img/home/bookmark-2.png";
import bookmarkIcon from "@/img/home/bookmark.png";
import {Howl} from 'howler';
import addIcon from "@/img/home/plus-sign.png";


interface PuzzleGameProps {
    user: UserRegister,
}

const PuzzleGameTab: React.FC<PuzzleGameProps> = ({user}) => {
    const [board, setBoard] = useState<PuzzleBoard | undefined>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [dictionaryMode, setDictionaryMode] = useState(true);
    const [isShowWordList, setIsShowWordList] = useState(false);
    const synthesis = window.speechSynthesis;


    return (
        <Container className={"mt-4 justify-content-center"}>

            <Row>
                <Col xs="auto" className={"fw-bolder font-monospace "} style={{fontSize: 28}}>
                    Puzzle Game
                </Col>
            </Row>
            {isShowWordList ?
                <>
                    <Container style={{overflow: "scroll", maxHeight: "80vh"}}>
                        <ListGroup>
                            {
                                board?.wordList?.map(value => (
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
                                                                    if (!value.bookmarkList.some(bookmark => bookmark.user.email === user.email)) {
                                                                        addToBookmarkFromPuzzle(value?.id).then((e) => {
                                                                            setBoard(e);
                                                                        })
                                                                    }
                                                                }

                                                                }
                                                        >
                                                            {
                                                                value.bookmarkList.some(bookmark => bookmark.user.email === user.email) ?
                                                                    <img src={addedBookmarkIcon.src}
                                                                         style={{width: 40, margin: 0}}
                                                                    /> : <img src={bookmarkIcon.src}
                                                                              style={{width: 40, margin: 0}}
                                                                    />
                                                            }
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
                    <Row className={"justify-content-center mt-2"}>
                        <Col xs={"3"}>
                            <Button variant="warning" type="submit" style={{
                                borderRadius: 18, fontFamily: "monospace",
                                fontWeight: "bolder",
                                fontSize: 20,
                                width: "100%"
                            }}
                                    onClick={() => {
                                        setIsPlaying(true);
                                        setIsShowWordList(false);

                                    }}
                                    className={styles.normalButton}>
                                Back
                            </Button>
                        </Col>

                    </Row>

                </>
                : null
            }

            {isPlaying && !isShowWordList ?
                <><Row xs={"auto"} className={"justify-content-center mt-3"}>
                    <Container>
                        <Row className={"mb-3"}>
                            <Col>
                                <ProgressBar now={(board?.score / board?.totalScore) * 100}
                                             style={{height: 20, borderRadius: 36,}}
                                             variant={board?.score != board?.totalScore ? "warning" : "success"}/>
                            </Col>
                        </Row>

                        {board?.board.map((row, rowIndex) => (

                            <Row xs={8} className={"p-0 m-0"} key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <Col xs={"auto"} key={colIndex} className={"p-0 m-0"}><PuzzleComponent
                                        puzzleElement={cell} setBoard={setBoard}/></Col>
                                ))}
                            </Row>
                        ))}
                    </Container>
                </Row>
                    {board?.score == board?.totalScore ?
                        <Row className={"mt-3 justify-content-center"}> <Col xs={"auto"} style={{
                            borderRadius: 18, fontFamily: "monospace",
                            fontWeight: "bolder",
                            fontSize: 20
                        }}>
                            <text className={styles.blinking}>
                                Completed!
                            </text>

                        </Col> </Row> : null}
                    <Row className={"justify-content-center mt-3 align-items-center"}>

                        <Col xs={"3"}>
                            <Button variant="warning" type="submit" style={{
                                borderRadius: 18, fontFamily: "monospace",
                                fontWeight: "bolder",
                                fontSize: 20,
                                width: "100%"
                            }}
                                    onClick={() => {
                                        setIsPlaying(false);

                                    }}
                                    className={styles.normalButton}>
                                Back
                            </Button>
                        </Col>
                        {board?.score != board?.totalScore ? <Col xs={2}>
                            <Button variant="success" type="submit" style={{
                                borderRadius: 18, fontFamily: "monospace",
                                fontWeight: "bolder",
                                fontSize: 20,
                                width: "100%"
                            }}
                                    onClick={() => checkService().then((e) => setBoard(e))}
                                    className={styles.normalButton}>
                                Submit
                            </Button>
                        </Col> : null}


                        <Col xs={3}>
                            <Button variant="danger" type="submit" style={{
                                borderRadius: 18, fontFamily: "monospace",
                                fontWeight: "bolder",
                                fontSize: 20,
                                width: "100%"
                            }}
                                    onClick={() => {
                                        if (!dictionaryMode) {
                                            generateBoardService().then((e) => setBoard(e))
                                        } else generateBoardDictionaryRepository().then((e) => setBoard(e))
                                    }}
                                    className={styles.normalButton}>
                                New game
                            </Button>
                        </Col>
                        {board?.score == board?.totalScore ?
                            <Col xs={4}>
                                <Button variant="primary" type="submit" style={{
                                    borderRadius: 18, fontFamily: "monospace",
                                    fontWeight: "bolder",
                                    fontSize: 20,
                                    width: "100%"
                                }}
                                        onClick={() => setIsShowWordList(true)}
                                        className={styles.normalButton}>
                                    Show words list
                                </Button>
                            </Col> : null}

                    </Row>
                    {board?.score != board?.totalScore ?
                        <Row className={"mt-3 justify-content-center"}>
                            <Col xs={4}>
                                <Button variant="primary" type="submit" style={{
                                    borderRadius: 18, fontFamily: "monospace",
                                    fontWeight: "bolder",
                                    fontSize: 20,
                                    width: "100%"
                                }}
                                        onClick={() => setIsShowWordList(true)}
                                        className={styles.normalButton}>
                                    Show words list
                                </Button></Col>
                        </Row> : null}

                </> : !isShowWordList ? user ? <>
                    <Row className={"mt-3"}>
                        <Col style={{
                            borderRadius: 18, fontFamily: "monospace",
                            fontWeight: "bolder",
                            fontSize: 16,
                            fontStyle: "italic"
                        }}> Select how is your board generated!</Col>
                    </Row>
                    <Row className={"mt-3"}>
                        <Col>
                            <Button className={styles.button} variant="danger" type="submit" style={{
                                borderRadius: 18, fontFamily: "monospace",
                                fontWeight: "bolder",
                                fontSize: 20,
                                height: 80,
                                width: "100%",
                                margin: 20,
                            }}
                                    onClick={() => {
                                        setIsPlaying(true);
                                        setDictionaryMode(true);
                                        generateBoardDictionaryRepository().then((e) => setBoard(e));

                                    }}
                            >
                                Pick 3 words randomly from Dictionary
                            </Button>
                        </Col>


                    </Row>
                    <Row>
                        <Col>
                            <Col>
                                <Button className={styles.button} variant="danger" type="submit" style={{
                                    borderRadius: 18, fontFamily: "monospace",
                                    fontWeight: "bolder",
                                    fontSize: 20,
                                    height: 80,
                                    width: "100%",
                                    margin: 20,
                                }}
                                        onClick={() => {
                                            generateBoardService().then((e) => setBoard(e));
                                            setIsPlaying(true);
                                            setDictionaryMode(false)
                                        }}
                                >
                                    Pick 3 words randomly from your Bookmark
                                </Button>
                            </Col>
                        </Col>
                    </Row>


                </> : <Row className={"m-5 text-center"}>
                    <Alert variant={"success"} style={{borderRadius: 12}}>
                        Please login to use this function!
                    </Alert>
                </Row> : null
            }


        </Container>
    )

}
export default PuzzleGameTab;
