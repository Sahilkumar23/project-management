import React, { useState } from 'react';
import { Upload, FileText, ExternalLink, X } from 'lucide-react';

interface SubmissionGatewayProps {
  taskId: string;
  taskTitle: string;
}

const SubmissionGateway: React.FC<SubmissionGatewayProps> = ({ taskId, taskTitle }) => {
  const [showModal, setShowModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setLinkUrl('');
      setDescription('');
    }, 2000);
  };

  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
        <Upload size={14} /> Submit Work
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📤</div>
                <h3 style={{ marginBottom: '8px' }}>Submission Uploaded!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Your work has been submitted for review. The host will be notified.
                </p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h3>Submit: {taskTitle}</h3>
                  <button className="modal-close" onClick={() => setShowModal(false)}>
                    <X size={18} />
                  </button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Link (PR, Figma, Google Doc, etc.) *</label>
                    <div style={{ position: 'relative' }}>
                      <ExternalLink size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-disabled)' }} />
                      <input
                        className="form-input"
                        style={{ paddingLeft: '36px' }}
                        type="url"
                        placeholder="https://github.com/your-repo/pull/42"
                        value={linkUrl}
                        onChange={e => setLinkUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Describe what you've done, any decisions you made, or questions you have..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Attachments (optional)</label>
                    <div className="file-upload-zone">
                      <Upload size={24} className="file-upload-zone-icon" />
                      <div className="file-upload-zone-text">
                        <span>Click to upload</span> or drag and drop
                        <br />
                        Any file up to 10MB
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!linkUrl}
                    style={{ opacity: !linkUrl ? 0.5 : 1 }}
                  >
                    Submit for Review
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

export default SubmissionGateway;
