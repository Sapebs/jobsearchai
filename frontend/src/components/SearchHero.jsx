import React from 'react';
import { Search, MapPin, Play, Loader2, Sparkles, CheckCircle2, AlertCircle, X } from 'lucide-react';

export const SearchHero = ({
  activeProfile,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  onRunHunt,
  isHunting,
  huntStatus,
  onDismissStatus
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isHunting) {
      onRunHunt();
    }
  };

  const handleRoleQuickSelect = (roleName) => {
    setSearchQuery(roleName);
  };

  return (
    <section className="search-hero glass-panel" id="search-hero-section">
      <div className="hero-header">
        <div className="hero-title-group">
          <h1>
            Scrape, Filter & <span className="gradient-text">AI Match</span> High-Yield Jobs
          </h1>
          <p className="hero-subtitle">
            Autonomous n8n pipeline queries Google Jobs via SerpAPI and rigorously scores listings against candidate profiles.
          </p>
        </div>

        {activeProfile && (
          <div className="candidate-badge" id="active-candidate-badge">
            <span>{activeProfile.avatar}</span>
            <span>Hunting for: <strong>{activeProfile.name}</strong> ({activeProfile.title})</span>
          </div>
        )}
      </div>

      <form className="search-form" onSubmit={handleSubmit} id="job-search-form">
        <div className="input-with-icon">
          <Search size={18} className="input-icon" />
          <input
            id="input-job-query"
            type="text"
            className="input-field"
            placeholder="Target Job Title or Keywords (e.g. AI Automation Engineer)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isHunting}
          />
        </div>

        <div className="input-with-icon">
          <MapPin size={18} className="input-icon" />
          <input
            id="input-job-location"
            type="text"
            className="input-field"
            placeholder="Location (e.g. Remote, United States)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isHunting}
          />
        </div>

        <button
          id="btn-trigger-job-hunter"
          type="submit"
          className="btn-primary"
          disabled={isHunting}
        >
          {isHunting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Hunting...</span>
            </>
          ) : (
            <>
              <Play size={18} />
              <span>Run AI Job Hunter</span>
            </>
          )}
        </button>
      </form>

      {/* Suggested Quick Role Chips */}
      {activeProfile?.preferredRoles && activeProfile.preferredRoles.length > 0 && (
        <div className="quick-tags" id="quick-role-tags">
          <span className="quick-label">Suggestions for {activeProfile.name}:</span>
          {activeProfile.preferredRoles.map((role, idx) => (
            <button
              key={idx}
              id={`quick-tag-${idx}`}
              type="button"
              className="tag-btn"
              onClick={() => handleRoleQuickSelect(role)}
            >
              + {role}
            </button>
          ))}
        </div>
      )}

      {/* Real-time status update during workflow execution */}
      {huntStatus && (
        <div 
          className="hunt-status-banner" 
          id="hunt-status-banner"
          style={{
            background: huntStatus.stage === 'error' 
              ? 'rgba(239, 68, 68, 0.12)' 
              : huntStatus.stage === 'completed' 
              ? 'rgba(16, 185, 129, 0.12)' 
              : 'rgba(99, 102, 241, 0.12)',
            borderColor: huntStatus.stage === 'error' 
              ? 'rgba(239, 68, 68, 0.35)' 
              : huntStatus.stage === 'completed' 
              ? 'rgba(16, 185, 129, 0.35)' 
              : 'rgba(99, 102, 241, 0.35)',
            color: huntStatus.stage === 'error' ? '#fca5a5' : huntStatus.stage === 'completed' ? '#a7f3d0' : '#c7d2fe'
          }}
        >
          <div className="hunt-status-left" style={{ flex: 1 }}>
            {isHunting ? (
              <Loader2 size={16} className="animate-spin" style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
            ) : huntStatus.stage === 'error' ? (
              <AlertCircle size={16} style={{ color: 'var(--status-low)', flexShrink: 0 }} />
            ) : (
              <CheckCircle2 size={16} style={{ color: 'var(--status-high)', flexShrink: 0 }} />
            )}
            <span style={{ fontSize: '0.88rem', lineHeight: 1.4 }}>{huntStatus.message}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {huntStatus.stage && (
              <span 
                className="badge badge-neutral" 
                style={{ 
                  textTransform: 'uppercase', 
                  fontSize: '0.68rem',
                  color: huntStatus.stage === 'error' ? 'var(--status-low)' : huntStatus.stage === 'completed' ? 'var(--status-high)' : 'inherit'
                }}
              >
                {huntStatus.stage}
              </span>
            )}
            {onDismissStatus && !isHunting && (
              <button 
                id="btn-dismiss-hunt-status"
                onClick={onDismissStatus}
                style={{ color: 'inherit', opacity: 0.7, padding: '0.2rem', cursor: 'pointer' }}
                title="Dismiss message"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
