import {loginRepository} from "@/repository/AuthenticationRepository/loginRepository";
import Config from "@/repository/config";
import {wordSearchRepository} from "@/repository/WordRepository/wordRepository";

export const searchWordService = async (prefix: string | null,
                                        setResult: React.Dispatch<React.SetStateAction<EnglishWord[]>>,
                                        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                        setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
        if (prefix != null && prefix != "") {
            const response = await wordSearchRepository(prefix);

            setResult(response);
            console.log(response.length);

        } else {
            setError("Thong tin dang nhap khong hop le");
        }


    } catch (error) {
        throw new Error('An error occurred during login');
    }
};
