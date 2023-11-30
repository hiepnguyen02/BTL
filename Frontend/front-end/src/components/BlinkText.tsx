import {selectService} from "@/service/PuzzleService/puzzleGameService";

'use-client'
import {PuzzleElement} from "@/types/game/PuzzleElement";
import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Button, Col} from "react-bootstrap";

import styles from './BlinkText.module.css'

interface BlinkTextProps {
    value?: number
}

const BlinkText: React.FC<BlinkTextProps> = ({value}) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, 800);

        return () => clearTimeout(timeoutId);

    }, [value]);


    return (
        <Col className={isVisible ? styles.blinking : styles.noBlinking} style={{
            borderRadius: 18, fontFamily: "monospace",
            fontWeight: "bolder",
            fontSize: 16,
            fontStyle: "italic",
            color: "darkgreen"
        }}>
            Total: {Math.round(value * 100 * 100) / 100}% completed!
        </Col>
    );
};

export default BlinkText;
