'use client';

import { supabase } from '@/lib/supabase-client';
import { type Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    fetchSession();

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
};

export default useSession;
