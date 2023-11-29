import {PuzzleBoard} from "@/types/game/PuzzleBoard";
import {
    addWordToBookmarkFromPuzzleRepository,
    check,
    generateBoardDictionaryRepository,
    generateBoardRepository,
    selectRepository
} from "@/repository/PuzzleRepository/puzzleGameRepository";
import {PuzzleElement} from "@/types/game/PuzzleElement";


export const generateBoardService = async ():
    Promise<PuzzleBoard> => {
    try {
        const response = await generateBoardRepository();
        return response
    } catch (error) {

    }
};
export const generateBoardDictionaryService = async ():
    Promise<PuzzleBoard> => {
    try {
        const response = await generateBoardDictionaryRepository();
        if (response != undefined) {
            return response
        } else {
            throw new Error("Can not generate");
        }


    } catch (error) {
        throw  error;
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

export const addToBookmarkFromPuzzle = async (id: number):
    Promise<PuzzleBoard> => {
    try {
        const response = await addWordToBookmarkFromPuzzleRepository(id);
        if (response != undefined) {
            return response
        } else {
            throw new Error("Can not generate");
        }


    } catch (error) {
        throw  error;
    }
};
