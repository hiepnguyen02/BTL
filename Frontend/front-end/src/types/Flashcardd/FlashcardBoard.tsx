import {TopicCard} from "@/types/Flashcardd/TopicCard";

export interface FlashcardBoard {
    topicCardList: Array<TopicCard>;
    completedPercent: number;
}
