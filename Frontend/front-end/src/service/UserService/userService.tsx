import {getUserRepository} from "@/repository/UserRepository/userRepository";

export const getUserByTokenService = async ():
    Promise<UserRegister | undefined> => {
    try {

        const response = await getUserRepository();
        return response || undefined;


    } catch (error) {

    }
};
