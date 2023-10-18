import Config from "@/repository/config";
import {loginRepository} from "@/repository/AuthenticationRepository/loginRepository";
import {registerRepository} from "@/repository/AuthenticationRepository/registerRepository";

export const registerService = async (user: UserRegister | null,
                                      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                      setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {


    setIsLoading(true);
    setError(null);
    try {
        if (user != null) {
            const response = await registerRepository(user);


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


