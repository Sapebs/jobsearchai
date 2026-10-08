import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { SearchHero } from './components/SearchHero';
import { StatsOverview } from './components/StatsOverview';
import { ControlsBar } from './components/ControlsBar';
import { JobCard } from './components/JobCard';
import { JobModal } from './components/JobModal';
import { SettingsModal } from './components/SettingsModal';
import { ProfileModal } from './components/ProfileModal';

import {
  getSettings,
  saveSettings,
  getProfiles,
  saveProfiles,
  getActiveProfileId,
  setActiveProfileId
} from './services/storage';
import { fetchJobsFromDatabase } from './services/supabase';
import { triggerJobHunter } from './services/n8n';

import './App.css';

export function App() {
  const [settings, setSettingsState] = useState(getSettings);
  const [profiles, setProfilesState] = useState(getProfiles);
  const [activeProfileId, setActiveProfileIdState] = useState(getActiveProfileId);

  const activeProfile = useMemo(() => {
    return profiles.find((p) => p.id === activeProfileId) || profiles[0];
  }, [profiles, activeProfileId]);

  const [searchQuery, setSearchQuery] = useState(activeProfile?.targetQuery || 'Full Stack Engineer Remote');
  const [location, setLocation] = useState(activeProfile?.targetLocation || 'Remote');

  const [jobs, setJobs] = useState([]);
  const [isLiveDb, setIsLiveDb] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dbNotice, setDbNotice] = useState('');

  const [isHunting, setIsHunting] = useState(false);
  const [huntStatus, setHuntStatus] = useState(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('score_desc');

  const [selectedJob, setSelectedJob] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfilesOpen, setIsProfilesOpen] = useState(false);

  // Load jobs on mount or when active candidate changes
  const loadJobs = async (profileId = activeProfileId) => {
    setIsRefreshing(true);
    try {
      const res = await fetchJobsFromDatabase(profileId);
      setJobs(res.jobs || []);
      setIsLiveDb(res.isLive);
      if (res.message) setDbNotice(res.message);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadJobs(activeProfileId);
  }, [activeProfileId]);

  // Handle switching active profile
  const handleSelectProfile = (id) => {
    setActiveProfileIdState(id);
    setActiveProfileId(id);
    const chosen = profiles.find((p) => p.id === id);
    if (chosen) {
      setSearchQuery(chosen.targetQuery || '');
      setLocation(chosen.targetLocation || 'Remote');
    }
  };

  // Handle saving profiles
  const handleUpdateProfiles = (newProfiles) => {
    setProfilesState(newProfiles);
    saveProfiles(newProfiles);
  };

  // Handle saving settings
  const handleSaveSettings = (newSettings) => {
    setSettingsState(newSettings);
    saveSettings(newSettings);
    // Reload database with new credentials
    loadJobs(activeProfileId);
  };

  // Handle running the workflow trigger
  const handleRunHunt = async () => {
    setIsHunting(true);
    setHuntStatus({ stage: 'starting', message: `Initializing job hunt for ${activeProfile.name}...` });

    try {
      const res = await triggerJobHunter({
        query: searchQuery,
        location: location,
        profile: activeProfile,
        onStatusUpdate: (st) => setHuntStatus(st)
      });

      if (res.success) {
        if (res.newJobs && res.newJobs.length > 0) {
          // Prepend newly discovered jobs immediately
          setJobs((prev) => {
            const updated = [...res.newJobs, ...prev];
            saveCachedJobs(updated);
            return updated;
          });
          setIsHunting(false);
          setHuntStatus({
            stage: 'completed',
            message: res.message || `Discovered ${res.newJobs.length} new scored listings for ${activeProfile.name}!`
          });
        } else {
          // If live webhook, refresh from Supabase after delay
          setTimeout(async () => {
            await loadJobs(activeProfileId);
            setIsHunting(false);
          }, 2000);
        }
      }
    } catch (err) {
      setHuntStatus({ stage: 'error', message: err.message || 'Trigger error occurred' });
      setIsHunting(false);
    }
  };

  // Filtered and Sorted Jobs
  const displayedJobs = useMemo(() => {
    let result = [...jobs];

    // Filter by Score Tier
    if (activeFilter === 'high') {
      result = result.filter((j) => (j.match_score || 0) >= 75);
    } else if (activeFilter === 'med') {
      result = result.filter((j) => (j.match_score || 0) >= 50 && (j.match_score || 0) < 75);
    } else if (activeFilter === 'low') {
      result = result.filter((j) => (j.match_score || 0) < 50);
    }

    // Filter by text search
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      result = result.filter(
        (j) =>
          (j.title && j.title.toLowerCase().includes(q)) ||
          (j.company && j.company.toLowerCase().includes(q)) ||
          (j.location && j.location.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'score_desc') return (b.match_score || 0) - (a.match_score || 0);
      if (sortBy === 'score_asc') return (a.match_score || 0) - (b.match_score || 0);
      if (sortBy === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      if (sortBy === 'company') return (a.company || '').localeCompare(b.company || '');
      return 0;
    });

    return result;
  }, [jobs, activeFilter, searchFilter, sortBy]);

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSelectProfile={handleSelectProfile}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfiles={() => setIsProfilesOpen(true)}
        isLiveDb={isLiveDb}
      />

      {/* Hero / Scraping Trigger */}
      <SearchHero
        activeProfile={activeProfile}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={location}
        setLocation={setLocation}
        onRunHunt={handleRunHunt}
        isHunting={isHunting}
        huntStatus={huntStatus}
        onDismissStatus={() => setHuntStatus(null)}
      />

      {/* Metrics & KPIs */}
      <StatsOverview jobs={jobs} activeProfile={activeProfile} />

      {/* Filtering and Sort Controls */}
      <ControlsBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onRefresh={() => loadJobs(activeProfileId)}
        isRefreshing={isRefreshing}
        totalResults={displayedJobs.length}
      />

      {/* Job Card Grid */}
      {displayedJobs.length > 0 ? (
        <main className="jobs-grid" id="jobs-grid-container">
          {displayedJobs.map((job) => (
            <JobCard
              key={job.hash_id}
              job={job}
              onSelectJob={(j) => setSelectedJob(j)}
            />
          ))}
        </main>
      ) : (
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
          id="empty-jobs-state"
        >
          <div style={{ fontSize: '2.5rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.3rem' }}>No listings matched your criteria</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', fontSize: '0.9rem' }}>
            Try clearing your search query, switching match tiers, or run the AI Job Hunter above to scrape fresh positions.
          </p>
          <button
            className="btn-secondary"
            onClick={() => {
              setActiveFilter('all');
              setSearchFilter('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Modals */}
      <JobModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      <ProfileModal
        isOpen={isProfilesOpen}
        onClose={() => setIsProfilesOpen(false)}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSelectProfile={handleSelectProfile}
        onUpdateProfiles={handleUpdateProfiles}
      />
    </div>
  );
}

export default App;
