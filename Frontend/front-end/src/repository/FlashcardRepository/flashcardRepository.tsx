import config from "@/repository/config";
import Config from "@/repository/config";
import {FlashcardBoard} from "@/types/Flashcardd/FlashcardBoard";

export const getFlashcardBoard = async (): Promise<FlashcardBoard> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/flashcard/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        const result = await response.json();
        return result;
    } catch (e) {
        throw e;
    }

}
export const addFlashcard = async (id: number): Promise<FlashcardBoard> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/flashcard/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(id),
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        const result = await response.json();
        return result;
    } catch (e) {
        throw e;
    }

}
export const removeFlashcard = async (id: number): Promise<FlashcardBoard> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/flashcard/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(id),
        });
        if (!response.ok) {
            throw new Error("Error");
        }
        const result = await response.json();
        return result;
    } catch (e) {
        throw e;
    }

}

