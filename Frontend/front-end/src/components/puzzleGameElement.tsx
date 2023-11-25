import {selectService} from "@/service/PuzzleService/puzzleGameService";

'use-client'
import {PuzzleElement} from "@/types/game/PuzzleElement";
import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import styles from './puzzleGameElement.module.css'
import {PuzzleBoard} from "@/types/game/PuzzleBoard";
import {set} from "zod";

interface PuzzleComponentProps {
    puzzleElement?: PuzzleElement;
    setBoard: React.Dispatch<React.SetStateAction<PuzzleBoard | undefined>>
}

const PuzzleComponent: React.FC<PuzzleComponentProps> = ({puzzleElement, setBoard}) => {
    return (
        <Button className={
            puzzleElement?.corrected ? styles.corrected : puzzleElement?.selected ? styles.selected : styles.button}
                onClick={() => {
                    if (!puzzleElement?.selected || !puzzleElement?.corrected) {
                        selectService(puzzleElement).then((e) => {
                                setBoard({
                                    board: e.board, wordList: e.wordList, score: e.score,
                                    totalScore: e.totalScore
                                });
                            }
                        )
                    }

                }}
                style={{
                    height: 60,
                    width: 60,
                    margin: 3,
                    fontFamily: "monospace",
                    color: "black",
                    fontWeight: "bolder",
                    fontSize: 30
                }}>
            {puzzleElement?.value}
        </Button>
    );
};

export default PuzzleComponent;
