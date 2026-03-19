import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext';



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

    // console.log(session);
    const userId = session?.user?.id ?? null;

    return (
        <AuthContext.Provider value={{ session, userId, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
