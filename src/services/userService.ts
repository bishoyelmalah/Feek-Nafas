import { supabase } from "../lib/supabase"

export const getUserHandle = async (id: string) => {
    const {data} = await supabase.from('users').select().eq('id', id).single();
    const handle = data.codeforces_handle;
    return handle;
}

export const getTopUsers = async (limit: number = 5) => {
    const { data, error } = await supabase
        .from('users')
        .select('id, username, codeforces_handle, score')
        .order('score', { ascending: false })
        .limit(limit);
    
    if (error) {
        console.error('Error fetching top users:', error);
        return [];
    }
    
    return data || [];
}

export const getUserRank = async (userId: string) => {
    // Get current user's data
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('score, username, codeforces_handle')
        .eq('id', userId)
        .single();
    
    if (userError) {
        console.error('Error fetching user data:', userError);
        return null;
    }
    
    // Count how many users have higher score
    const { count } = await supabase
        .from('users')
        .select('id', { count: 'exact', head: true })
        .gt('score', userData.score);
    
    return {
        rank: (count || 0) + 1,
        username: userData.username,
        score: userData.score,
        codeforces_handle: userData.codeforces_handle,
        userId: userId
    };
}

export const updateUserScore = async (userId: string, scoreChange: number) => {
    // Get current user's score
    const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('score')
        .eq('id', userId)
        .single();
    
    if (fetchError) throw fetchError;
    
    const newScore = (userData.score || 0) + scoreChange;
    
    // Update user's score in the database
    const { error: updateError } = await supabase
        .from('users')
        .update({ score: newScore })
        .eq('id', userId);
    
    if (updateError) throw updateError;
}