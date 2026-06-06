import React from 'react';
import { Award, Briefcase, Calendar, ShieldCheck, Download, Sparkles, Database } from 'lucide-react';

export default function Portfolio({ 
  stats, 
  completedProjectIds = [], 
  activeGoal, 
  wonChallengeIds = [],
  projects = [],
  challenges = []
}) {
  // Get details of completed projects
  const completedProjects = projects.filter(proj => completedProjectIds.includes(proj.id));

  // Get details of won challenges
  const wonChallenges = challenges.filter(ch => wonChallengeIds.includes(ch.id));

  // Gather all skills verified by completed projects
  const verifiedSkills = [...new Set([
    ...completedProjects.flatMap(proj => proj.skillsEarned || []),
    ...wonChallenges.map(ch => ch.requiredSkill)
  ])].filter(Boolean);

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="portfolio-container">
      {/* Portfolio Header */}
      <div className="glass-panel portfolio-header" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div className="portfolio-avatar">
          ST
        </div>
        <div className="portfolio-info" style={{ flex: 1, minWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Student Scholar</h2>
            {activeGoal && (
              <span style={{ fontSize: '0.75rem', background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(124, 58, 237, 0.3)', color: '#c084fc', padding: '0.2rem 0.6rem', borderRadius: '99px', fontWeight: 700 }}>
                {activeGoal} PATHWAY
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Active student builder at CareerTwin.ai. Learning by building micro-applications and launching products for real businesses and communities.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={16} /> Joined June 2026
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={16} /> Verified Identity
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginTop: '2rem' }}>
        {/* Left Column: Verified Skills & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Stats Breakdown */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Credentials
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Level Rank</span>
              <strong style={{ color: '#c084fc' }}>Level {stats.level}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Experience Points (XP)</span>
              <strong>{stats.xp} XP</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Portfolio Credits</span>
              <strong style={{ color: '#f472b6' }}>{stats.portfolioCredits} Credits</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Reputation Score</span>
              <strong style={{ color: '#22d3ee' }}>{stats.reputationScore} Rep</strong>
            </div>
          </div>

          {/* Verified Skills */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Verified Skill Badges
            </h3>
            
            {verifiedSkills.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', padding: '1rem 0' }}>
                No verified skills yet. Complete projects in the marketplace to verify your skills.
              </p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {verifiedSkills.map(skill => (
                  <span key={skill} className="project-tag" style={{ background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34d399', fontSize: '0.8rem', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: 600 }}>
                    🛡️ {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project History, Arena awards, & Certificate */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Innovation Arena Awards */}
          {wonChallenges.length > 0 && (
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'radial-gradient(circle at top right, rgba(124,58,237,0.08), transparent), var(--bg-card)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <Sparkles size={20} style={{ color: 'var(--accent-violet)' }} />
                Innovation Arena Prizes Won
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {wonChallenges.map(ch => (
                  <div key={ch.id} style={{ display: 'flex', justify: 'space-between', padding: '1rem', background: 'rgba(124, 58, 237, 0.03)', border: '1px solid rgba(124, 58, 237, 0.15)', borderRadius: '10px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                        {ch.host} • {ch.category}
                      </span>
                      <h4 style={{ fontSize: '1.1rem', margin: '0.15rem 0' }}>{ch.title}</h4>
                      {ch.rewards && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginTop: '0.4rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <span>💰 Capital: <strong>{ch.rewards.grant}</strong></span>
                          <span>🏢 Workspace: <strong>{ch.rewards.incubation}</strong></span>
                          <span>💼 Role Offer: <strong>{ch.rewards.offer}</strong></span>
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700, display: 'block' }}>Jury Winner ✓</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+{ch.rewards?.reputation} Rep</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project History */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Completed Projects Registry
            </h3>

            {completedProjects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', border: '1px dashed var(--border-color)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                <Briefcase size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '0.9rem' }}>No completed projects. Build systems, apps, and automations for clients in the marketplace to populate your registry.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {completedProjects.map(proj => (
                  <div key={proj.id} className="glass-panel" style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.01)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                        {proj.sponsor} ({proj.sponsorType})
                      </div>
                      <h4 style={{ fontSize: '1.1rem', margin: '0.2rem 0' }}>{proj.title}</h4>
                      {proj.skillsEarned && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                          {proj.skillsEarned.slice(0, 3).map(skill => (
                            <span key={skill} style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, display: 'block' }}>Verified ✓</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+{proj.rewards?.credits} Credits</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certificate Module */}
          {completedProjects.length > 0 ? (
            <div className="certificate-card">
              <div className="certificate-border"></div>
              <div className="certificate-logo">CareerTwin.ai</div>
              
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem', fontWeight: 800 }}>
                CERTIFICATE OF ACHIEVEMENT
              </span>
              
              <h4 style={{ fontFamily: 'var(--font-display)' }}>Student Scholar</h4>
              
              <p>
                has successfully completed industry-aligned project briefs in the <strong style={{ color: '#fff' }}>{activeGoal}</strong> specialization pathway. This includes building operational solutions for startups, NGOs, and local businesses, thereby demonstrating validated practical proficiency.
              </p>

              <div style={{ display: 'flex', justify: 'center', gap: '1.5rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
                  Total Credits: <strong style={{ color: '#f472b6' }}>{stats.portfolioCredits}</strong>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
                  Verified Skills: <strong style={{ color: '#34d399' }}>{verifiedSkills.length}</strong>
                </div>
              </div>

              <div className="certificate-signature-row">
                <div className="signature">
                  <div style={{ fontStyle: 'italic', fontFamily: 'serif', fontSize: '1rem', color: '#a78bfa', marginBottom: '0.2rem' }}>
                    AI Advisor Twin
                  </div>
                  Advisor Core Engine
                </div>
                <div className="signature">
                  <div style={{ fontStyle: 'italic', fontFamily: 'serif', fontSize: '1rem', color: '#67e8f9', marginBottom: '0.2rem' }}>
                    Verified Ledger
                  </div>
                  CareerTwin.ai Board
                </div>
              </div>

              <button 
                onClick={handlePrintCertificate}
                className="btn btn-secondary" 
                style={{ marginTop: '2rem', display: 'inline-flex', gap: '0.5rem', alignSelf: 'center' }}
              >
                <Download size={16} /> Print/Download Certificate
              </button>
            </div>
          ) : (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'rgba(255, 255, 255, 0.01)' }}>
              <Award size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Certificate Locked</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
                Complete at least one marketplace project to unlock your shareable Certificate of Achievement.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
