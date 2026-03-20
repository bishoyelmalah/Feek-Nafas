// import { supabase } from "../lib/supabase";
// import { getProblemByRatingOrTopic } from "./codeforcesService";

// export const createMatch = async (matchId: string) => {
//     const problem = await getProblemByRatingOrTopic({rating: 800});
//     console.log(problem);
//     await supabase.from('matches').update({contest_id: problem?.contestId, problem_index: problem?.index}).eq('id', matchId);
// }