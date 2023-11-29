import config from "@/repository/config";
import Config from "@/repository/config";
import {PuzzleBoard} from "@/types/game/PuzzleBoard";
import {PuzzleElement} from "@/types/game/PuzzleElement";

export const generateBoardRepository = async (): Promise<PuzzleBoard> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/puzzle/generate-board`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await response.json();
        return result;
    } catch (e) {

    }

}
export const generateBoardDictionaryRepository = async (): Promise<PuzzleBoard> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/puzzle/generate-board-dictionary`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error('Error in selectRepository:', e);
        throw e;
    }

}
export const selectRepository = async (element: PuzzleElement): Promise<PuzzleBoard> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/puzzle/select`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(element),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: PuzzleBoard = await response.json();
        return result;
    } catch (e) {
        console.error('Error in selectRepository:', e);
        throw e;
    }

}
export const check = async (): Promise<PuzzleBoard> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/puzzle/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },

        });
        const result: PuzzleBoard = await response.json();
        return result;
    } catch (e) {

    }

}
export const addWordToBookmarkFromPuzzleRepository = async (id: number): Promise<PuzzleBoard> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/puzzle/add-word-to-bookmark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(id),


        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: PuzzleBoard = await response.json();
        return result;
    } catch (e) {
        throw e;
    }
}
