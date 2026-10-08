import React from 'react';
import { Briefcase, Award, TrendingUp, UserCheck } from 'lucide-react';

export const StatsOverview = ({ jobs, activeProfile }) => {
  const totalJobs = jobs.length;
  const highMatches = jobs.filter((j) => (j.match_score || 0) >= 75).length;
  const avgScore = totalJobs > 0 
    ? Math.round(jobs.reduce((acc, curr) => acc + (curr.match_score || 0), 0) / totalJobs)
    : 0;

  return (
    <div className="stats-grid" id="stats-overview-grid">
      <div className="stat-card glass-panel" id="stat-total-jobs">
        <div className="stat-icon-wrap" style={{ color: 'var(--accent-tertiary)' }}>
          <Briefcase size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{totalJobs}</span>
          <span className="stat-label">Scored Postings</span>
        </div>
      </div>

      <div className="stat-card glass-panel" id="stat-high-matches">
        <div className="stat-icon-wrap" style={{ color: 'var(--status-high)' }}>
          <Award size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-value" style={{ color: 'var(--status-high)' }}>
            {highMatches}
          </span>
          <span className="stat-label">High Matches (≥ 75%)</span>
        </div>
      </div>

      <div className="stat-card glass-panel" id="stat-avg-score">
        <div className="stat-icon-wrap" style={{ color: 'var(--accent-secondary)' }}>
          <TrendingUp size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-value">{avgScore}%</span>
          <span className="stat-label">Average Match Score</span>
        </div>
      </div>

      <div className="stat-card glass-panel" id="stat-active-candidate">
        <div className="stat-icon-wrap" style={{ color: 'var(--accent-primary)' }}>
          <UserCheck size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-value" style={{ fontSize: '1.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {activeProfile?.name || 'Dual Mode'}
          </span>
          <span className="stat-label">{activeProfile?.title || 'Selected Candidate'}</span>
        </div>
      </div>
    </div>
  );
};
