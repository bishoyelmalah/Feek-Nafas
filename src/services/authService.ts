import { useContext , useEffect , useState , createContext, Children} from 'react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';


type AuthContextType = {
    session: Session | null;
    loading: boolean;   
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

import type { ReactNode } from 'react';

export const AuthContextProvider = ({ children: _children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

}

type SignUpPayload = {
    email: string;
    password: string;
};

type SignInPayload = {
    email: string;
    password: string;
};

type InsertUserPayload = {
    id: string;
    name: string;
    username: string;
    email: string;
    codeforcesHandle: string;
};

type ServiceError = {
    message: string;
};

export const insertUserProfile = async ({
    id,
    name,
    username,
    email,
    codeforcesHandle,
}: InsertUserPayload) => {
    return supabase.from('users').insert({
        id,
        name,
        username,
        email,
        codeforces_handle: codeforcesHandle,
    });
};

export const signUp = async ({ email, password }: SignUpPayload) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: 'https://feek-nafas.vercel.app/home',

        },
    });

    if (error) {
        return { error: { message: error.message } as ServiceError, userId: null };
    }

    const userId = data.user?.id;
    if (!userId) {
        return { error: { message: 'USER_ID_NOT_FOUND_AFTER_SIGNUP' } as ServiceError, userId: null };
    }

    return { error: null, userId };

};


export const signIn = async ({ email, password }: SignInPayload) => {
    return supabase.auth.signInWithPassword({
        email,
        password,
    });
};


