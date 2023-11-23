import {Lang} from "@/types/Lang";

export interface Word {
    id: number | null;
    word: string | null;
    define: string | null;
    spelling: string | null;
    type: string | null;
    lang: Lang | null;

    personalDictionary: {
        id: number | null;
    }
}
