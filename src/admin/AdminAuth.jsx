import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

/**
 * Internal: turn a username into the synthetic email Supabase Auth uses
 * under the hood. The user never sees this; the UI only takes 'username'.
 */
const USERNAME_DOMAIN = 'digital-roofers.admin';
export const usernameToEmail = (username) =>
  `${String(username).trim().toLowerCase()}@${USERNAME_DOMAIN}`;

const AdminAuthContext = createContext({
  session: null,
  profile: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUpFirstAdmin: async () => ({ error: null }),
  signOut: async () => {},
});

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null);
    });
    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    let cancelled = false;
    supabase
      .from('profiles')
      .select('id, username, full_name, is_super_admin')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('[admin] profile fetch failed', error);
          setProfile(null);
        } else {
          setProfile(data);
        }
      });
    return () => { cancelled = true; };
  }, [session]);

  const signIn = async ({ username, password }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    });
    return { error };
  };

  /**
   * One-shot: create the first super-admin account. Calls Supabase signUp
   * with the synthetic email, then promotes the new profile via the
   * claim_first_super_admin RPC.
   */
  const signUpFirstAdmin = async ({ username, password, fullName }) => {
    const email = usernameToEmail(username);
    const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, full_name: fullName },
      },
    });
    if (signUpErr) return { error: signUpErr };

    // If email confirmation is off, the user is auto-signed-in. If on, we
    // get a user but no session — surface a friendly hint.
    if (!signUpData.session) {
      return {
        error: {
          message: 'Account created but not signed in. Make sure "Confirm email" is OFF in Supabase Auth → Providers → Email, then try Sign in.',
        },
      };
    }

    // Promote to super-admin (works because we now have a session).
    const { data: claimed, error: claimErr } = await supabase.rpc(
      'claim_first_super_admin',
      { p_username: username.trim().toLowerCase(), p_full_name: fullName }
    );
    if (claimErr) return { error: claimErr };
    if (!claimed) {
      return {
        error: {
          message: 'A super-admin already exists. Sign in instead.',
        },
      };
    }
    return { error: null };
  };

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <AdminAuthContext.Provider value={{ session, profile, loading, signIn, signUpFirstAdmin, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
