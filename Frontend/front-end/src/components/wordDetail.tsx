import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Button, Col} from "react-bootstrap";
import speakerIcon from "@/img/home/marketing.png";
import styles from './WordDetail.module.css'


export default function WordDetail(chosenWord: Word) {
    const synthesis = window.speechSynthesis;

    const speakText = () => {
        if (synthesis && chosenWord?.word) {
            const utterance = new SpeechSynthesisUtterance(chosenWord.word);
            synthesis.speak(utterance);
        }
    }
    return (
        <Container style={{
            borderRadius: 13, padding: 20, border: "solid", background: "lightpink", maxHeight: "60vh",
            overflow: "scroll"
        }}>
            <Row>
                <Col className={"h1 fw-bolder font-monospace"}>
                    {chosenWord.word}
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
                    {chosenWord.spelling}
                </Col>
            </Row>
            <Row className={"mt-2"}>
                <Col className={" h5 font-monospace "} style={{fontStyle: "italic"}}>
                    {chosenWord.type}
                </Col>
            </Row>
            <Row className={"mt-1"}>
                <Col className={"font-monospace"}>
                    {chosenWord.define}
                </Col>
            </Row>
        </Container>
    )
}
