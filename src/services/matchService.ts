import { supabase } from "../lib/supabase";
import type { MatchData } from "../types/MatchData";

export const getMatch = async (matchId: string) => {
    const details = await supabase.from('matches').select().eq('id', matchId).single();
    const match: MatchData = details.data;
    return match;
}

export const startMatch = async (matchId: string) => {
    await supabase.from('matches').update({status: 'in_progress'}).eq('id', matchId);
}