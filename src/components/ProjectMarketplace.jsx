import React, { useState } from 'react';
import { Filter, Award, ChevronRight, X, ExternalLink, RefreshCw, CheckCircle } from 'lucide-react';
import { PROJECTS, getAIProjectReview } from '../data/mockData';

export default function ProjectMarketplace({ 
  stats,
  activeProjectIds, 
  completedProjectIds, 
  onAcceptProject, 
  onCompleteProject,
  activeGoal
}) {
  const [filterType, setFilterType] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Workspace Modal states
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState(null);
  const [evaluationStatus, setEvaluationStatus] = useState(null); // 'approved' | 'rejected'

  // Filter projects
  const filteredProjects = PROJECTS.filter(proj => {
    if (filterType === "All") return true;
    if (filterType === "Startups") return proj.sponsorType === "Startup";
    if (filterType === "NGOs") return proj.sponsorType === "NGO";
    if (filterType === "Local Biz") return proj.sponsorType === "Local Business";
    if (filterType === "Companies") return proj.sponsorType === "Company";
    return true;
  });

  const getSponsorClass = (type) => {
    switch (type) {
      case 'NGO': return 'ngo';
      case 'Startup': return 'startup';
      case 'Company': return 'company';
      case 'Local Business': return 'local';
      default: return '';
    }
  };

  const handleOpenWorkspace = (project) => {
    setSelectedProject(project);
    setSubmissionUrl("");
    setEvaluationFeedback(null);
    setEvaluationStatus(null);
  };

  const handleCloseWorkspace = () => {
    setSelectedProject(null);
  };

  const handleAccept = (projectId) => {
    onAcceptProject(projectId);
  };

  const handleSubmitSolution = (e) => {
    e.preventDefault();
    if (!submissionUrl.trim()) return;

    setIsEvaluating(true);
    setEvaluationFeedback(null);

    // Simulate AI checking the submission URL & code quality
    setTimeout(() => {
      const review = getAIProjectReview(selectedProject.id, submissionUrl.trim());
      setIsEvaluating(false);
      setEvaluationStatus(review.status);
      setEvaluationFeedback(review.feedback);

      if (review.status === 'approved') {
        onCompleteProject(
          selectedProject.id, 
          selectedProject.rewards.xp, 
          selectedProject.rewards.credits, 
          selectedProject.rewards.reputation
        );
      }
    }, 2000);
  };

  const isProjectActive = selectedProject ? activeProjectIds.includes(selectedProject.id) : false;
  const isProjectCompleted = selectedProject ? completedProjectIds.includes(selectedProject.id) : false;

  return (
    <div className="marketplace-container">
      {/* Header & Sourcing Filters */}
      <div className="marketplace-header">
        <div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
            Project Marketplace
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Earn credentials and build your portfolio. Work on active briefs from real organizations.
          </p>
        </div>

        <div className="filter-group">
          {["All", "Startups", "NGOs", "Local Biz", "Companies"].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`filter-btn ${filterType === type ? 'active' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="projects-grid">
        {filteredProjects.map(proj => {
          const isActive = activeProjectIds.includes(proj.id);
          const isCompleted = completedProjectIds.includes(proj.id);
          
          return (
            <div key={proj.id} className="project-card">
              {/* Cover Card Image */}
              <div 
                className="project-card-header" 
                style={{ backgroundImage: `url(${proj.image})` }}
              >
                <div className="project-card-overlay"></div>
                <span className={`project-sponsor-badge ${getSponsorClass(proj.sponsorType)}`}>
                  {proj.sponsorType}
                </span>
                <span className="project-difficulty">
                  {proj.difficulty}
                </span>
              </div>

              {/* Content Body */}
              <div className="project-card-body">
                <span className="project-sponsor-info">
                  Sourced from {proj.sponsor}
                </span>
                <h3 className="project-card-title">{proj.title}</h3>
                <p className="project-card-desc">{proj.description}</p>
                
                {/* Skills Earned */}
                <div className="project-tags">
                  {proj.skillsEarned.map(skill => (
                    <span key={skill} className="project-tag">{skill}</span>
                  ))}
                </div>

                {/* Rewards Summary */}
                <div className="project-rewards">
                  <div className="reward-item xp">
                    <span>🏆</span>
                    <span>+{proj.rewards.xp} XP</span>
                  </div>
                  <div className="reward-item credits">
                    <span>⭐</span>
                    <span>+{proj.rewards.credits} Credits</span>
                  </div>
                  <div className="reward-item reputation">
                    <span>⚡</span>
                    <span>+{proj.rewards.reputation} Rep</span>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleOpenWorkspace(proj)}
                  className={`btn ${isCompleted ? 'btn-success' : isActive ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {isCompleted ? 'Project Completed ✓' : isActive ? 'Enter Workspace' : 'Review Brief'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workspace Submission & Detail Drawer Modal */}
      {selectedProject && (
        <div className="workspace-overlay" onClick={handleCloseWorkspace}>
          <div className="workspace-modal" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="workspace-modal-header">
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {selectedProject.sponsor} • Workspace
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginTop: '0.2rem' }}>
                  {selectedProject.title}
                </h3>
              </div>
              <button 
                onClick={handleCloseWorkspace}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="workspace-modal-body">
              {/* Left Column: Brief details */}
              <div className="workspace-left">
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    PROJECT DESCRIPTION
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    CLIENT DELIVERABLES REQUIRED
                  </h4>
                  <div className="deliverables-list">
                    {selectedProject.deliverables.map((item, index) => (
                      <div key={index} className="deliverable-item">
                        <span style={{ color: 'var(--accent-violet)', fontWeight: 700 }}>✓</span>
                        <span style={{ color: 'var(--text-primary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    SKILLS CREDITED ON PORTFOLIO
                  </h4>
                  <div className="project-tags">
                    {selectedProject.skillsEarned.map(skill => (
                      <span key={skill} className="project-tag" style={{ background: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)', color: '#67e8f9' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Submission Console */}
              <div className="workspace-right">
                <h4 style={{ fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Workspace console
                </h4>

                {!isProjectActive && !isProjectCompleted ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '1.5rem 0' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Review this brief. Once you accept, the workspace sandbox will initialize, allowing you to submit deliverables.
                    </p>
                    <button 
                      onClick={() => handleAccept(selectedProject.id)}
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                    >
                      Accept Project Brief
                    </button>
                  </div>
                ) : isProjectCompleted ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '1.5rem 0', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--accent-emerald)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <CheckCircle size={32} />
                    </div>
                    <div>
                      <h4 style={{ color: '#10b981', fontSize: '1.1rem' }}>Project Completed!</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        AI review passed. {selectedProject.rewards.xp} XP, {selectedProject.rewards.credits} Credits, and {selectedProject.rewards.reputation} Reputation points have been credited to your portfolio.
                      </p>
                    </div>
                    {evaluationFeedback && (
                      <div className="feedback-area success" style={{ textAlign: 'left', width: '100%' }}>
                        {evaluationFeedback}
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmitSolution} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                        SUBMISSION DEPLOYMENT/REPOSITORY URL
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. https://github.com/my-username/project"
                        value={submissionUrl}
                        onChange={(e) => setSubmissionUrl(e.target.value)}
                        className="form-input"
                        disabled={isEvaluating}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ width: '100%' }}
                      disabled={isEvaluating || !submissionUrl.trim()}
                    >
                      {isEvaluating ? (
                        <>
                          <RefreshCw size={16} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} />
                          Running AI Evaluation...
                        </>
                      ) : 'Submit Solution to AI'}
                    </button>

                    {/* AI Feedback Log */}
                    {evaluationFeedback && (
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>AI FEEDBACK LOG:</span>
                        <div className={`feedback-area ${evaluationStatus === 'approved' ? 'success' : 'error'}`}>
                          {evaluationFeedback}
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {/* Reward Box */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '8px', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>REWARDS ON COMPLETION:</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: '#c084fc', fontWeight: 700 }}>🏆 +{selectedProject.rewards.xp} XP</span>
                    <span style={{ color: '#f472b6', fontWeight: 700 }}>⭐ +{selectedProject.rewards.credits} Credits</span>
                    <span style={{ color: '#22d3ee', fontWeight: 700 }}>⚡ +{selectedProject.rewards.reputation} Rep</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Embedded CSS rules for loading spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
