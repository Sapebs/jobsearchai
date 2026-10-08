import React, { useState } from 'react';
import { X, User, Mail, Sparkles, Check, Edit3, Plus, Trash2 } from 'lucide-react';

export const ProfileModal = ({
  isOpen,
  onClose,
  profiles,
  activeProfileId,
  onSelectProfile,
  onUpdateProfiles
}) => {
  const [selectedId, setSelectedId] = useState(activeProfileId);
  const [editingProfile, setEditingProfile] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [newRole, setNewRole] = useState('');

  if (!isOpen) return null;

  const currentProf = profiles.find((p) => p.id === selectedId) || profiles[0];

  const handleStartEdit = (p) => {
    setEditingProfile(JSON.parse(JSON.stringify(p)));
  };

  const handleSaveEdit = () => {
    if (!editingProfile) return;
    const updated = profiles.map((p) => (p.id === editingProfile.id ? editingProfile : p));
    onUpdateProfiles(updated);
    setEditingProfile(null);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim() || !editingProfile) return;
    if (!editingProfile.coreSkills.includes(newSkill.trim())) {
      setEditingProfile({
        ...editingProfile,
        coreSkills: [...editingProfile.coreSkills, newSkill.trim()]
      });
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    if (!editingProfile) return;
    setEditingProfile({
      ...editingProfile,
      coreSkills: editingProfile.coreSkills.filter((s) => s !== skillToRemove)
    });
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRole.trim() || !editingProfile) return;
    if (!editingProfile.preferredRoles.includes(newRole.trim())) {
      setEditingProfile({
        ...editingProfile,
        preferredRoles: [...editingProfile.preferredRoles, newRole.trim()]
      });
    }
    setNewRole('');
  };

  const handleRemoveRole = (roleToRemove) => {
    if (!editingProfile) return;
    setEditingProfile({
      ...editingProfile,
      preferredRoles: editingProfile.preferredRoles.filter((r) => r !== roleToRemove)
    });
  };

  const handleActivate = (id) => {
    setSelectedId(id);
    onSelectProfile(id);
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="profile-modal-overlay">
      <div 
        className="modal-content glass-panel" 
        onClick={(e) => e.stopPropagation()} 
        id="profile-modal-box"
        style={{ maxWidth: '780px' }}
      >
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>Candidate Profiles</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Manage personal skills and target roles so the AI matches jobs accurately for each user.
            </p>
          </div>
          <button className="btn-outline" style={{ padding: '0.4rem', borderRadius: 'var(--radius-full)' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Profile Switcher Cards */}
          <div className="profiles-selection-grid">
            {profiles.map((p) => {
              const isActive = p.id === selectedId;
              return (
                <div
                  key={p.id}
                  id={`profile-card-select-${p.id}`}
                  className={`profile-editor-card ${isActive ? 'selected' : ''}`}
                  onClick={() => handleActivate(p.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>{p.avatar}</span>
                      <div>
                        <h4 style={{ fontSize: '1.1rem' }}>{p.name}</h4>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.title}</span>
                      </div>
                    </div>
                    {isActive ? (
                      <span className="badge badge-high" style={{ fontSize: '0.7rem' }}>
                        <Check size={12} />
                        Active
                      </span>
                    ) : (
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>Select</span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.summary}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {p.coreSkills?.length || 0} skills &bull; {p.preferredRoles?.length || 0} roles
                    </span>
                    <button
                      id={`btn-edit-profile-${p.id}`}
                      className="btn-outline"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(p);
                      }}
                    >
                      <Edit3 size={12} />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Edit Profile Form */}
          {editingProfile && (
            <div style={{ 
              padding: '1.3rem', 
              background: 'rgba(7, 9, 14, 0.7)', 
              borderRadius: 'var(--radius-lg)', 
              border: '1px solid var(--border-highlight)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Edit3 size={16} style={{ color: 'var(--accent-primary)' }} />
                  <span>Editing Profile: {editingProfile.name}</span>
                </h3>
                <button className="btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} onClick={() => setEditingProfile(null)}>
                  Done Editing
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="field-group">
                  <label className="field-label">Display Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editingProfile.name}
                    onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Professional Title</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editingProfile.title}
                    onChange={(e) => setEditingProfile({ ...editingProfile, title: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="field-group">
                  <label className="field-label">Alert Email Address</label>
                  <input
                    type="email"
                    className="input-field"
                    value={editingProfile.email}
                    onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Default Target Query</label>
                  <input
                    type="text"
                    className="input-field"
                    value={editingProfile.targetQuery}
                    onChange={(e) => setEditingProfile({ ...editingProfile, targetQuery: e.target.value })}
                  />
                </div>
              </div>

              {/* Skills Editor */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label className="field-label" style={{ marginBottom: '0.4rem' }}>
                  Core Skills ({editingProfile.coreSkills?.length || 0})
                </label>
                <div className="skills-pill-wrap" style={{ marginBottom: '0.6rem' }}>
                  {editingProfile.coreSkills.map((sk) => (
                    <span 
                      key={sk} 
                      className="skill-tag"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(99, 102, 241, 0.15)', color: '#c7d2fe' }}
                    >
                      {sk}
                      <X 
                        size={12} 
                        style={{ cursor: 'pointer', opacity: 0.7 }} 
                        onClick={() => handleRemoveSkill(sk)} 
                      />
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="input-field"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    placeholder="Add skill (e.g. Docker, Python, FastAPI)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(e);
                      }
                    }}
                  />
                  <button type="button" className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }} onClick={handleAddSkill}>
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Preferred Roles Editor */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label className="field-label" style={{ marginBottom: '0.4rem' }}>
                  Preferred Job Titles ({editingProfile.preferredRoles?.length || 0})
                </label>
                <div className="skills-pill-wrap" style={{ marginBottom: '0.6rem' }}>
                  {editingProfile.preferredRoles.map((role) => (
                    <span 
                      key={role} 
                      className="skill-tag"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(6, 182, 212, 0.15)', color: '#a5f3fc' }}
                    >
                      {role}
                      <X 
                        size={12} 
                        style={{ cursor: 'pointer', opacity: 0.7 }} 
                        onClick={() => handleRemoveRole(role)} 
                      />
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="input-field"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    placeholder="Add target role title..."
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddRole(e);
                      }
                    }}
                  />
                  <button type="button" className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }} onClick={handleAddRole}>
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <button type="button" className="btn-outline" onClick={() => setEditingProfile(null)}>
                  Cancel
                </button>
                <button type="button" className="btn-primary" onClick={handleSaveEdit}>
                  <Check size={16} />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Selected candidate: <strong>{currentProf.name}</strong>
          </span>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
