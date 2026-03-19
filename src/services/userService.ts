import { supabase } from "../lib/supabase"

export const getUserHandle = async (id: string) => {
    const {data} = await supabase.from('users').select().eq('id', id).single();
    const handle = data.codeforces_handle;
    return handle;
}