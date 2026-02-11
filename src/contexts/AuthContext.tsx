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
  const [isDemoUser, setIsDemoUser] = useState(false);

  const refreshProfile = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      try {
        const userProfile = await getUserProfile(currentUser.id);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        
        if (!mounted) return;
        
        if (currentUser) {
          // User is authenticated
          setUser(currentUser);
          setIsDemoUser(false);
          
          try {
            const userProfile = await getUserProfile(currentUser.id);
            if (mounted) {
              setProfile(userProfile);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else {
          // No authenticated user - they will be set as demo user when accessing protected routes
          setIsDemoUser(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event, session?.user?.email);

      setUser(session?.user ?? null);
      
      if (session?.user) {
        setIsDemoUser(false);
        try {
          const userProfile = await getUserProfile(session.user.id);
          if (mounted) {
            setProfile(userProfile);
            console.log('Profile loaded:', userProfile);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        setProfile(null);
      }
      
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const setDemoUser = (isDemo: boolean) => {
    setIsDemoUser(isDemo);
    if (isDemo) {
      setUser(null);
      setProfile(null);
    }
    // Always set loading to false when setting demo user
    setLoading(false);
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
