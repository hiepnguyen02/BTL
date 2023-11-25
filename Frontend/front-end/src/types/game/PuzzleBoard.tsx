import {List} from "postcss/lib/list";
import {PuzzleElement} from "@/types/game/PuzzleElement";
import {Word} from "@/types/word/Word";

export interface PuzzleBoard {
    board: Array<Array<PuzzleElement>>;
    wordList: Array<Word>;
    score: number;
    totalScore: number;
}
