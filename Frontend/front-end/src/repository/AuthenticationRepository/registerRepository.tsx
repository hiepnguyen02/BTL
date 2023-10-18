import Config from "@/repository/config";

export const registerRepository = async (user: UserRegister): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${Config.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data: LoginResponse = await response.json();
        return data;


    } catch (error) {
        throw new Error('An error occurred during login');
    }
};
