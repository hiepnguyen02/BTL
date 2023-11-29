import {FlashcardBoard} from "@/types/Flashcardd/FlashcardBoard";
import {addFlashcard, getFlashcardBoard, removeFlashcard} from "@/repository/FlashcardRepository/flashcardRepository";

export const getFlashcardService = async ():
    Promise<FlashcardBoard> => {
    try {
        const response = await getFlashcardBoard();
        if (response != undefined) {
            return response
        } else {
            throw new Error("Can not generate");
        }
        return response;
    } catch (error) {
        throw(error);
    }
};
export const addFlashcardService = async (id: number):
    Promise<FlashcardBoard> => {
    try {
        const response = await addFlashcard(id);
        if (response != undefined) {
            return response
        } else {
            throw new Error("Can not add flashcard");
        }
        return response;
    } catch (error) {
        throw(error);
    }
};
export const removeFlashcardService = async (id: number):
    Promise<FlashcardBoard> => {
    try {
        const response = await removeFlashcard(id);
        if (response != undefined) {
            return response
        } else {
            throw new Error("Can not remove flashcard");
        }
        return response;
    } catch (error) {
        throw(error);
    }
};
