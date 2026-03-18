import type { Session } from '@supabase/supabase-js';

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
    loading: boolean;
};