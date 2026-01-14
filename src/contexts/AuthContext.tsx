import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, getCurrentUser, getUserProfile } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  auth_id: string;
  email: string;
  full_name: string;
  date_of_birth?: string;
  category?: string;
  bio?: string;
  is_creator: boolean;
  host_type?: string;
  assistant_persona?: string;
  engagement_level?: string;
  profile_image_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isDemoUser: boolean;
  setDemoUser: (isDemo: boolean) => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(true);

  const refreshProfile = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      const userProfile = await getUserProfile(currentUser.id);
      setProfile(userProfile);
    }
  };

  useEffect(() => {
    // Check active sessions
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsDemoUser(false);
        getUserProfile(currentUser.id).then((userProfile) => {
          setProfile(userProfile);
          setLoading(false);
        }).catch(() => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsDemoUser(false);
        try {
          const userProfile = await getUserProfile(session.user.id);
          setProfile(userProfile);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setDemoUser = (isDemo: boolean) => {
    setIsDemoUser(isDemo);
    if (isDemo) {
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isDemoUser, setDemoUser, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
