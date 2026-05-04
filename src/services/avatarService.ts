import { supabase } from '../lib/supabase';

export const getAvatarUrl = async (userId: string): Promise<string> => {
  const { data: user } = await supabase
    .from('users')
    .select('codeforces_handle, username')
    .eq('id', userId)
    .single();

  const nameForAvatar = encodeURIComponent(user?.username || user?.codeforces_handle || 'User');

  const fallbackUrl = `https://ui-avatars.com/api/?name=${nameForAvatar}&background=ec5b13&color=fff&bold=true&size=80&length=1`;

  if (!user?.codeforces_handle) {
    return fallbackUrl;
  }

  try {
    const response = await fetch(
      `https://codeforces.com/api/user.info?handles=${user.codeforces_handle}`
    );
    const data = await response.json();
    
    const titlePhoto = data.status === 'OK' && data.result[0]?.titlePhoto;
    
    if (titlePhoto && !titlePhoto.includes('no-title.jpg')) {
      return `https:${titlePhoto}`;
    }
  } catch (error) {
    console.error('Failed to fetch avatar from Codeforces:', error);
  }

  return fallbackUrl;
};