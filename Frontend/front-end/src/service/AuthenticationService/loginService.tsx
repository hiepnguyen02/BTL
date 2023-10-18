import Config from "@/repository/config";
import {loginRepository} from "@/repository/AuthenticationRepository/loginRepository";

export const loginService = async (user: UserLogin | null,
                                   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                   setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
        if (user != null) {
            const response = await loginRepository(user);


            if (response.token) {
                await localStorage.setItem(Config.JWT_COOKIE_NAME, response.token);
                setIsLoading(false);
            }
        } else {
            setError("Thong tin dang nhap khong hop le");
        }


    } catch (error) {
        throw new Error('An error occurred during login');
    }
};


