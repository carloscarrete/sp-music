import { isAxiosError } from "axios"
import webPlayerApi from "../../api/webPlayerApi"
import { User } from "../../entities/domain/auth"
import { AuthResponse } from "../../interfaces/auth.interface"


const returnUserToken = (data: AuthResponse) => {
    const user: User = {
        email: data.data.user.email,
        name: data.data.user.name,
        role: data.data.user.role
    }

    return {
        token: data.data.token,
        user
    }
}

export const authRegister = async (fullName: string, email: string, password: string) => {
    email = email.toLowerCase()
    try {
        const { data } = await webPlayerApi.post('/auth/register', { name: fullName, email, password });
        return returnUserToken(data)
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }
    }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase()
    try {
        const { data } = await webPlayerApi.post('/auth/login', { email, password });
        return returnUserToken(data)
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }
    }
}

export const authRefreshToken = async () => {
    try {
        const { data } = await webPlayerApi.get<AuthResponse>('/auth/renew');
        return returnUserToken(data)
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }
    }
}