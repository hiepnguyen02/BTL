import {loginRepository} from "@/repository/AuthenticationRepository/loginRepository";
import Config from "@/repository/config";
import {translateRepository} from "@/repository/TranslateRepository/translateRepository";
import {EventKey} from "@restart/ui/types";


export const translateService = async (content: string | null,
                                       from: EventKey,
                                       to: EventKey,
                                       setResult: React.Dispatch<React.SetStateAction<[]>>,
                                       setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                       setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
        if (content != null && content != "") {
            const response = await translateRepository(content, from, to);
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
