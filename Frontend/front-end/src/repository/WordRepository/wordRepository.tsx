import Config from "@/repository/config";
import config from "@/repository/config";
import {Word} from "@/types/word/Word";

export const wordSearchRepository = async (prefix: string): Promise<Word[]> => {
    try {
        const response = await fetch(`${Config.API_URL}/word/search?prefix=${prefix}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

            },
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data: Word[] = await response.json();

        return data;


    } catch (error) {
        throw new Error('An error occurred during login');
    }
}
export const addWordRepository = async (word: Word): Promise<Word> => {
    try {
        console.log(word);
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/dictionary/add-word`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            },

            body: JSON.stringify(word),

        });

        const word1 = await response.json();
        const result: Word = {lang: null, define: null, id: null, spelling: null, type: null, word: null};
        result.word = word1.word;
        result.define = word1.define;
        result.type = word1.type;
        result.spelling = word1.spelling;
        result.lang = word1.lang;
        return result;


    } catch (error) {
        throw new Error('An error occurred during add word');
    }
}
export const updateWordRepository = async (word: Word): Promise<void> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/dictionary/update-word`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            },

            body: JSON.stringify(word),

        });


    } catch (error) {
        throw new Error('An error occurred during update word');
    }
}
