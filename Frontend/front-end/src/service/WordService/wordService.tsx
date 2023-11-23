import {loginRepository} from "@/repository/AuthenticationRepository/loginRepository";
import Config from "@/repository/config";
import {
    addWordRepository,
    updateWordRepository,
    wordSearchRepository
} from "@/repository/WordRepository/wordRepository";
import {getUserRepository} from "@/repository/UserRepository/userRepository";
import {Word} from "@/types/word/Word";

export const searchWordService = async (prefix: string | null,
                                        setResult: React.Dispatch<React.SetStateAction<Word[]>>,
                                        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                        setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
        if (prefix != null && prefix != "") {
            const response = await wordSearchRepository(prefix);

            setResult(response);
            setIsLoading(false);

        } else {
            setError("Thong tin dang nhap khong hop le");
            setIsLoading(false);
        }


    } catch (error) {
        throw new Error('An error occurred during login');
    }
};
export const addWordService = async (wordToAdd: Word | null):
    Promise<Word | undefined> => {
    try {

        const response = await addWordRepository(wordToAdd);
        return response || undefined;


    } catch (error) {

    }
};
export const updateWordService = async (word: Word | null):
    Promise<void> => {
    try {

        const response = await updateWordRepository(word);


    } catch (error) {
        
    }
};
