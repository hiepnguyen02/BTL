import {loginRepository} from "@/repository/AuthenticationRepository/loginRepository";
import Config from "@/repository/config";
import {
    addToBookmark,
    addWordRepository, deleteWordRepository, getBookmarkListRepository, getWordRepository, removeFromBookmarkRepository,
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
    Promise<Word> => {
    try {

        const response = await updateWordRepository(word);
        return response;


    } catch (error) {

    }
};
export const deleteWordService = async (id: number):
    Promise<void> => {
    try {
        await deleteWordRepository(id);
    } catch (error) {

    }
};
export const getWordService = async (id: number):
    Promise<Word> => {
    try {
        const result: Word = await getWordRepository(id);
        return result;
    } catch (error) {

    }
};
export const addWordToBookMarkService = async (id: number):
    Promise<Word> => {
    try {

        const response = await addToBookmark(id);
        return response;

    } catch (error) {

    }
};
export const removeWordFromBookmarkService = async (id: number):
    Promise<Word> => {
    try {

        const response = await removeFromBookmarkRepository(id);
        return response;

    } catch (error) {

    }
};
export const getBookmarkListService = async ():
    Promise<Word[]> => {
    try {

        const response = await getBookmarkListRepository();
        return response;

    } catch (error) {

    }
};
