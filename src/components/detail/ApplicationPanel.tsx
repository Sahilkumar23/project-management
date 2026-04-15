import React, { useState } from 'react';
import { Upload, FileText, Link, X } from 'lucide-react';
import { Project } from '../../types';

interface ApplicationPanelProps {
  project: Project;
}

const ApplicationPanel: React.FC<ApplicationPanelProps> = ({ project }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openRoles = project.roles.filter(r => !r.filled);

  if (openRoles.length === 0) return null;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setSelectedRole('');
      setCoverNote('');
      setPortfolio('');
    }, 2000);
  };

  return (
    <>
      <div className="card" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3>Apply for this Project</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {openRoles.length} open position{openRoles.length > 1 ? 's' : ''} available
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Apply Now
          </button>
        </div>
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
                <h3 style={{ marginBottom: '8px' }}>Application Submitted!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Your application has been sent to the host. You'll be notified when they review it.
                </p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3>Apply to {project.title}</h3>
                  <button className="modal-close" onClick={() => setShowModal(false)}>
                    <X size={18} />
                  </button>
                </div>

                <div className="modal-body">
                  {/* Role Selection */}
                  <div className="form-group">
                    <label className="form-label">Select a Role *</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {openRoles.map(role => (
                        <label
                          key={role.id}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '12px', borderRadius: 'var(--radius-md)',
                            background: selectedRole === role.id ? 'var(--brand-accent-bg)' : 'var(--bg-surface-secondary)',
                            border: `1px solid ${selectedRole === role.id ? 'var(--brand-primary)' : 'var(--border-standard)'}`,
                            cursor: 'pointer', transition: 'all 0.15s'
                          }}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.id}
                            checked={selectedRole === role.id}
                            onChange={e => setSelectedRole(e.target.value)}
                            style={{ accentColor: 'var(--brand-primary)' }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-heading)' }}>
                              {role.title}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              Skills: {role.skillsRequired.join(', ')}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Cover Note */}
                  <div className="form-group">
                    <label className="form-label">Cover Note *</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell the host why you're interested in this role and what you bring to the table..."
                      value={coverNote}
                      onChange={e => setCoverNote(e.target.value)}
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="form-group">
                    <label className="form-label">Resume</label>
                    <div className="file-upload-zone">
                      <Upload size={24} className="file-upload-zone-icon" />
                      <div className="file-upload-zone-text">
                        <span>Click to upload</span> or drag and drop
                        <br />
                        PDF, DOC up to 5MB
                      </div>
                    </div>
                  </div>

                  {/* Portfolio URL */}
                  <div className="form-group">
                    <label className="form-label">Portfolio / GitHub URL</label>
                    <div style={{ position: 'relative' }}>
                      <Link size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-disabled)' }} />
                      <input
                        className="form-input"
                        style={{ paddingLeft: '36px' }}
                        type="url"
                        placeholder="https://github.com/yourusername"
                        value={portfolio}
                        onChange={e => setPortfolio(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!selectedRole || !coverNote}
                    style={{ opacity: !selectedRole || !coverNote ? 0.5 : 1 }}
                  >
                    Submit Application
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationPanel;
