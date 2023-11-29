import React, {useEffect, useState} from "react";
import {FlashCard} from "@/types/Flashcardd/FlashCard";
import styles from './Flashcard.module.css'
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Row} from "react-bootstrap";
import FlipMove from "react-flip-move";
import {generateBoardDictionaryRepository} from "@/repository/PuzzleRepository/puzzleGameRepository";
import checkedIcon from '../img/flashcard/check.png'
import unCheckedIcon from '../img/flashcard/check-2.png'
import {TopicCard} from "@/types/Flashcardd/TopicCard";
import {FlashcardBoard} from "@/types/Flashcardd/FlashcardBoard";
import {addFlashcard, removeFlashcard} from "@/repository/FlashcardRepository/flashcardRepository";


interface FlashcardProps {
    flashcard: FlashCard
    setFlashcardBoard: React.Dispatch<React.SetStateAction<FlashcardBoard | undefined>>,

}

const Flashcard: React.FC<FlashcardProps> = ({flashcard, setFlashcardBoard}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [localFlashcard, setLocalFlashcard] = useState(flashcard);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <FlipMove>
            <Card className={styles.card} onClick={handleFlip} style={{borderStyle: "none", borderRadius: 26}}>
                <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}>
                    <Container className={styles.cardFront} style={{backgroundColor: "lightpink", borderRadius: 26}}>
                        <Row className={"align-items-center justify-content-center"}>
                            <Row className={"align-items-center justify-content-center"}>
                                <Col xs={"auto"} style={{
                                    fontFamily: "monospace",
                                    fontWeight: "bolder",
                                    fontSize: 20,
                                    padding: 0

                                }}>
                                    {flashcard.word}
                                </Col>
                            </Row>
                            <Row className={"align-items-center justify-content-center"}>
                                <Col xs={"auto"} style={{
                                    fontFamily: "monospace",
                                    fontWeight: "bolder",
                                    fontSize: 20,
                                    padding: 0

                                }}>
                                    ({flashcard.type})
                                </Col>
                            </Row>
                            <Row className={"align-items-center justify-content-center"}>
                                <Col xs={"auto"} style={{
                                    fontFamily: "monospace",
                                    fontWeight: "bolder",
                                    fontSize: 20,
                                    padding: 0

                                }}>
                                    {flashcard.pronunciation}
                                </Col>
                            </Row>
                            <Row className={"mt-3 justify-content-center"}>
                                <Col xs={"auto"}>
                                    <Button className={styles.button} variant="danger" type="submit" style={{}}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (localFlashcard.learned) {
                                                    removeFlashcard(flashcard.id).then(value => {
                                                        setFlashcardBoard(value);
                                                        setLocalFlashcard({...flashcard, "learned": false})
                                                    })
                                                } else {
                                                    addFlashcard(flashcard.id).then(value => {
                                                        setFlashcardBoard(value);
                                                        setLocalFlashcard({...flashcard, "learned": true})
                                                    })
                                                }
                                            }}
                                    >
                                        {localFlashcard.learned ? <img src={checkedIcon.src}
                                                                       style={{width: 40, margin: 0}}
                                        /> : <img src={unCheckedIcon.src}
                                                  style={{width: 40, margin: 0}}
                                        />}

                                    </Button>
                                </Col>


                            </Row>


                        </Row>

                    </Container>
                    <Container className={styles.cardBack} style={{backgroundColor: "palegreen", borderRadius: 26}}>
                        <Row className={"align-items-center justify-content-center"}>
                            <Row className={"align-items-center justify-content-center"}>
                                <Col xs={"auto"} style={{
                                    fontFamily: "monospace",
                                    fontWeight: "bolder",
                                    fontSize: 20,
                                    padding: 0

                                }}>
                                    {flashcard.definition}
                                </Col>
                            </Row>


                        </Row>
                    </Container>
                </div>
            </Card>
        </FlipMove>
    );
};

export default Flashcard;
