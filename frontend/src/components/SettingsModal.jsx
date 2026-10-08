import React, { useState } from 'react';
import { X, Database, Send, Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { testSupabaseConnection } from '../services/supabase';
import { testN8nConnection } from '../services/n8n';

export const SettingsModal = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  const [formData, setFormData] = useState({
    supabaseUrl: settings.supabaseUrl || '',
    supabaseAnonKey: settings.supabaseAnonKey || '',
    n8nWebhookUrl: settings.n8nWebhookUrl || ''
  });

  const [dbTestStatus, setDbTestStatus] = useState(null);
  const [isTestingDb, setIsTestingDb] = useState(false);

  const [webhookTestStatus, setWebhookTestStatus] = useState(null);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestSupabase = async () => {
    setIsTestingDb(true);
    setDbTestStatus(null);
    try {
      const res = await testSupabaseConnection(formData.supabaseUrl, formData.supabaseAnonKey);
      setDbTestStatus(res);
    } catch (err) {
      setDbTestStatus({ success: false, message: err.message });
    } finally {
      setIsTestingDb(false);
    }
  };

  const handleTestWebhook = async () => {
    setIsTestingWebhook(true);
    setWebhookTestStatus(null);
    try {
      const res = await testN8nConnection(formData.n8nWebhookUrl);
      setWebhookTestStatus(res);
    } catch (err) {
      setWebhookTestStatus({ success: false, message: err.message });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="settings-modal-overlay">
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} id="settings-modal-box">
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>Settings & Integrations</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Configure your live Supabase database and n8n webhook automation endpoints.
            </p>
          </div>
          <button className="btn-outline" style={{ padding: '0.4rem', borderRadius: 'var(--radius-full)' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="modal-body">
            {/* Supabase Section */}
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="detail-section-title" style={{ color: 'var(--accent-tertiary)' }}>
                <Database size={16} />
                <span>Supabase Configuration</span>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="supabaseUrl">Supabase Project URL</label>
                <input
                  id="supabaseUrl"
                  name="supabaseUrl"
                  type="text"
                  className="input-field"
                  placeholder="https://xyzcompany.supabase.co"
                  value={formData.supabaseUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="supabaseAnonKey">Supabase Public Anon Key</label>
                <input
                  id="supabaseAnonKey"
                  name="supabaseAnonKey"
                  type="password"
                  className="input-field"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={formData.supabaseAnonKey}
                  onChange={handleChange}
                />
                <span className="field-hint">
                  Used by the frontend to read and sync the <code>jobs</code> table in real time.
                </span>
              </div>

              <div className="test-row">
                <button
                  id="btn-test-supabase"
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                  onClick={handleTestSupabase}
                  disabled={isTestingDb}
                >
                  {isTestingDb ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
                  <span>Test Supabase Connection</span>
                </button>

                {dbTestStatus && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                    {dbTestStatus.success ? (
                      <span style={{ color: 'var(--status-high)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CheckCircle2 size={14} />
                        <span>{dbTestStatus.message}</span>
                      </span>
                    ) : (
                      <span style={{ color: 'var(--status-low)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={14} />
                        <span>{dbTestStatus.message}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* n8n Webhook Section */}
            <div>
              <div className="detail-section-title" style={{ color: 'var(--accent-primary)' }}>
                <Send size={16} />
                <span>n8n Webhook Trigger</span>
              </div>

              <div className="field-group">
                <label className="field-label" htmlFor="n8nWebhookUrl">n8n Webhook POST URL</label>
                <input
                  id="n8nWebhookUrl"
                  name="n8nWebhookUrl"
                  type="text"
                  className="input-field"
                  placeholder="https://your-n8n-instance.app.n8n.cloud/webhook/job-search"
                  value={formData.n8nWebhookUrl}
                  onChange={handleChange}
                />
                <span className="field-hint">
                  The Webhook endpoint in your n8n workflow listening for incoming search triggers.
                </span>
              </div>

              <div className="test-row">
                <button
                  id="btn-test-webhook"
                  type="button"
                  className="btn-secondary"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                  onClick={handleTestWebhook}
                  disabled={isTestingWebhook}
                >
                  {isTestingWebhook ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  <span>Test Webhook Endpoint</span>
                </button>

                {webhookTestStatus && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                    {webhookTestStatus.success ? (
                      <span style={{ color: 'var(--status-high)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CheckCircle2 size={14} />
                        <span>{webhookTestStatus.message}</span>
                      </span>
                    ) : (
                      <span style={{ color: 'var(--status-low)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertCircle size={14} />
                        <span>{webhookTestStatus.message}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button id="btn-save-settings" type="submit" className="btn-primary">
              <Save size={16} />
              <span>Save & Connect</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
