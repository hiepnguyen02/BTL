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
        const result: PuzzleBoard = await response.json();
        return result;
    } catch (e) {

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
