'use client'
import React, {useCallback, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";
import {PuzzleBoard} from "@/types/game/PuzzleBoard";
import {checkService, generateBoardService} from "@/service/PuzzleService/puzzleGameService";
import PuzzleComponent from "@/components/puzzleGameElement";
import {PuzzleElement} from "@/types/game/PuzzleElement";


export default function PuzzleGameTab() {
    const [board, setBoard] = useState<PuzzleBoard | undefined>();
    useEffect(() => {
        return () => {
            generateBoardService().then((e) => {
                setBoard(e);
            })
        };
    }, []);


    return (
        <Container className={"mt-4 justify-content-center"}>
            <Row>
                <Col>
                    {board?.score}
                </Col>
                <Col>
                    {board?.totalScore}
                </Col>
            </Row>
            <Row>
                <Col xs="auto" className={"fw-bolder font-monospace "} style={{fontSize: 28}}>
                    Puzzle Game
                </Col>
            </Row>
            <Row xs={"auto"} className={"justify-content-center mt-3"}>
                {board?.board.map((row, rowIndex) => (

                    <Row xs={8} className={"p-0 m-0"} key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Col xs={"auto"} key={colIndex} className={"p-0 m-0"}><PuzzleComponent
                                puzzleElement={cell} setBoard={setBoard}/></Col>
                        ))}
                    </Row>
                ))}
            </Row>
            <Row className={"justify-content-center mt-3"}>
                <Col xs={"auto"}>
                    <Button variant="success" type="submit" style={{
                        borderRadius: 18, fontFamily: "monospace",
                        fontWeight: "bolder",
                        fontSize: 20
                    }}
                            onClick={() => checkService().then((e) => setBoard(e))}
                    >
                        Submit
                    </Button>
                </Col>
            </Row>


        </Container>
    )

}
