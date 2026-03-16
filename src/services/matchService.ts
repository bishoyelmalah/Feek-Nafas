import { supabase } from "../lib/supabase";
import type { MatchData } from "../types/MatchData";

export const getMatch = async (matchId: string) => {
    const details = await supabase.from('matches').select().eq('id', matchId).single();
    const data = details.data;
    const {contest_id, problem_index} = data;
    const match: MatchData = {contest_id, problem_index};
    return match;
}