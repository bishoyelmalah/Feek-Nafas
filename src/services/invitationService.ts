import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { type MatchData } from "../types/MatchData";

export const createInbox = (userId: string, onNewNotification?: (text: MatchData) => void) => {
    const channel = supabase.channel(`inbox-${userId}`)
    channel.on(
        'postgres_changes',
        {
            event: '*', 
            schema: 'public', 
            table: 'matches',
            filter: `player2_id=eq.${userId}`
        },
        (payload) => {
            const matchDetails: MatchData = payload.new as MatchData;
            onNewNotification?.(matchDetails);
            // alert("you have a new match!");
            // console.log(matchDetails);
        }
    ).subscribe();

    return channel;
}

export const removeInbox = (channel: RealtimeChannel) => {
    supabase.removeChannel(channel);
}

export const acceptInvitation = (matchId: string) => {

}

export const declineInvitation = async (matchId: string) => {
    await supabase.from('matches').update({status: 'declined'}).eq('id', matchId);
}