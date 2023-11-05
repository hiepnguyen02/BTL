import Config from "@/repository/config";

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
