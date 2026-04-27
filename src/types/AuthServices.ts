import type { Session } from '@supabase/supabase-js';
import type { User } from './UserData';

export type SignUpPayload = {
    email: string;
    password: string;
};

export type SignInPayload = {
    email: string;
    password: string;
};

export type InsertUserPayload = {
    id: string;
    name: string;
    username: string;
    email: string;
    codeforcesHandle: string;
};

export type ServiceError = {
    message: string;
};
export type AuthContextType = {
    session: Session | null;
    userId: string | null;
    userData: User | null,
    loading: boolean;
};