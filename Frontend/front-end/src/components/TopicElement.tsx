import React from "react";
import {TopicCard} from "@/types/Flashcardd/TopicCard";
import Container from "react-bootstrap/Container";
import {Button, Col, Image, ProgressBar} from "react-bootstrap";
import styles from './TopicElement.module.css';
import Row from "react-bootstrap/Row";
import topic1 from '../img/dashboard/1.jpg'
import topic2 from '../img/dashboard/2.jpg'
import topic3 from '../img/dashboard/3.png'
import topic4 from '../img/dashboard/4.jpg'
import topic5 from '../img/dashboard/5.jpg'
import topic6 from '../img/dashboard/6.png'
import topic7 from '../img/dashboard/7.jpg'
import topic8 from '../img/dashboard/8.png'
import topic9 from '../img/dashboard/9.jpg'
import topic10 from '../img/dashboard/10.jpg'
import {Word} from "@/types/word/Word";


interface TopicElementProps {
    topicElement: TopicCard;
    setChosenTopic: React.Dispatch<React.SetStateAction<TopicCard | undefined>>,
}

const TopicElement: React.FC<TopicElementProps> = ({topicElement, setChosenTopic}) => {
    return (

        <Button className={styles.topicElement} style={{
            borderColor: "lightpink",
            borderWidth: 2
        }} onClick={() => {
            setChosenTopic(topicElement);
        }}>
            <Row style={{width: "100%", height: 160,}}>
                <Col className={"p-0"}>
                    <Image src={topicElement.name.substring(0, 2) == "1." ? topic1.src :
                        topicElement.name.substring(0, 2) == "2." ? topic2.src :
                            topicElement.name.substring(0, 2) == "3." ? topic3.src :
                                topicElement.name.substring(0, 2) == "4." ? topic4.src :
                                    topicElement.name.substring(0, 2) == "5." ? topic5.src :
                                        topicElement.name.substring(0, 2) == "6." ? topic6.src :
                                            topicElement.name.substring(0, 2) == "7." ? topic7.src :
                                                topicElement.name.substring(0, 2) == "8." ? topic8.src :
                                                    topicElement.name.substring(0, 2) == "9." ? topic9.src :
                                                        topicElement.name.substring(0, 2) == "10" ? topic10.src : topic1.src


                    }
                           style={{width: "100%", height: 136, borderRadius: 26}} fluid={true}
                    />


                </Col>


            </Row>
            <Row>
                <Col style={{
                    fontWeight: "bolder",
                    fontSize: 16,

                    color: "black",
                    marginTop: 3
                }}>
                    {topicElement.name}
                </Col>
            </Row>
            <Row style={{width: "100%"}} className={"mb-3"}>
                <Col>
                    <ProgressBar variant={"danger"} now={topicElement.completedPercent * 100} style={{
                        height: 6, width: "100%", borderColor: "gray",
                        borderRadius: 26,
                    }}/>
                </Col>
            </Row>


        </Button>
    )

}
export default TopicElement
