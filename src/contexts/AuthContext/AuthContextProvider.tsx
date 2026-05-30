import { useEffect, useState, type ReactNode, useCallback, startTransition } from 'react';
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

    const refreshUserData = useCallback(async () => {
        if (!userId) {
            setUserData(null);
            localStorage.removeItem('user_data');
            return;
        }

        const response = await getUserData(userId);
        if (response) {
            let finalAvatarUrl = "";
            if (response.avatar_url) {
                const { data: publicUrlData } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(response.avatar_url);
                finalAvatarUrl = publicUrlData.publicUrl;
            } else {
                const initials = response.name
                    ?.split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .toUpperCase() || response.username?.charAt(0).toUpperCase() || '?';
                finalAvatarUrl = initials;
            }

            const updatedUser = { ...response, avatar_url: finalAvatarUrl };
            setUserData(updatedUser);
            localStorage.setItem('user_data', JSON.stringify(updatedUser));
        }
    }, [userId]);

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
        startTransition(()=>{
            refreshUserData();
        })

        const onAvatarUpdated = (event: any) => {
            if (event.detail?.userId === userId) {
                refreshUserData();
            }
        };

        const onProfileUpdated = (event: any) => {
            if (event.detail?.userId === userId) {
                refreshUserData();
            }
        };

        window.addEventListener('avatarUpdated', onAvatarUpdated);
        window.addEventListener('profileUpdated', onProfileUpdated);
        return () => {
            window.removeEventListener('avatarUpdated', onAvatarUpdated);
            window.removeEventListener('profileUpdated', onProfileUpdated);
        };
    }, [userId, refreshUserData]);
    
    // console.log(session);

    return (
        <AuthContext.Provider value={{ session, userId, userData, loading, refreshUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
