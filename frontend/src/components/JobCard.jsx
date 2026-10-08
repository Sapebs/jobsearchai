import React from 'react';
import { ExternalLink, CheckCircle2, MapPin, Eye, Building2 } from 'lucide-react';

export const JobCard = ({ job, onSelectJob }) => {
  const score = job.match_score || 0;
  
  let scoreVariant = 'low';
  if (score >= 75) scoreVariant = 'high';
  else if (score >= 50) scoreVariant = 'med';

  const prosList = Array.isArray(job.pros) ? job.pros : [];

  return (
    <div className="job-card glass-panel" id={`job-card-${job.hash_id}`}>
      <div>
        <div className="job-card-top">
          <div className="company-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="company-name">{job.company}</span>
              {job.is_new && (
                <span className="badge badge-high" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem', animation: 'pulseGlow 2s infinite' }}>
                  NEW
                </span>
              )}
            </div>
            <h3 className="job-title">{job.title}</h3>
          </div>

          <div 
            className={`score-badge ${scoreVariant}`} 
            id={`score-badge-${job.hash_id}`}
            title={`AI Fit Score: ${score}/100`}
          >
            <span className="score-num">{score}</span>
            <span className="score-label">MATCH</span>
          </div>
        </div>

        <div className="job-location-row">
          <span className="job-location-item">
            <MapPin size={13} />
            <span>{job.location || 'Remote'}</span>
          </span>
          {job.source && (
            <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
              {job.source}
            </span>
          )}
        </div>

        {/* AI Summary */}
        <p className="job-summary">
          {job.summary || 'AI-evaluated job fit based on master skills profile.'}
        </p>

        {/* Pros preview */}
        {prosList.length > 0 && (
          <div className="job-pros-preview">
            {prosList.slice(0, 2).map((pro, idx) => (
              <div key={idx} className="pro-item">
                <CheckCircle2 size={13} className="pro-icon" />
                <span>{pro}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="job-card-actions">
        <button
          id={`btn-analyze-${job.hash_id}`}
          className="btn-secondary"
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
          onClick={() => onSelectJob(job)}
        >
          <Eye size={14} />
          <span>Full Analysis</span>
        </button>

        <a
          id={`btn-apply-${job.hash_id}`}
          href={job.job_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
        >
          <span>Apply Now</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
};
