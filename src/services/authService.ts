import { supabase } from '../lib/supabase';
import type { SignInPayload, ServiceError } from '../types/AuthServices'
import type { User } from '../types/UserData';


// 3. Add a helper hook to use this context easily



// export const insertUserProfile = async ({
//   id,
//   name,
//   username,
//   email,
//   codeforcesHandle,
// }: InsertUserPayload) => {
//   return supabase.from('users').insert({
//     id,
//     name,
//     username,
//     email,
//     codeforces_handle: codeforcesHandle,
//   });
// };

export const signUp = async ({ email, password, name, username, codeforces_handle}: User & {password: string}) => {
  // Check for existing username
  const { data: existingUsername } = await supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .maybeSingle();

  if (existingUsername) {
    return { error: { message: 'Username is already taken' } as ServiceError, userId: null };
  }

  // Check for existing codeforces handle
  const { data: existingHandle } = await supabase
    .from('users')
    .select('codeforces_handle')
    .eq('codeforces_handle', codeforces_handle)
    .maybeSingle();

  if (existingHandle) {
    return { error: { message: 'Codeforces handle is already taken' } as ServiceError, userId: null };
  }

  // Check for existing email
  const { data: existingEmail } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  if (existingEmail) {
    return { error: { message: 'Email is already taken' } as ServiceError, userId: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://feek-nafas.vercel.app/home',
      data: {
        name,
        username,
        codeforces_handle
      }
    },
  });

  if (error) {
    return { error: { message: error.message } as ServiceError, userId: null };
  }

  const userId = data.user?.id;
  if (!userId) {
    return { error: { message: 'USER_ID_NOT_FOUND_AFTER_SIGNUP' } as ServiceError, userId: null };
  }

  return { error: null, userId };

};


export const signIn = async ({ email, password }: SignInPayload) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: { message: error.message } as ServiceError };
  }
  return { error: null };
};

export const getUserData = async (userId: string) => {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (userError || !user) {
    return null;
  }

  // Calculate matches and wins
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

  // Calculate rank
  const { data: allUsers } = await supabase
    .from('users')
    .select('id, score')
    .order('score', { ascending: false });

  const rankIndex = allUsers?.findIndex(u => u.id === userId) ?? -1;
  const rank = rankIndex !== -1 ? rankIndex + 1 : 0;

  return {
    ...user,
    rank,
    totalMatches,
    wins,
  } as User;
}

export const getUserDataByHandle = async (username: string) => {
  const {data, error} = await supabase.from('users').select().eq('username', username).single();
  if (error) throw error;
  return data as User;
}

export const updateUserProfile = async (
  userId: string,
  updates: Partial<{ name: string | null; username: string | null; email: string | null; codeforces_handle: string | null }>
) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select('id, name, username, email, codeforces_handle')
    .single();

  if (error) throw error;
  return data;
};
