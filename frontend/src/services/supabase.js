import { createClient } from '@supabase/supabase-js';
import { getSettings, getCachedJobs, saveCachedJobs } from './storage';

let supabaseClient = null;
let currentConfig = { url: '', key: '' };

export const getSupabaseClient = () => {
  const settings = getSettings();
  const url = settings.supabaseUrl?.trim();
  const key = settings.supabaseAnonKey?.trim();

  if (!url || !key) {
    supabaseClient = null;
    return null;
  }

  if (supabaseClient && currentConfig.url === url && currentConfig.key === key) {
    return supabaseClient;
  }

  try {
    supabaseClient = createClient(url, key, {
      auth: { persistSession: false }
    });
    currentConfig = { url, key };
    return supabaseClient;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    supabaseClient = null;
    return null;
  }
};

export const testSupabaseConnection = async (url, key) => {
  if (!url || !key) {
    return { success: false, message: 'URL and Anon Key are required.' };
  }

  try {
    const client = createClient(url.trim(), key.trim(), {
      auth: { persistSession: false }
    });
    const { count, error } = await client
      .from('jobs')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return { success: false, message: error.message };
    }

    return {
      success: true,
      message: `Connected successfully! Table 'jobs' reachable (${count ?? 0} existing records).`
    };
  } catch (err) {
    return { success: false, message: err.message || 'Network request failed' };
  }
};

export const fetchJobsFromDatabase = async (profileId = null) => {
  const client = getSupabaseClient();

  if (!client) {
    console.info('Supabase not configured. Using cached / mock jobs.');
    const cached = getCachedJobs();
    return {
      jobs: profileId ? cached.filter(j => !j.profile_id || j.profile_id === profileId) : cached,
      isLive: false,
      message: 'Displaying demo / cached jobs. Configure Supabase in Settings to sync live data.'
    };
  }

  try {
    let query = client
      .from('jobs')
      .select('*')
      .order('match_score', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase query error, falling back to cache:', error.message);
      const cached = getCachedJobs();
      return {
        jobs: profileId ? cached.filter(j => !j.profile_id || j.profile_id === profileId) : cached,
        isLive: false,
        error: error.message,
        message: `Database error: ${error.message}. Showing local cache.`
      };
    }

    // Format & normalize rows from Supabase
    const normalized = (data || []).map(row => {
      let reasoningObj = {};
      if (row.reasoning) {
        if (typeof row.reasoning === 'object') {
          reasoningObj = row.reasoning;
        } else if (typeof row.reasoning === 'string') {
          try {
            reasoningObj = JSON.parse(row.reasoning);
          } catch {
            reasoningObj = { summary: row.reasoning };
          }
        }
      }

      return {
        hash_id: row.hash_id || String(row.id || Math.random()),
        company: row.company || 'Unknown Company',
        title: row.title || 'Job Listing',
        location: row.location || 'Remote',
        job_url: row.job_url || '#',
        description: row.description || '',
        match_score: Number(row.match_score) || 0,
        source: row.source || 'Scraped Listing',
        created_at: row.created_at || new Date().toISOString(),
        profile_id: row.profile_id || null,
        summary: row.summary || reasoningObj.summary || 'Job fit evaluated by AI.',
        pros: Array.isArray(row.pros) ? row.pros : (reasoningObj.pros || []),
        cons: Array.isArray(row.cons) ? row.cons : (reasoningObj.cons || []),
        missing_keywords: Array.isArray(row.missing_keywords) 
          ? row.missing_keywords 
          : (reasoningObj.missing_keywords || [])
      };
    });

    if (normalized.length > 0) {
      saveCachedJobs(normalized);
    }

    const filtered = profileId 
      ? normalized.filter(j => !j.profile_id || j.profile_id === profileId)
      : normalized;

    return {
      jobs: filtered,
      isLive: true,
      message: `Synced ${filtered.length} jobs directly from Supabase 'jobs' table.`
    };
  } catch (err) {
    console.error('Unexpected Supabase error:', err);
    const cached = getCachedJobs();
    return {
      jobs: cached,
      isLive: false,
      error: err.message,
      message: 'Failed to reach Supabase. Displaying local cache.'
    };
  }
};
