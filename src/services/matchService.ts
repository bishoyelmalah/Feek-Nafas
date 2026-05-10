import { supabase } from "../lib/supabase";
import type { MatchData } from "../types/MatchData";
import { type CreateMatchData } from "../types/CreateMatchData";
import type { ChatMessage } from "../types/ChatMessage";

export const createMatch = async ({player1_id, player2_id, contest_id, problem_index, duration}: CreateMatchData) => {
    const {data, error} = await supabase
    .from ("matches")
    .insert([
        {
        player1_id,
        player2_id,
        status: "pending",
        contest_id,
        problem_index,
        duration
        }
    ])
    .select()
    .single()
    if(error) throw error ;
    return data;
}

export const getMatch = async (matchId: string) => {
    const details = await supabase.from('matches').select().eq('id', matchId).single();
    const match: MatchData = details.data;
    return match;
}

export const startMatch = async (matchId: string) => {
    await supabase
        .from('matches')
        .update({status: 'in_progress'})
        .eq('id', matchId)
        .eq('status', 'accepted');
}

export const finishMatch = async (matchId: string, winnerId: string) => {
    const timeNow = new Date();
    await supabase.from('matches').update({status: 'finished', winner_user_id: winnerId, finished_at: timeNow}).eq('id', matchId);
}

export const createSubmissionChannel = (name: string, callback: () => void) => {
    const channel = supabase.channel(name);
    channel.on(
        'broadcast',
        {event: 'shout'},
        () => {
            callback();
        }
    ).subscribe()
    return channel;
}

export const getStartTime = async (matchId: string) => {
    const { data } = await supabase
        .from('matches')
        .select('updated_at')
        .eq('id', matchId)
        .single();

    return data?.updated_at ?? undefined;
}

export const getMatchDuration = async (matchId: string) => {
    const { data } = await supabase
        .from('matches')
        .select('duration')
        .eq('id', matchId)
        .single();

    return data?.duration ?? 30;
}

export const sendMessage = async (message: ChatMessage) => {
    const {data, error} = await supabase.from("messages").insert(message).select().single();
    if (error) throw error;
    return data;
}

export const getMessages = async (match_id: string) => {
    const {data, error} = await supabase.from("messages").select().eq("match_id", match_id);
    if (error) throw error;
    return data as ChatMessage[];
}