import Config from "@/repository/config";
import config from "@/repository/config";
import {useState} from "react";

export const getUserRepository = async (): Promise<UserRegister | null> => {
    try {
        const token = localStorage.getItem(config.JWT_COOKIE_NAME);
        const response = await fetch(`${Config.API_URL}/user/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const user = await response.json();
        const result: UserRegister = {email: null, firstName: null, lastName: null, password: null};
        result.email = user.email;
        result.firstName = user.firstName;
        result.lastName = user.lastName;
        return result;
    } catch (e) {

    }

}
