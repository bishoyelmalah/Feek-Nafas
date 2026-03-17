import { supabase } from "../lib/supabase";

export const CreateMatchServices = async (
  currentUserId : string,
  opponentUsername : string
) => {
  const {data : opponent, error: userError} = await supabase
  .from ("users")
  .select("id")
  .eq("username",opponentUsername)
  .single();
  if(userError || !opponent){
    throw new Error("User not found")
  }
  const {data, error} = await supabase
  .from ("matches")
  .insert([
    {
      player1_id: currentUserId,
      player2_id: opponent.id,
      status: "pending"
    }
  ])
  .select()
  .single()
  if(error) throw error ;
return data;
}

