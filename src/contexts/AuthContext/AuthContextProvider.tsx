import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext';
import { type User } from '../../types/UserData';
import { getUserData } from '../../services/authService';



export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(() => {
        const savedSession = localStorage.getItem('auth_session');
        return savedSession ? JSON.parse(savedSession) : null;
    });
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User | null>(() => {
        const savedUserData = localStorage.getItem('user_data');
        return savedUserData ? JSON.parse(savedUserData) : null;
    });
    const userId = session?.user?.id ?? null;

    useEffect(() => {
        const initializeAuth = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            if (data.session) {
                localStorage.setItem('auth_session', JSON.stringify(data.session));
            }
            setLoading(false);
        };

        initializeAuth();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                localStorage.setItem('auth_session', JSON.stringify(session));
            } else {
                localStorage.removeItem('auth_session');
            }
            setLoading(false);
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);
// 
    useEffect(() => {
        if (session) {
            localStorage.setItem('auth_session', JSON.stringify(session));
        }
    }, [session]);

    useEffect(() => {
        const handleUserData = async () => {
            if (!userId) {
                setUserData(null);
                localStorage.removeItem('user_data');
                return;
            }

            const response = await getUserData(userId);
            setUserData(response as User);
            localStorage.setItem('user_data', JSON.stringify(response));
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
