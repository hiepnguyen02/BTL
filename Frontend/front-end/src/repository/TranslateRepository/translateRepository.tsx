import Config from "@/repository/config";
import {EventKey} from "@restart/ui/types";

export const translateRepository = async (content: string, from: EventKey, to: EventKey): Promise<[]> => {

    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from == "fromEng" ? "en" : "vi"}&tl=${to == "toEng" ? "en" : "vi"}&dt=t&q=${content}`, {
            method: 'GET',
            headers: {
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
            },
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data: [] = await response.json();
        return data[0][0][0];


    } catch (error) {
        throw new Error('An error occurred during login');
    }
}
