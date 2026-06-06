import React, { useState } from 'react';
import { Briefcase, RefreshCw, CheckCircle, XCircle, ShieldCheck, Zap } from 'lucide-react';
import { INTERNSHIPS, getInternshipMatchScore } from '../data/mockData';

export default function InternshipEngine({ 
  careerData, 
  completedProjectIds, 
  activeGoal, 
  stats,
  onAddStats,
  onUpdateInternshipStatus,
  internshipList
}) {
  const [filterType, setFilterType] = useState("All");
  const [applyingId, setApplyingId] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [matchStatus, setMatchStatus] = useState(null); // 'approved' | 'rejected'
  const [matchResultMsg, setMatchResultMsg] = useState("");

  const filteredInternships = internshipList.filter(item => {
    if (filterType === "All") return true;
    return item.type === filterType;
  });

  const handleApply = (internship) => {
    setApplyingId(internship.id);
    setEvaluating(true);
    setMatchStatus(null);
    setMatchResultMsg("");

    const matchScore = getInternshipMatchScore(internship, careerData.skills);

    setTimeout(() => {
      setEvaluating(false);
      
      if (matchScore >= 55) {
        setMatchStatus('approved');
        setMatchResultMsg(`🎉 GRAPH MATCH SUCCESSFUL (Score: ${matchScore}%) 🎉\n\nAI matching engine has verified your skill signatures against the company requirement graphs. You are admitted! \n\nRewards Claimed: +${internship.rewards.xp} XP, +${internship.rewards.credits} Credits, +${internship.rewards.reputation} Reputation.`);
        
        onUpdateInternshipStatus(internship.id, 'approved');
        onAddStats(internship.rewards.xp, internship.rewards.credits, internship.rewards.reputation);
      } else {
        setMatchStatus('rejected');
        
        // Find missing requirements to give advice
        const missingGaps = internship.requirements.map(req => {
          const userSkill = careerData.skills.find(s => s.name === req.name);
          const currentVal = userSkill ? userSkill.current : 0;
          if (currentVal < req.minLevel) {
            return `"${req.name}" (Need: ${req.minLevel}%, You have: ${currentVal}%)`;
          }
          return null;
        }).filter(Boolean);

        setMatchResultMsg(`❌ GRAPH MATCH FAILURE (Score: ${matchScore}%) ❌\n\nYour verified skill graph does not yet satisfy company requirement weights.\n\nUnmet Gaps:\n${missingGaps.join("\n")}\n\nAI Advisor Recommendation:\nBrowse the Marketplace and build relevant projects to boost these specific skills!`);
      }
    }, 2200);
  };

  return (
    <div className="internship-engine-container">
      {/* Engine Header */}
      <div className="glass-panel" style={{ marginBottom: '2rem', background: 'radial-gradient(circle at top left, rgba(124, 58, 237, 0.1), transparent), var(--bg-card)' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
          AI Internship Engine
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Traditional resumes are obsolete. We match your **Verified Skill Graph** directly with real-time **Company Requirement Graphs**.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
        
        {/* Left Column: Student Skill Graph visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-emerald)' }} />
              Student Skill Graph
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '-0.5rem' }}>
              Verified ledger values accumulated from completed marketplace items for <strong style={{ color: 'var(--accent-cyan)' }}>{activeGoal}</strong>.
            </span>

            <div className="skills-container" style={{ marginTop: '0.5rem' }}>
              {careerData.skills.map(skill => (
                <div key={skill.name} className="skill-row" style={{ gap: '0.35rem' }}>
                  <div className="skill-info" style={{ fontSize: '0.8rem' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{skill.current}%</span>
                  </div>
                  <div className="skill-bar-track" style={{ height: '7px' }}>
                    <div className="skill-bar-fill" style={{ width: `${skill.current}%`, background: 'linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan))' }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Completed Projects: <strong style={{ color: '#fff' }}>{completedProjectIds.length}</strong> verified briefs.
            </div>
          </div>

          {/* Verification Console Output */}
          {applyingId && (
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#fff' }}>
                AI Graph Match Console
              </h4>
              
              {evaluating ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '1.5rem 0' }}>
                  <RefreshCw className="spin" size={28} style={{ color: 'var(--accent-cyan)', animation: 'spin 1.5s linear infinite' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Comparing student and corporate graphs...</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: matchStatus === 'approved' ? '#34d399' : '#f43f5e' }}>
                    {matchStatus === 'approved' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    <strong style={{ fontSize: '0.9rem' }}>
                      {matchStatus === 'approved' ? 'Match Successful!' : 'Match Terminated'}
                    </strong>
                  </div>
                  <div className={`feedback-area ${matchStatus === 'approved' ? 'success' : 'error'}`} style={{ fontSize: '0.8rem', whiteSpace: 'pre-line' }}>
                    {matchResultMsg}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: Internship Matches */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Matches Header / Category Filter */}
          <div className="glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={20} style={{ color: 'var(--accent-violet)' }} />
                Graph-Matched Openings
              </h3>

              <div className="filter-group">
                {["All", "Micro Internship", "Remote Project", "Startup Internship"].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`filter-btn ${filterType === type ? 'active' : ''}`}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                  >
                    {type.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Openings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredInternships.map(intern => {
                const score = getInternshipMatchScore(intern, careerData.skills);
                const isApproved = intern.status === 'approved';
                const isUnderEvaluation = applyingId === intern.id && evaluating;

                return (
                  <div key={intern.id} className="glass-panel" style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', background: 'rgba(255, 255, 255, 0.01)', borderLeft: `4px solid ${isApproved ? 'var(--accent-emerald)' : 'var(--border-color)'}` }}>
                    
                    {/* Cover image thumbnail */}
                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${intern.image})`, flexShrink: 0 }} />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                            {intern.company} ({intern.companyType}) • {intern.type}
                          </span>
                          <h4 style={{ fontSize: '1.1rem', margin: '0.15rem 0' }}>{intern.title}</h4>
                        </div>

                        {/* Match Meter Score */}
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match Score</span>
                          <strong style={{ display: 'block', fontSize: '1.1rem', color: score >= 60 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444' }}>
                            {score}%
                          </strong>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.5rem 0', lineHeight: 1.4 }}>
                        {intern.description}
                      </p>

                      {/* Required graphs comparison */}
                      <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', margin: '0.75rem 0' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>REQUIRED SKILL WEIGHTS:</span>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          {intern.requirements.map(req => {
                            const userSkill = careerData.skills.find(s => s.name === req.name);
                            const currentVal = userSkill ? userSkill.current : 0;
                            const isMet = currentVal >= req.minLevel;

                            return (
                              <span key={req.name} style={{ fontSize: '0.7rem', color: isMet ? '#34d399' : '#f472b6', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {isMet ? '●' : '○'} {req.name} (Need: {req.minLevel}%)
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Apply buttons */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <span>⏱️ {intern.duration}</span>
                          <span>🏆 +{intern.rewards.xp} XP</span>
                        </div>

                        <button
                          onClick={() => handleApply(intern)}
                          disabled={isApproved || isUnderEvaluation}
                          className={`btn ${isApproved ? 'btn-success' : 'btn-primary'}`}
                          style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', boxShadow: 'none' }}
                        >
                          {isApproved ? 'Joined Successfully ✓' : isUnderEvaluation ? 'Matching Graph...' : 'Match & Apply'}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
