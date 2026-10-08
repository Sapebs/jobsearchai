import { INITIAL_PROFILES, MOCK_JOBS } from '../data/mockJobs';

const SETTINGS_KEY = 'jobsearchai_settings';
const PROFILES_KEY = 'jobsearchai_profiles';
const ACTIVE_PROFILE_KEY = 'jobsearchai_active_profile';
const LOCAL_JOBS_KEY = 'jobsearchai_cached_jobs';

export const getSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    n8nWebhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || '',
    useMockFallback: true
  };
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
};

export const getProfiles = () => {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const hasStephen = parsed.some((p) => p.id === 'stephen');
        if (!hasStephen) {
          saveProfiles(INITIAL_PROFILES);
          return INITIAL_PROFILES;
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load profiles:', e);
  }
  return INITIAL_PROFILES;
};

export const saveProfiles = (profiles) => {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.error('Failed to save profiles:', e);
  }
};

export const getActiveProfileId = () => {
  try {
    const active = localStorage.getItem(ACTIVE_PROFILE_KEY);
    if (active && (active === 'aridon' || active === 'stephen')) return active;
  } catch (e) {
    console.error('Failed to get active profile:', e);
  }
  return 'aridon';
};

export const setActiveProfileId = (profileId) => {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
  } catch (e) {
    console.error('Failed to save active profile:', e);
  }
};

export const getCachedJobs = () => {
  try {
    const raw = localStorage.getItem(LOCAL_JOBS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const hasStephen = parsed.some((j) => j.profile_id === 'stephen');
        if (!hasStephen) {
          saveCachedJobs(MOCK_JOBS);
          return MOCK_JOBS;
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to get cached jobs:', e);
  }
  return MOCK_JOBS;
};

export const saveCachedJobs = (jobs) => {
  try {
    localStorage.setItem(LOCAL_JOBS_KEY, JSON.stringify(jobs));
  } catch (e) {
    console.error('Failed to save cached jobs:', e);
  }
};
