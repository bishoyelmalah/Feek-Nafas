import { supabase } from "../lib/supabase";

export const getMatch = async () => {
    const match = await supabase.from('matches').select();
    console.log(match);
}