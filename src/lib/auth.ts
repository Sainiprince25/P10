import { supabase, isSupabaseConfigured } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
}

export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string; user?: AuthUser }> {
  if (!isSupabaseConfigured) {
    // Fallback to demo mode
    if (email === 'admin@psserviceprovider.com' && password === 'admin123') {
      return { success: true, user: { id: 'demo-admin', email } };
    }
    return { success: false, error: 'Invalid credentials' };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user) {
    return {
      success: true,
      user: { id: data.user.id, email: data.user.email || email },
    };
  }

  return { success: false, error: 'Login failed' };
}

export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured) return;
  await supabase.auth.signOut();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    return { id: user.id, email: user.email || '' };
  }
  return null;
}

export async function onAuthStateChange(callback: (user: AuthUser | null) => void): Promise<() => void> {
  if (!isSupabaseConfigured) {
    return () => {};
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      callback({ id: session.user.id, email: session.user.email || '' });
    } else {
      callback(null);
    }
  });

  return () => subscription.unsubscribe();
}
