import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext';
import { type User } from '../../types/UserData';
import { getUserData } from '../../services/authService';



export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User | null>(null);
    const userId = session?.user?.id ?? null;

    useEffect(() => {
        const initializeAuth = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        };

        initializeAuth();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);
// 
    useEffect(() => {
        const handleUserData = async () => {
            if (!userId) {
                setUserData(null);
                return;
            }

            const response = await getUserData(userId);
            setUserData(response as User);
        };

        handleUserData();
    }, [userId]);
    
    // console.log(session);

    return (
        <AuthContext.Provider value={{ session, userId, userData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
