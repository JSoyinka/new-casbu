import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, userData: any) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    // Handle rate limit error with user-friendly message
    if (authError.status === 429 || authError.message?.includes('rate_limit')) {
      throw new Error('Too many signup attempts. Please wait a few minutes and try again.');
    }
    throw new Error(authError.message || 'Signup failed. Please try again.');
  }
  if (!authData.user) throw new Error('No user returned from signup');

  // Wait a moment for auth to fully process
  await new Promise(resolve => setTimeout(resolve, 500));

  // Create user profile with proper auth_id
  const { data: profileData, error: profileError } = await supabase
    .from('users')
    .insert({
      auth_id: authData.user.id,
      email: userData.email,
      full_name: userData.full_name,
      date_of_birth: userData.date_of_birth,
      category: userData.category,
      bio: userData.bio,
      is_creator: userData.is_creator || false,
      host_type: userData.host_type,
      assistant_persona: userData.assistant_persona,
      engagement_level: userData.engagement_level,
    })
    .select()
    .single();

  if (profileError) {
    // If profile creation fails, clean up the auth user
    await supabase.auth.admin.deleteUser(authData.user.id).catch(() => {});
    throw new Error(`Profile creation error: ${JSON.stringify(profileError)}`);
  }

  return { ...authData, profile: profileData };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getUserProfile = async (authId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authId)
    .maybeSingle();

  if (error) throw error;
  return data;
};
