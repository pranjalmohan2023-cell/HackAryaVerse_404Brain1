import { useState, useEffect } from 'react';
import { supabase } from '/src/lib/supabase';
import { AuthScreen } from './components/AuthScreen';
import { MainApp } from './components/MainApp';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Session error:', err);
        // If there's a network error, just continue without auth
        setLoading(false);
        setError(null); // Don't show error, just allow unauthenticated access
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
    } catch (err) {
      console.error('Sign out error:', err);
      // Force sign out locally even if network fails
      setSession(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <AuthScreen onAuthSuccess={(session) => setSession(session)} />;
  }

  return <MainApp session={session} onSignOut={handleSignOut} />;
}