import React, { useState } from 'react';
import { Users, UserPlus, Target, Award, Heart, MessageSquare, Plus } from 'lucide-react';
import { MOCK_PEERS } from '../data/mockData';

export default function PeerNetwork({ activeGoal, activeSquadPeers, onInvitePeer, onRemovePeer }) {
  const [filterMode, setFilterMode] = useState("Goal Matches");
  const [squadName, setSquadName] = useState("Alpha Squad");
  const [squadType, setSquadType] = useState("Learning Squad");
  
  // Custom message history for active squads
  const [squadMessages, setSquadMessages] = useState([
    { sender: "Sarah Kim", text: "Hey team! Ready to crush the next product brief?", time: "2 hours ago" },
    { sender: "Elena Rostova", text: "Absolutely, I can handle the frontend wireframes.", time: "1 hour ago" }
  ]);
  const [newMsg, setNewMsg] = useState("");

  // Filter mock peers based on selected path
  const recommendedPeers = MOCK_PEERS.filter(peer => {
    if (activeSquadPeers.includes(peer.id)) return false; // Hide if already in squad
    
    if (filterMode === "Goal Matches") {
      return peer.targetGoal === activeGoal;
    }
    if (filterMode === "Interests") {
      // Find matches that share interest categories with active goal
      const interestKeywords = {
        "Product Manager": ["SaaS", "Mobile Design", "Fintech", "EdTech", "UX Wireframes"],
        "AI Engineer": ["Generative AI", "NLP", "Robotics", "MLOps", "FastAPI"],
        "Frontend Developer": ["Web Accessibility", "Creative Layouts", "SaaS UI", "TailwindCSS", "NextJS"]
      };
      const targets = interestKeywords[activeGoal] || [];
      return peer.interests.some(interest => targets.includes(interest));
    }
    return true;
  });

  const getCompatibilityScore = (peer) => {
    if (peer.targetGoal === activeGoal) return 98;
    return 85;
  };

  const handleSendSquadMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    setSquadMessages(prev => [
      ...prev,
      { sender: "You", text: newMsg.trim(), time: "Just now" }
    ]);
    setNewMsg("");

    // Simulate peer replying
    setTimeout(() => {
      const activePeersInSquad = MOCK_PEERS.filter(p => activeSquadPeers.includes(p.id));
      if (activePeersInSquad.length > 0) {
        const randomPeer = activePeersInSquad[Math.floor(Math.random() * activePeersInSquad.length)];
        setSquadMessages(prev => [
          ...prev,
          { 
            sender: randomPeer.name, 
            text: `Awesome input! Let's incorporate that into our marketplace submission.`, 
            time: "Just now" 
          }
        ]);
      }
    }, 1200);
  };

  const currentSquadMembers = MOCK_PEERS.filter(p => activeSquadPeers.includes(p.id));

  return (
    <div className="peer-network-container">
      {/* Network Header */}
      <div className="glass-panel" style={{ marginBottom: '2rem', background: 'radial-gradient(circle at top left, rgba(6, 182, 212, 0.1), transparent), var(--bg-card)' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
          Peer Learning Network
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Form teams to work on marketplace projects. Learn faster by building together in cohorts.
        </p>
      </div>

      {/* Main Network Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Peer Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} style={{ color: 'var(--accent-cyan)' }} />
                AI Peer Matches
              </h3>
              
              <div className="filter-group">
                {["Goal Matches", "Interests", "All Peers"].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setFilterMode(mode)}
                    className={`filter-btn ${filterMode === mode ? 'active' : ''}`}
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {recommendedPeers.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0', fontStyle: 'italic' }}>
                No new matches found in this category. You have invited everyone!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recommendedPeers.map(peer => (
                  <div key={peer.id} className="glass-panel" style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', background: 'rgba(255, 255, 255, 0.01)', position: 'relative' }}>
                    
                    {/* Compatibility Rating */}
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.2)', fontWeight: 700 }}>
                      {getCompatibilityScore(peer)}% Match
                    </div>

                    {/* Avatar Circle */}
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 700, fontSize: '1.1rem', flexShrink: 0 }}>
                      {peer.avatar}
                    </div>

                    {/* Peer Description */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{peer.name}</h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.25rem 0' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-violet)', fontWeight: 600 }}>
                          🎯 {peer.targetGoal}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.5rem 0', lineHeight: 1.4 }}>
                        {peer.bio}
                      </p>

                      {/* Skills Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.5rem' }}>
                        {peer.skills.map(s => (
                          <span key={s} className="project-tag" style={{ fontSize: '0.7rem' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                      
                      {/* Interest Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.3rem' }}>
                        {peer.interests.map(int => (
                          <span key={int} className="project-tag" style={{ fontSize: '0.7rem', borderColor: 'transparent', background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>
                            #{int}
                          </span>
                        ))}
                      </div>
                      
                      {/* Invitation Actions */}
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <button 
                          onClick={() => onInvitePeer(peer.id)}
                          className="btn btn-primary" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', boxShadow: 'none' }}
                        >
                          <UserPlus size={12} /> Invite to Squad
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Squad Dashboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Squad Setup */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={20} style={{ color: 'var(--accent-violet)' }} />
              Active Squad Console
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.5rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>SQUAD NAME</label>
                <input 
                  type="text" 
                  value={squadName} 
                  onChange={e => setSquadName(e.target.value)} 
                  className="form-input" 
                  style={{ padding: '0.5rem', fontSize: '0.8rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>SQUAD TYPE</label>
                <select 
                  value={squadType} 
                  onChange={e => setSquadType(e.target.value)}
                  className="goal-selector"
                  style={{ padding: '0.5rem', fontSize: '0.8rem', height: '36px' }}
                >
                  <option value="Learning Squad">Learning Squad</option>
                  <option value="Hackathon Team">Hackathon Team</option>
                  <option value="Study Circle">Study Circle</option>
                </select>
              </div>
            </div>
          </div>

          {/* Squad Roster */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#fff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Roster ({currentSquadMembers.length + 1} Members)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Current Student Profile */}
              <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', padding: '0.5rem', background: 'rgba(124,58,237,0.05)', borderRadius: '8px', border: '1px solid rgba(124,58,237,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent-violet)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                    ME
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>You (Student Scholar)</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-violet)', fontWeight: 700 }}>LEADER</span>
              </div>

              {/* Squad Teammates */}
              {currentSquadMembers.map(peer => (
                <div key={peer.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                      {peer.avatar}
                    </div>
                    <span style={{ fontSize: '0.85rem' }}>{peer.name}</span>
                  </div>
                  <button 
                    onClick={() => onRemovePeer(peer.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              {currentSquadMembers.length === 0 && (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem 0', fontStyle: 'italic' }}>
                  Your squad is empty. Invite matched peers from the list to begin collaborating.
                </p>
              )}
            </div>
          </div>

          {/* Squad Collaborative Chat Workspace */}
          {currentSquadMembers.length > 0 && (
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '280px', padding: '1rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#fff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MessageSquare size={16} style={{ color: 'var(--accent-cyan)' }} />
                Squad Chat: {squadName}
              </h4>
              
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexText: 'column', flexDirection: 'column', gap: '0.5rem', padding: '0.25rem', marginBottom: '0.5rem' }}>
                {squadMessages.map((msg, index) => (
                  <div key={index} style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid var(--border-color)', alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                    <strong style={{ color: msg.sender === 'You' ? 'var(--accent-violet)' : 'var(--accent-cyan)', display: 'block', fontSize: '0.7rem' }}>
                      {msg.sender} ({msg.time})
                    </strong>
                    <span style={{ color: 'var(--text-primary)' }}>{msg.text}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendSquadMessage} style={{ display: 'flex', gap: '0.25rem' }}>
                <input 
                  type="text" 
                  placeholder={`Send to ${squadName}...`} 
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.4rem', fontSize: '0.8rem', flex: 1 }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  Send
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
