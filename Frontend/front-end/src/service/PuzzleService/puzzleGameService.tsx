import {PuzzleBoard} from "@/types/game/PuzzleBoard";
import {check, generateBoardRepository, selectRepository} from "@/repository/PuzzleRepository/puzzleGameRepository";
import {PuzzleElement} from "@/types/game/PuzzleElement";


export const generateBoardService = async ():
    Promise<PuzzleBoard> => {
    try {
        const response = await generateBoardRepository();
        return response
    } catch (error) {

    }
};
export const selectService = async (element: PuzzleElement | undefined):
    Promise<PuzzleBoard> => {
    try {
        const response = await selectRepository(element);
        return response
    } catch (error) {

    }
};
export const checkService = async ():
    Promise<PuzzleBoard> => {
    try {
        const response = await check();
        return response
    } catch (error) {

    }
};

