import { supabase } from "../lib/supabase";

export const CreateMatchServices = async (
  currentUserId : string,
  opponentUsername : string,
  contestId: string,
  problemIndex: string,
) => {
  const {data : opponent, error: userError} = await supabase
  .from ("users")
  .select("id")
  .eq("username",opponentUsername)
  .single();
  if(userError || !opponent){
    throw new Error("User not found")
  }
  if(opponent.id === currentUserId){
    throw new Error("You can't invite yourself");
  } 
  const {data, error} = await supabase
  .from ("matches")
  .insert([
    {
      player1_id: currentUserId,
      player2_id: opponent.id,
      status: "pending",
      contest_id: contestId,
      problem_index: problemIndex
    }
  ])
  .select()
  .single()
  if(error) throw error ;
return data;
}

