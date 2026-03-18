import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { type User } from "../types/UserData";

export const getOpponentDetails = async (id: string) => {
    const response = await supabase.from('users').select().eq('id', id);

    const opponentDetails = response.data?.[0];

    // console.log(opponentDetails);
    
    if (opponentDetails) return opponentDetails as User;
}