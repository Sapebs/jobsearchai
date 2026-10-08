import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, AlertTriangle, Key, Copy, Check, MapPin, Building2, Sparkles } from 'lucide-react';

export const JobModal = ({ job, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!job) return null;

  const score = job.match_score || 0;
  let scoreVariant = 'low';
  if (score >= 75) scoreVariant = 'high';
  else if (score >= 50) scoreVariant = 'med';

  const pros = Array.isArray(job.pros) ? job.pros : [];
  const cons = Array.isArray(job.cons) ? job.cons : [];
  const missingKeywords = Array.isArray(job.missing_keywords) ? job.missing_keywords : [];

  const handleCopyLink = () => {
    if (job.job_url) {
      navigator.clipboard.writeText(job.job_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="job-detail-modal-overlay">
      <div 
        className="modal-content glass-panel" 
        onClick={(e) => e.stopPropagation()} 
        id={`job-modal-${job.hash_id}`}
        style={{ maxWidth: '780px' }}
      >
        <div className="modal-header">
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
              <span className="badge badge-neutral" style={{ textTransform: 'uppercase' }}>{job.company}</span>
              {job.location && (
                <span className="job-location-item" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  <MapPin size={12} />
                  <span>{job.location}</span>
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.5rem', lineHeight: 1.25 }}>{job.title}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className={`score-badge ${scoreVariant}`}>
              <span className="score-num">{score}</span>
              <span className="score-label">MATCH</span>
            </div>
            <button 
              id="btn-close-job-modal"
              className="btn-outline" 
              style={{ padding: '0.45rem', borderRadius: 'var(--radius-full)' }}
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Executive AI Assessment */}
          <div>
            <div className="detail-section-title">
              <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>Executive Fit Assessment</span>
            </div>
            <div style={{ 
              padding: '1rem 1.2rem', 
              background: 'rgba(99, 102, 241, 0.08)', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#e0e7ff'
            }}>
              {job.summary || 'Candidate profile matched based on skills, tooling alignment, and remote flexibility.'}
            </div>
          </div>

          {/* Pros & Cons Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            {/* Pros */}
            <div>
              <div className="detail-section-title" style={{ color: 'var(--status-high)' }}>
                <CheckCircle2 size={16} />
                <span>Matching Strengths ({pros.length})</span>
              </div>
              <div className="strengths-grid">
                {pros.length > 0 ? (
                  pros.map((p, idx) => (
                    <div key={idx} className="strength-row pro">
                      <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{p}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>No strengths highlighted.</p>
                )}
              </div>
            </div>

            {/* Cons */}
            <div>
              <div className="detail-section-title" style={{ color: 'var(--status-low)' }}>
                <AlertTriangle size={16} />
                <span>Gaps & Red Flags ({cons.length})</span>
              </div>
              <div className="strengths-grid">
                {cons.length > 0 ? (
                  cons.map((c, idx) => (
                    <div key={idx} className="strength-row con">
                      <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{c}</span>
                    </div>
                  ))
                ) : (
                  <div className="strength-row pro">
                    <span>No critical skill gaps identified.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Missing Keywords */}
          {missingKeywords.length > 0 && (
            <div>
              <div className="detail-section-title">
                <Key size={16} style={{ color: 'var(--status-med)' }} />
                <span>Keywords Missing From Candidate Profile</span>
              </div>
              <div className="keyword-chips">
                {missingKeywords.map((kw, idx) => (
                  <span key={idx} className="keyword-chip">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Job Description */}
          {job.description && (
            <div>
              <div className="detail-section-title">
                <Building2 size={16} />
                <span>Full Job Posting</span>
              </div>
              <div className="desc-box">
                {job.description}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            id="btn-copy-job-url"
            className="btn-secondary"
            onClick={handleCopyLink}
          >
            {copied ? <Check size={16} style={{ color: 'var(--status-high)' }} /> : <Copy size={16} />}
            <span>{copied ? 'Link Copied!' : 'Copy Job Link'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button className="btn-outline" onClick={onClose}>
              Close
            </button>
            <a
              id="btn-modal-apply"
              href={job.job_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Open Application</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
