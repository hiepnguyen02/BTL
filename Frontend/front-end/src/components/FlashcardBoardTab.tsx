'use client'
import React, {useCallback, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {FlashcardBoard} from "@/types/Flashcardd/FlashcardBoard";
import Row from "react-bootstrap/Row";
import {Button, Carousel, Col, ProgressBar} from "react-bootstrap";
import TopicElement from "@/components/TopicElement";
import {getFlashcardBoard} from "@/repository/FlashcardRepository/flashcardRepository";

import {TopicCard} from "@/types/Flashcardd/TopicCard";
import Flashcard from "@/components/Flashcard";


interface FlashcardBoardProps {
    user: UserRegister,
}

const FlashcardBoardTab: React.FC<FlashcardBoardProps> = ({user}) => {
    const [flashcardBoard, setFlashcardBoard] = useState<FlashcardBoard>();
    const [chosenTopic, setChosenTopic] = useState<TopicCard | undefined>();
    const [islearning, setIslearning] = useState(false);
    const synthesis = window.speechSynthesis;
    const [index, setIndex] = useState(0);
    useEffect(() => {
        return () => {

        };
    }, [flashcardBoard]);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        return () => {
            getFlashcardBoard().then((value) => {
                setFlashcardBoard(value);
            })
        };
    }, []);


    return (
        <Container className={"mt-4 justify-content-center"}>
            <Row className={"align-items-center"}>
                <Col xs="auto" className={"fw-bolder font-monospace "} style={{fontSize: 28}}>
                    Dashboard
                </Col>
                <Col>
                    <Row className={"align-items-center"}>
                        <Col>
                            <ProgressBar
                                variant="success"
                                now={flashcardBoard?.completedPercent * 100}
                                style={{height: 10, transition: 'width 0.1s ease-in-out'}}
                            />
                        </Col>
                        <Col style={{
                            borderRadius: 18, fontFamily: "monospace",
                            fontWeight: "bolder",
                            fontSize: 16,
                            fontStyle: "italic"
                        }}>
                            Total: {Math.round(flashcardBoard?.completedPercent * 100 * 100) / 100}% completed!
                        </Col>

                    </Row>


                </Col>

            </Row>
            <Container style={{overflowY: "scroll", maxHeight: "80vh", justifyContent: "center", alignItems: "center"}}>
                {
                    chosenTopic == undefined ? <Row className={"mt-3 justify-content-center "}>
                            <Row xs={3} className={"justify-content-start "}>
                                {/* eslint-disable-next-line react/jsx-key */}
                                {flashcardBoard?.topicCardList.map(value => <Col xs={4}>
                                    <TopicElement topicElement={value} setChosenTopic={setChosenTopic}/>
                                </Col>)}


                            </Row>

                        </Row> :
                        <Container className={"mt-5"}>

                            <Row className={"align-items-center justify-content-center"}>
                                <Col xs="auto">
                                    <Carousel activeIndex={index} onSelect={handleSelect} variant={"dark"}
                                              interval={null}
                                              indicators={false} style={{width: 270}}>
                                        {chosenTopic.flashCardList.map((card) => (
                                            <Carousel.Item key={card.id}>
                                                <Row>
                                                    <Col>
                                                        <Flashcard setFlashcardBoard={setFlashcardBoard}
                                                                   flashcard={card}/>
                                                    </Col>
                                                </Row>

                                            </Carousel.Item>

                                        ))}
                                    </Carousel>

                                </Col>


                            </Row>
                            <Row className={"mt-4 justify-content-center"}>
                                <Col xs={3}>
                                    <Button variant="warning" type="submit" style={{
                                        borderRadius: 18, fontFamily: "monospace",
                                        fontWeight: "bolder",
                                        fontSize: 20,
                                        width: "100%"
                                    }}
                                            onClick={() => {
                                                setChosenTopic(undefined);

                                            }}
                                    >
                                        Back
                                    </Button>

                                </Col>

                            </Row>

                        </Container>


                }


            </Container>
        </Container>
    )

}
export default FlashcardBoardTab;