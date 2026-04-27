import { supabase } from '../lib/supabase';
import type { SignUpPayload, SignInPayload, InsertUserPayload, ServiceError } from '../types/AuthServices'
import type { User } from '../types/UserData';


// 3. Add a helper hook to use this context easily



export const insertUserProfile = async ({
  id,
  name,
  username,
  email,
  codeforcesHandle,
}: InsertUserPayload) => {
  return supabase.from('users').insert({
    id,
    name,
    username,
    email,
    codeforces_handle: codeforcesHandle,
  });
};

export const signUp = async ({ email, password }: SignUpPayload) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://feek-nafas.vercel.app/home',

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
  const {data} = await supabase.from('users').select().eq('id', userId).single();
  return data as User;
}
