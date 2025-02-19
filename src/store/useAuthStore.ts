import { create } from "zustand";
import { User } from "../entities/domain/auth";
import { AuthStatus } from "../interfaces/auth.status";
import { authLogin, authRefreshToken, authRegister } from "../actions/webplayer/auth";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    /*  
     logout: () => Promise<void>; */
    register: (fullName: string, email: string, password: string) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    refreshToken: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    token: undefined,
    user: undefined,
    status: 'checking',

    register: async (fullName: string, email: string, password: string) => {
        const res = await authRegister(fullName, email, password);
        if (!res) {
            set({
                status: 'not-authenticated',
                token: undefined,
                user: undefined
            })
            return false;
        }

        localStorage.setItem('token', res.token);
        set({
            status: 'authenticated',
            token: res.token,
            user: res.user
        })

        return true;
    },
    login: async(email: string, password: string) => {
        const res = await authLogin(email, password);
        if(!res){
            set({
                status: 'not-authenticated',
                token: undefined,
                user: undefined
            })
            return false;
        }
        localStorage.setItem('token', res.token);
        set({
            status: 'authenticated',
            token: res.token,
            user: res.user
        })
        return true
    },
    refreshToken: async () => {
        const res = await authRefreshToken();
        if (!res) {
            set({
                status: 'not-authenticated',
                token: undefined,
                user: undefined
            })
            return false;
        }
        localStorage.setItem('token', res.token);
        set({
            status: 'authenticated',
            token: res.token,
            user: res.user
        })
        return true
    }
}))