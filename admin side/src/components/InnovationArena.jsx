import React, { useState } from 'react';
import { Award, ShieldAlert, Sparkles, RefreshCw, X, CheckCircle, ExternalLink, Calendar, Database } from 'lucide-react';
import { getArenaJuryReview } from '../data/mockData';

export default function InnovationArena({ 
  careerData, 
  challenges = [],
  wonChallengeIds = [], 
  onWinChallenge,
  stats
}) {
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  
  // Workspace submission state
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [juryStatus, setJuryStatus] = useState(null); // 'approved' | 'rejected'
  const [juryFeedback, setJuryFeedback] = useState(null);

  const filteredChallenges = challenges.filter(item => {
    if (filterCategory === "All") return true;
    return item.category === filterCategory;
  });

  const handleOpenWorkspace = (challenge) => {
    setSelectedChallenge(challenge);
    setSubmissionUrl("");
    setJuryFeedback(null);
    setJuryStatus(null);
  };

  const handleCloseWorkspace = () => {
    setSelectedChallenge(null);
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!submissionUrl.trim()) return;

    setEvaluating(true);
    setJuryFeedback(null);

    setTimeout(() => {
      const review = getArenaJuryReview(selectedChallenge.id, submissionUrl.trim());
      setEvaluating(false);
      setJuryStatus(review.status);
      setJuryFeedback(review.feedback);

      if (review.status === 'approved') {
        onWinChallenge(
          selectedChallenge.id,
          selectedChallenge.rewards?.xp || 1000,
          selectedChallenge.rewards?.reputation || 30
        );
      }
    }, 2500);
  };

  const isChallengeWon = selectedChallenge ? wonChallengeIds.includes(selectedChallenge.id) : false;

  // Guard: No Active Career Goal Pathway
  if (!careerData) {
    return (
      <div className="arena-container">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Award size={48} style={{ color: 'var(--accent-violet)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Innovation Arena Locked</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto', fontSize: '0.9rem', lineHeight: 1.5 }}>
            To activate hackathons and incubator funding challenge briefs, you must first define an active Career Specialization Pathway.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={() => {
                const manageTabBtn = document.querySelector('button[style*="color: var(--accent-cyan)"]');
                if (manageTabBtn) manageTabBtn.click();
              }}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Database size={16} /> Open Data Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Guard: No Challenges exist
  if (challenges.length === 0) {
    return (
      <div className="arena-container">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Sparkles size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Innovation Arena Empty</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto', fontSize: '0.9rem', lineHeight: 1.5 }}>
            No hackathons or incubator briefings are registered. Go to the Data Panel to add custom industry and NGO briefs!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={() => {
                const manageTabBtn = document.querySelector('button[style*="color: var(--accent-cyan)"]');
                if (manageTabBtn) manageTabBtn.click();
              }}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Database size={16} /> Open Data Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="arena-container">
      {/* Header */}
      <div className="glass-panel" style={{ marginBottom: '2rem', background: 'radial-gradient(circle at top right, rgba(124, 58, 237, 0.1), transparent), var(--bg-card)' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
          Innovation Arena
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Formulate solutions for massive social, startup, and industrial challenges. Unlock seed funding, business incubation, and direct offers.
        </p>
      </div>

      {/* Categories Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Active hackathons & accelerator briefs
        </div>

        <div className="filter-group">
          {["All", "Startup Problem", "Social Problem", "Industry Challenge"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Challenges */}
      <div className="projects-grid">
        {filteredChallenges.map(challenge => {
          const userSkill = careerData.skills ? careerData.skills.find(s => s.name === challenge.requiredSkill) : null;
          const currentVal = userSkill ? userSkill.current : 0;
          const isEligible = currentVal >= challenge.minSkillLevel;
          const isWon = wonChallengeIds.includes(challenge.id);

          return (
            <div key={challenge.id} className="project-card" style={{ border: isWon ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)' }}>
              
              {/* Card Title Box */}
              <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', background: isWon ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.01)' }}>
                <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {challenge.host}
                  </span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                    {challenge.category}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{challenge.title}</h3>
              </div>

              {/* Description */}
              <div className="project-card-body" style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {challenge.description}
                </p>

                {/* Requirements check */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', margin: '0.5rem 0' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>
                    SKILL ELIGIBILITY GATES:
                  </span>
                  <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{challenge.requiredSkill}</span>
                    <strong style={{ color: isEligible ? '#34d399' : '#fb7185' }}>
                      {currentVal}% / {challenge.minSkillLevel}% {isEligible ? '✓' : '✖'}
                    </strong>
                  </div>
                </div>

                {/* Prize Pool */}
                {challenge.rewards && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-violet)', fontWeight: 800 }}>🏆 AWARD POOL:</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span>💰 Seed Capital: <strong>{challenge.rewards.grant}</strong></span>
                      <span>🏢 Incubator: <strong>{challenge.rewards.incubation}</strong></span>
                      <span>💼 Offer: <strong>{challenge.rewards.offer}</strong></span>
                    </div>
                  </div>
                )}

                {/* Action button */}
                <button
                  onClick={() => handleOpenWorkspace(challenge)}
                  className={`btn ${isWon ? 'btn-success' : 'btn-primary'}`}
                  style={{ width: '100%', marginTop: '1rem' }}
                  disabled={!isEligible && !isWon}
                >
                  {isWon ? 'Arena Brief Solved ✓' : isEligible ? 'Enter Innovation Arena' : 'Brief Locked (Skill Gaps)'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedChallenge && (
        <div className="workspace-overlay" onClick={handleCloseWorkspace}>
          <div className="workspace-modal" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="workspace-modal-header">
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-violet)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {selectedChallenge.host} • Innovation Challenge
                </span>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '0.2rem' }}>
                  {selectedChallenge.title}
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
                    CHALLENGE OUTLINE
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {selectedChallenge.description}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
                    AI JURY EVALUATION SPECIFICATIONS
                  </h4>
                  <div className="deliverables-list" style={{ fontSize: '0.85rem' }}>
                    <div className="deliverable-item">
                      <span style={{ color: 'var(--accent-violet)', fontWeight: 700 }}>✓</span>
                      <span>Product Scalability Metrics</span>
                    </div>
                    <div className="deliverable-item">
                      <span style={{ color: 'var(--accent-violet)', fontWeight: 700 }}>✓</span>
                      <span>Target Implementation Codebase or Deck Model</span>
                    </div>
                    <div className="deliverable-item">
                      <span style={{ color: 'var(--accent-violet)', fontWeight: 700 }}>✓</span>
                      <span>Business feasibility spreadsheet</span>
                    </div>
                  </div>
                </div>

                {selectedChallenge.rewards && (
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontWeight: 600 }}>
                      WINNING PRIZE CREDENTIALS
                    </h4>
                    <div style={{ padding: '0.75rem', background: 'rgba(124, 58, 237, 0.04)', border: '1px solid rgba(124, 58, 237, 0.2)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <Sparkles size={16} style={{ color: 'var(--accent-violet)' }} />
                        <strong style={{ color: '#fff' }}>Accelerator Onboarding</strong>
                      </div>
                      Seed funding and incubator slots will be logged under your Portfolio as verified credentials.
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Submission Console */}
              <div className="workspace-right">
                <h4 style={{ fontSize: '1rem', color: '#fff' }}>Submission Console</h4>

                {isChallengeWon ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '1.5rem 0', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justify: 'center', color: 'var(--accent-emerald)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <Award size={32} />
                    </div>
                    <div>
                      <h4 style={{ color: '#10b981', fontSize: '1.1rem' }}>Challenge Won!</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        Jury award granted. Grants and incubation certificates have been added to your portfolio profile.
                      </p>
                    </div>
                    {juryFeedback && (
                      <div className="feedback-area success" style={{ textAlign: 'left', width: '100%' }}>
                        {juryFeedback}
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmitProposal} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                        PROPOSAL OR PROTOTYPE URL
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. https://my-startup-deck.framer.website"
                        value={submissionUrl}
                        onChange={(e) => setSubmissionUrl(e.target.value)}
                        className="form-input"
                        disabled={evaluating}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ width: '100%' }}
                      disabled={evaluating || !submissionUrl.trim()}
                    >
                      {evaluating ? (
                        <>
                          <RefreshCw size={16} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} />
                          Jury evaluating proposal...
                        </>
                      ) : 'Submit Proposal to AI Jury'}
                    </button>

                    {juryFeedback && (
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>JURY FEEDBACK LOG:</span>
                        <div className={`feedback-area ${juryStatus === 'approved' ? 'success' : 'error'}`}>
                          {juryFeedback}
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {/* Rewards Preview */}
                {selectedChallenge.rewards && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '8px', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>ACADEMIC CREDITS REWARD:</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: '#c084fc', fontWeight: 700 }}>🏆 +{selectedChallenge.rewards.xp} XP</span>
                      <span style={{ color: '#22d3ee', fontWeight: 700 }}>⚡ +{selectedChallenge.rewards.reputation} Rep</span>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Embedded CSS spinner */}
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
