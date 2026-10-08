import React from 'react';
import { Sparkles, Settings, Users, Database } from 'lucide-react';

export const Navbar = ({
  profiles,
  activeProfileId,
  onSelectProfile,
  onOpenSettings,
  onOpenProfiles,
  isLiveDb
}) => {
  return (
    <header className="navbar glass-panel" id="main-navbar">
      <div className="nav-brand">
        <div className="brand-icon">
          <Sparkles size={22} />
        </div>
        <div>
          <div className="brand-title">
            <span>JobSearch</span>
            <span className="gradient-text">AI</span>
            <span className="brand-tag">DUAL-PROFILE</span>
          </div>
        </div>
      </div>

      <div className="nav-center" id="nav-profile-switcher">
        {profiles.map((p) => {
          const isActive = p.id === activeProfileId;
          return (
            <button
              key={p.id}
              id={`profile-btn-${p.id}`}
              className={`profile-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectProfile(p.id)}
              title={`Switch candidate profile to ${p.name}`}
            >
              <span className="profile-avatar">{p.avatar}</span>
              <span>{p.name}</span>
            </button>
          );
        })}
        <button
          id="btn-manage-profiles"
          className="btn-outline"
          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', borderRadius: 'var(--radius-full)' }}
          onClick={onOpenProfiles}
          title="Edit or customize profiles"
        >
          <Users size={14} />
          <span>Profiles</span>
        </button>
      </div>

      <div className="nav-actions">
        <div 
          className="db-pill" 
          id="db-status-pill"
          title={isLiveDb ? 'Connected to live Supabase jobs table' : 'Using cached/demo listings. Connect Supabase in Settings.'}
        >
          <span className={`status-dot ${isLiveDb ? 'live' : 'cached'}`} />
          <Database size={13} />
          <span>{isLiveDb ? 'Supabase Live' : 'Demo Cache'}</span>
        </div>

        <button
          id="btn-open-settings"
          className="btn-secondary"
          onClick={onOpenSettings}
          title="Configure Supabase & n8n credentials"
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </header>
  );
};
