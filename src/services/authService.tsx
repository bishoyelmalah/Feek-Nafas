import { useContext, useEffect, useState, createContext, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import type {SignUpPayload , SignInPayload , InsertUserPayload , ServiceError} from '../types/AuthServices'

type AuthContextType = {
    session: Session | null;
    userId: string | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create an async function to handle the initial fetch
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    initializeAuth();

    // The listener is fine as-is because it uses a callback
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false); // Ensure loading is false when state changes
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const userId = session?.user?.id ?? null;

  return (
    <AuthContext.Provider value={{ session, userId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Add a helper hook to use this context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
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

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { error: { message: error.message } as ServiceError };
    }
    return { error: null };
};
