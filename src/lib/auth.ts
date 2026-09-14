import { supabase, isSupabaseConfigured } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
}

// Demo mode is ONLY allowed in development (when Supabase is not configured)
// In production, Supabase Auth MUST be used
const isDevelopment = import.meta.env.DEV;
const demoModeEnabled = !isSupabaseConfigured && isDevelopment;

if (!isSupabaseConfigured && !isDevelopment) {
  console.error(
    'CRITICAL: Supabase is not configured in production. Admin authentication will not work. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string; user?: AuthUser }> {
  // Demo mode - ONLY for local development without Supabase
  if (demoModeEnabled) {
    console.warn('Using demo authentication. This should NOT be used in production.');
    if (email === 'admin@psserviceprovider.com' && password === 'admin123') {
      return { success: true, user: { id: 'demo-admin', email } };
    }
    return { success: false, error: 'Invalid credentials' };
  }

  // Production mode - use Supabase Auth
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Authentication system not configured. Please contact the administrator.' };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Don't expose detailed error messages to users
    if (error.message === 'Invalid login credentials') {
      return { success: false, error: 'Invalid email or password' };
    }
    if (error.message === 'Email not confirmed') {
      return { success: false, error: 'Please verify your email address before logging in' };
    }
    return { success: false, error: 'Login failed. Please try again.' };
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
  if (!isSupabaseConfigured) {
    // In demo mode, check localStorage for session
    if (demoModeEnabled) {
      try {
        const auth = localStorage.getItem('ps_admin_auth');
        if (auth === 'true') {
          return { id: 'demo-admin', email: 'admin@psserviceprovider.com' };
        }
      } catch (e) { /* ignore */ }
    }
    return null;
  }

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
