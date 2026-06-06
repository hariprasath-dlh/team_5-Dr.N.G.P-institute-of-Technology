import React from 'react';
import { Award, Target, BookOpen, Briefcase, ChevronRight, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Dashboard({ 
  stats, 
  activeGoal, 
  careerData, 
  activeProjects, 
  onNavigate 
}) {
  const xpPercentage = stats.nextLevelXp > 0 ? (stats.xp / stats.nextLevelXp) * 100 : 0;
  
  // If no career pathway is active, show the setup portal.
  if (!careerData) {
    return (
      <div className="dashboard-content">
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem', background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.08), transparent), var(--bg-card)' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
            Welcome to CareerTwin.ai! 👋
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '1rem', lineHeight: 1.6 }}>
            Set up your professional pathway to activate your AI advisor, unlock tailored projects, monitor interactive roadmaps, and build verified portfolios.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justify: 'center', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px', width: '220px' }}>
              <Target size={24} style={{ color: 'var(--accent-violet)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>1. Add Pathway</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Define a specialization like Front-End, AI Dev, or Cyber Sec.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px', width: '220px' }}>
              <BookOpen size={24} style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>2. Load Projects</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Log active briefs from local businesses and startups.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px', width: '220px' }}>
              <Award size={24} style={{ color: 'var(--accent-emerald)', marginBottom: '0.5rem' }} />
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>3. Earn Credentials</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gain levels, ratings, and printable achievement credentials.</p>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('manage-data')} 
            className="btn btn-primary"
            style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
          >
            Create Specialization Pathway <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Calculate completed weekly goals
  const completedGoalsCount = careerData.weeklyGoals ? careerData.weeklyGoals.filter(g => g.completed).length : 0;
  const totalGoalsCount = careerData.weeklyGoals ? careerData.weeklyGoals.length : 0;
  const goalsPercentage = totalGoalsCount > 0 ? (completedGoalsCount / totalGoalsCount) * 100 : 0;

  // Next recommended roadmap step
  const nextRoadmapStep = careerData.roadmap ? (
    careerData.roadmap.find(step => step.status === 'active') || 
    careerData.roadmap.find(step => step.status === 'locked')
  ) : null;

  return (
    <div className="dashboard-content">
      {/* Welcome Header */}
      <div className="glass-panel" style={{ marginBottom: '2rem', background: 'radial-gradient(circle at top left, rgba(124, 58, 237, 0.1), transparent), var(--bg-card)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
          Welcome back, Student! 👋
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
          Your AI Career Twin is active. You are training to become a <strong style={{ color: 'var(--accent-cyan)' }}>{activeGoal}</strong>. Build projects, resolve skill gaps, and earn reputation credits.
        </p>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        {/* Level & XP */}
        <div className="glass-panel stat-card">
          <div className="stat-icon violet">
            <Zap size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>LEVEL {stats.level}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-violet)', fontWeight: 700 }}>{stats.xp}/{stats.nextLevelXp} XP</span>
            </div>
            <div className="progress-bar-container" style={{ height: '6px' }}>
              <div className="progress-bar-fill" style={{ width: `${xpPercentage}%` }}></div>
            </div>
          </div>
        </div>

        {/* Portfolio Credits */}
        <div className="glass-panel stat-card">
          <div className="stat-icon cyan">
            <Briefcase size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PORTFOLIO CREDITS</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {stats.portfolioCredits} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 400 }}>earned</span>
            </div>
          </div>
        </div>

        {/* Reputation Score */}
        <div className="glass-panel stat-card">
          <div className="stat-icon emerald">
            <Award size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>REPUTATION SCORE</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {stats.reputationScore} <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600 }}>+{(stats.reputationScore * 0.15).toFixed(0)} rank</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Main Grid */}
      <div className="dashboard-grid">
        {/* Left Side: Career Twin overview & Active Project */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* AI Career Twin Widget */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Target className="text-violet" style={{ color: 'var(--accent-violet)' }} />
                <h3 style={{ fontSize: '1.25rem' }}>AI Career Twin Guidance</h3>
              </div>
              <button 
                onClick={() => onNavigate('career-twin')} 
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                Open Advisor
              </button>
            </div>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem' }}>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                "{careerData.advisorGreeting ? careerData.advisorGreeting.slice(0, 110) : "Ask me anything about your dynamic career path..."}..."
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                Active Goal: {activeGoal}
              </div>
            </div>

            {nextRoadmapStep && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CURRENT ROADMAP FOCUS</div>
                <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(124, 58, 237, 0.05)', borderColor: 'rgba(124, 58, 237, 0.2)' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{nextRoadmapStep.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{nextRoadmapStep.description}</p>
                  </div>
                  <ChevronRight size={20} style={{ color: 'var(--accent-violet)', flexShrink: 0 }} />
                </div>
              </div>
            )}
          </div>

          {/* Active Marketplace Projects Widget */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BookOpen style={{ color: 'var(--accent-cyan)' }} />
                <h3 style={{ fontSize: '1.25rem' }}>Active Workspace Projects</h3>
              </div>
              <button 
                onClick={() => onNavigate('marketplace')} 
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                Browse Marketplace
              </button>
            </div>

            {activeProjects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>No active projects. Visit the Marketplace to accept real briefs from startups and NGOs.</p>
                <button onClick={() => onNavigate('marketplace')} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Find a Project
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeProjects.map(proj => (
                  <div key={proj.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {proj.sponsor} ({proj.sponsorType})
                      </div>
                      <h4 style={{ fontSize: '1.05rem', margin: '0.15rem 0' }}>{proj.title}</h4>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span>🏆 +{proj.rewards?.xp || 300} XP</span>
                        <span>⭐ +{proj.rewards?.credits || 2} Credits</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onNavigate('marketplace')} 
                      className="btn btn-primary" 
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', boxShadow: 'none' }}
                    >
                      Workspace
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Weekly Goals widget & Skill gaps preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Weekly Goals Widget */}
          {careerData.weeklyGoals && careerData.weeklyGoals.length > 0 && (
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Weekly Goals progress</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>Completed: {completedGoalsCount}/{totalGoalsCount}</span>
                  <span>{goalsPercentage.toFixed(0)}%</span>
                </div>
                <div className="progress-bar-container" style={{ height: '4px', marginTop: '0.5rem' }}>
                  <div className="progress-bar-fill" style={{ width: `${goalsPercentage}%`, background: 'var(--accent-emerald)' }}></div>
                </div>
              </div>

              <div className="goals-list" style={{ gap: '0.5rem' }}>
                {careerData.weeklyGoals.map(goal => (
                  <div 
                    key={goal.id} 
                    className={`goal-item ${goal.completed ? 'completed' : ''}`}
                    style={{ padding: '0.6rem 0.8rem', pointerEvents: 'none' }}
                  >
                    <div className="goal-checkbox">
                      {goal.completed && <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '1px' }}></div>}
                    </div>
                    <span className="goal-text" style={{ fontSize: '0.85rem' }}>{goal.text}</span>
                    <span className="goal-reward" style={{ fontSize: '0.7rem' }}>+{goal.xpReward} XP</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => onNavigate('career-twin')} 
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}
              >
                Update Goals Checklist
              </button>
            </div>
          )}

          {/* Skill gaps Preview */}
          {careerData.skills && careerData.skills.length > 0 && (
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Skill Gaps Preview</h3>
              
              <div className="skills-container" style={{ gap: '0.85rem' }}>
                {careerData.skills.slice(0, 3).map(skill => {
                  const gap = Math.max(0, skill.required - skill.current);
                  return (
                    <div key={skill.name} className="skill-row">
                      <div className="skill-info" style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{skill.name}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{skill.current}% / {skill.required}% (Gap: {gap}%)</span>
                      </div>
                      <div className="skill-bar-track" style={{ height: '6px' }}>
                        <div className="skill-bar-fill" style={{ width: `${skill.current}%` }}></div>
                        <div className="skill-bar-target" style={{ left: `${skill.required}%`, height: '12px', top: '-3px' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button 
                onClick={() => onNavigate('career-twin')} 
                className="btn btn-secondary" 
                style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}
              >
                View Full Skill Gap Analysis
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
