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
export const updateWordRepository = async (word: Word): Promise<Word> => {
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
        const data: Word = await response.json();
        return data;

    } catch (error) {
        throw new Error('An error occurred during update word');
    }
}
export const deleteWordRepository = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/dictionary/delete-word`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            },

            body: JSON.stringify(id),

        });


    } catch (error) {
        throw new Error('An error occurred during delete word');
    }
}
export const getWordRepository = async (id: number): Promise<Word> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/dictionary/get-word`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            },

            body: JSON.stringify(id),

        });
        const data: Word = await response.json();
        return data


    } catch (error) {
        throw new Error('An error occurred during remove word from bookmark');
    }
}
export const addToBookmark = async (id: number): Promise<Word> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/bookmark/add-word`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            },

            body: JSON.stringify(id),

        });
        return response.json();


    } catch (error) {
        throw new Error('An error occurred during add word to bookmark');
    }
}
export const removeFromBookmarkRepository = async (id: number): Promise<Word> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/bookmark/delete-word`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,

            },

            body: JSON.stringify(id),

        });
        return response.json();


    } catch (error) {
        throw new Error('An error occurred during remove word from bookmark');
    }
}

export const getBookmarkListRepository = async (): Promise<Word[]> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/bookmark/get-bookmark`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const data: Word[] = await response.json();
        return data;
    } catch (e) {

    }
}
