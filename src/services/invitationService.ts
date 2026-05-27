import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { type MatchData } from "../types/MatchData";

export const createInbox = (userId: string, onNewNotification?: (text: MatchData) => void) => {
    const channel = supabase.channel(`inbox-${userId}`)
    channel.on(
        'postgres_changes',
        {
            event: 'INSERT', 
            schema: 'public', 
            table: 'matches',
            filter: `player2_id=eq.${userId}`
        },
        (payload) => {
            const matchDetails: MatchData = payload.new as MatchData;
            onNewNotification?.(matchDetails);
        }
    ).subscribe();

    return channel;
}

export const removeInbox = (channel: RealtimeChannel) => {
    supabase.removeChannel(channel);
}

export const acceptInvitation = async (matchId: string) => {
    const { data: currentMatch } = await supabase.from('matches').select('status').eq('id', matchId).single();
    
    if (currentMatch && currentMatch.status !== 'pending') {
        return { success: false, status: currentMatch.status };
    }

    const { error } = await supabase.from('matches').update({status: 'accepted'}).eq('id', matchId);
    return { success: !error, status: 'accepted' };
}

export const declineInvitation = async (matchId: string) => {
    await supabase.from('matches').update({status: 'declined'}).eq('id', matchId);
}

export const checkMatchInvitations = async (userId: string, payload: (matches: any) => void) => {
    const response = await supabase.from('matches').select().eq('player2_id', userId).eq('status', 'pending');
    // console.log(response.data);
    payload(response.data);
}