import {getUserRepository, wordSearchUserRepository} from "@/repository/UserRepository/userRepository";
import {wordSearchRepository} from "@/repository/WordRepository/wordRepository";
import {Word} from "@/types/word/Word";

export const getUserByTokenService = async ():
    Promise<UserRegister | undefined> => {
    try {

        const response = await getUserRepository();
        return response || undefined;


    } catch (error) {

    }
};
export const searchWordUserService = async (prefix: string | null,
                                            setResult: React.Dispatch<React.SetStateAction<Word[]>>,
                                            setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                            setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
        if (prefix != null && prefix != "") {
          
            const response = await wordSearchUserRepository(prefix);

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
