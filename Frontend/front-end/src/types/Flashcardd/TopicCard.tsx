import {FlashCard} from "@/types/Flashcardd/FlashCard";

export interface TopicCard {
    flashCardList: Array<FlashCard>;
    name: string;
    completedPercent: number;
}
