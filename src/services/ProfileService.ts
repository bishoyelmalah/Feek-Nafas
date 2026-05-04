import { supabase } from '../lib/supabase';

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  codeforces_handle: string;
  score: number;
  rank: number;
  totalMatches: number;
  wins: number;
};

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id, username, email, codeforces_handle, score')
    .eq('id', userId)
    .single();

  if (userError || !user) {
    throw new Error('User not found');
  }

  const { data: matchesAsPlayer1 } = await supabase
    .from('matches')
    .select('status, winner_user_id')
    .eq('player1_id', userId);

  const { data: matchesAsPlayer2 } = await supabase
    .from('matches')
    .select('status, winner_user_id')
    .eq('player2_id', userId);

  const allMatches = [...(matchesAsPlayer1 || []), ...(matchesAsPlayer2 || [])];
  const finishedMatches = allMatches.filter(m => m.status === 'finished');
  const totalMatches = finishedMatches.length;
  const wins = finishedMatches.filter(m => m.winner_user_id === userId).length;

  const { data: allUsers } = await supabase
    .from('users')
    .select('id, score')
    .order('score', { ascending: false });

  const rankIndex = allUsers?.findIndex(u => u.id === userId) ?? -1;
  const rank = rankIndex !== -1 ? rankIndex + 1 : 0;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    codeforces_handle: user.codeforces_handle,
    score: user.score || 0,
    rank,
    totalMatches,
    wins,
  };
};