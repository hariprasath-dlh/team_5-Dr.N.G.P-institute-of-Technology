import React, { useState, useRef, useEffect } from 'react';
import { Target, Send, MessageSquare, Award, BookOpen, AlertTriangle, Plus, Database } from 'lucide-react';
import { getAIAdvisorResponse } from '../data/mockData';

export default function CareerTwin({ 
  careerPaths,
  activeGoal, 
  onGoalChange, 
  careerData, 
  onToggleWeeklyGoal,
  onAddMessage,
  chatHistory
}) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeGoal || !careerData) return;

    const studentMessage = inputText.trim();
    setInputText("");
    
    // Add student message to history
    onAddMessage({
      sender: 'student',
      text: studentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Simulate AI Advisor typing response
    setTimeout(() => {
      const completedStepsCount = careerData.roadmap ? careerData.roadmap.filter(s => s.status === 'completed').length : 0;
      const responseText = getAIAdvisorResponse(activeGoal, studentMessage, completedStepsCount);
      
      onAddMessage({
        sender: 'advisor',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 800);
  };

  // If no career paths exist, show empty state with instructions
  if (!careerPaths || Object.keys(careerPaths).length === 0) {
    return (
      <div className="career-twin-container" style={{ gridTemplateColumns: '1fr' }}>
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Target size={48} style={{ color: 'var(--accent-violet)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI Career Twin Offline</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto', fontSize: '0.9rem', lineHeight: 1.5 }}>
            You haven't defined any career specializations yet. Define a pathway to activate your personalized AI Advisor, skill graph, and roadmap checklist.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={() => {
                // We'll switch to the manage data tab
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
    <div className="career-twin-container">
      {/* Sidebar: Advisor Selector & Skill Gap */}
      <div className="advisor-sidebar">
        
        {/* Advisor Career Choice */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={20} style={{ color: 'var(--accent-violet)' }} />
            <h3 style={{ fontSize: '1.15rem' }}>Advisor Career Goal</h3>
          </div>
          
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
              SELECT ADVISOR SPECIALIZATION
            </label>
            <select 
              value={activeGoal} 
              onChange={(e) => onGoalChange(e.target.value)}
              className="goal-selector"
            >
              {Object.keys(careerPaths).map(path => (
                <option key={path} value={path}>{path}</option>
              ))}
            </select>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
            {careerData?.description || "Select a specialization to view its profile."}
          </p>
        </div>

        {/* Skill Gap Analysis */}
        {careerData?.skills && careerData.skills.length > 0 && (
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} style={{ color: 'var(--accent-cyan)' }} />
              <h3 style={{ fontSize: '1.15rem' }}>Skill Gap Analysis</h3>
            </div>

            <div className="skills-container">
              {careerData.skills.map(skill => {
                const gap = Math.max(0, skill.required - skill.current);
                return (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span style={{ color: gap > 0 ? '#fb7185' : '#34d399', fontWeight: 600 }}>
                        {skill.current}% / {skill.required}%
                      </span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: `${skill.current}%` }}></div>
                      <div className="skill-bar-target" style={{ left: `${skill.required}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(244, 63, 94, 0.05)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(244, 63, 94, 0.15)' }}>
              <AlertTriangle size={16} style={{ color: '#fb7185', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                Red markers represent industry standard targets for junior entry. Bridge gaps by completing matched marketplace projects.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Main Area: Chat & Roadmap Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Grid of Chat and Weekly Goals */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          
          {/* Chat Module */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', height: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <MessageSquare size={20} style={{ color: 'var(--accent-violet)' }} />
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Chat with AI Career Twin</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>● Online Advisor</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-box" style={{ flex: 1, border: 'none', background: 'transparent' }}>
              <div className="chat-messages">
                {chatHistory.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', margin: 'auto' }}>
                    Send a message to initialize chat with your AI Career Twin.
                  </p>
                ) : (
                  chatHistory.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                      <div className="message-avatar">
                        {msg.sender === 'advisor' ? 'AI' : 'ME'}
                      </div>
                      <div className="message-bubble">
                        <p>{msg.text}</p>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.25rem' }}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="chat-input-area" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <input 
                type="text" 
                placeholder="Ask about skill gaps, roadmap resources, or project briefs..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chat-input"
                disabled={!activeGoal}
              />
              <button type="submit" className="chat-submit-btn" disabled={!activeGoal}>
                <Send size={16} color="#fff" />
              </button>
            </form>
          </div>

          {/* Weekly Goals Checklist */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>Weekly Career Goals</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Complete weekly challenges suggested by your AI advisor to gain XP and levels.
              </p>
            </div>

            <div className="goals-list" style={{ flex: 1, overflowY: 'auto' }}>
              {!careerData?.weeklyGoals || careerData.weeklyGoals.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', margin: 'auto' }}>
                  No weekly goals configured for this path.
                </p>
              ) : (
                careerData.weeklyGoals.map(goal => (
                  <div 
                    key={goal.id} 
                    className={`goal-item ${goal.completed ? 'completed' : ''}`}
                    onClick={() => onToggleWeeklyGoal(goal.id, goal.xpReward)}
                  >
                    <div className="goal-checkbox">
                      {goal.completed && <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '1px' }}></div>}
                    </div>
                    <span className="goal-text">{goal.text}</span>
                    <span className="goal-reward">+{goal.xpReward} XP</span>
                  </div>
                ))
              )}
            </div>
            
            <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Goals refresh in <strong style={{ color: 'var(--accent-cyan)' }}>2 days</strong>
            </div>
          </div>

        </div>

        {/* Roadmap Timeline */}
        {careerData?.roadmap && careerData.roadmap.length > 0 && (
          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <BookOpen size={20} style={{ color: 'var(--accent-violet)' }} />
              <h3 style={{ fontSize: '1.15rem' }}>Interactive Career Roadmap</h3>
            </div>

            <div className="roadmap-timeline">
              {careerData.roadmap.map((step, idx) => (
                <div key={step.id} className={`roadmap-node ${step.status}`}>
                  <div className="node-dot"></div>
                  <div className="node-header">
                    <h4 style={{ fontSize: '1rem', color: '#fff' }}>
                      {idx + 1}. {step.title}
                    </h4>
                    <span className={`node-badge ${step.status}`}>
                      {step.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {step.description}
                  </p>
                  
                  {step.status !== 'locked' && step.resources && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>RECOMMENDED STUDY MATERIAL:</span>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {step.resources.map((res, rIdx) => (
                          <span key={rIdx} style={{ fontSize: '0.75rem', background: 'rgba(124, 58, 237, 0.1)', color: '#c084fc', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                            📚 {res}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
