import { supabase } from '../lib/supabase';
import { type User } from '../types/UserData';

export const resolveUserAvatar = (user: User | null): string => {
  if (!user) return '?';

  if (user.avatar_url && user.avatar_url.startsWith('http')) {
    return user.avatar_url;
  }

  // If it's a file path (doesn't start with http and isn't empty), get public URL
  // Note: This sync version only works if we've already resolved it or if we don't need async storage call.
  // Actually, we should probably have an async version too.
  return user.avatar_url || (user.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || user.username?.charAt(0).toUpperCase() || '?');
};

export const getPublicAvatarUrl = (path: string | null): string | null => {
    if (!path || path.startsWith('http')) return path;
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return data.publicUrl;
}

export const getAvatarUrl = async (userId: string): Promise<string> => {
  // If this is the currently signed-in user, check auth metadata first (falls back to DB)
  try {
    const { data: current } = await supabase.auth.getUser();
    const currentUser = current?.user ?? null;
    if (currentUser && currentUser.id === userId) {
      const metaUrl = (currentUser.user_metadata as any)?.avatar_url;
      if (metaUrl) return metaUrl as string;
    }
  } catch (e) {
    console.error(e);
  }

  const { data: user } = await supabase
    .from('users')
    .select('codeforces_handle, username, avatar_url')
    .eq('id', userId)
    .single();

  const nameForAvatar = encodeURIComponent(user?.username || user?.codeforces_handle || 'User');

  const fallbackUrl = `https://ui-avatars.com/api/?name=${nameForAvatar}&background=ec5b13&color=fff&bold=true&size=80&length=1`;

  if (user?.avatar_url) {
    return user.avatar_url;
  }
  

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
