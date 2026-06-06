import React from 'react';
import { ShieldAlert, Star, TrendingUp, Award, Users, Briefcase, Layout } from 'lucide-react';
import { calculateEmployabilityScore, MENTOR_REVIEWS } from '../data/mockData';

export default function EmployabilityScore({ 
  stats, 
  careerData, 
  completedProjectIds, 
  completedInternshipIds, 
  activeSquadPeers 
}) {
  const completedProjectsCount = completedProjectIds.length;
  const completedInternshipsCount = completedInternshipIds.length;
  const squadPeersCount = activeSquadPeers.length;

  const score = calculateEmployabilityScore(
    stats, 
    careerData.skills, 
    completedProjectsCount, 
    completedInternshipsCount, 
    squadPeersCount
  );

  const getTier = (scoreVal) => {
    if (scoreVal >= 850) return { label: "Elite", color: "#10b981", desc: "Top 2% of candidates globally. Readily deployable to enterprise teams." };
    if (scoreVal >= 700) return { label: "Very Good", color: "#06b6d4", desc: "Highly competitive. Meets requirements for leading startup roles." };
    if (scoreVal >= 550) return { label: "Good", color: "#7c3aed", desc: "Solid baseline credentials. Work on high-difficulty projects to elevate." };
    return { label: "Needs Work", color: "#fb7185", desc: "Early builder. Focus on completing roadmap modules and joining squad circles." };
  };

  const tier = getTier(score);

  // SVG Gauge calculations
  const radius = 80;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Arc is half circle (180 degrees) or 3/4 circle. Let's do 3/4 circle (270 degrees).
  // Stroke dashoffset for gauge fill
  const percentage = score / 1000;
  const strokeDashoffset = circumference * (1 - (percentage * 0.75)); // Gauge takes up 75% of full circle

  return (
    <div className="employability-container">
      {/* Header */}
      <div className="glass-panel" style={{ marginBottom: '2rem', background: 'radial-gradient(circle at top left, rgba(6, 182, 212, 0.1), transparent), var(--bg-card)' }}>
        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
          Employability Score Card
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Your verified credentials aggregated into a unified career readiness index.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '1.5rem' }}>
        
        {/* Left Column: Speedometer Arc Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Your Readiness Index</h3>
            
            {/* Speedometer SVG */}
            <div style={{ position: 'relative', width: '200px', height: '180px' }}>
              <svg width="200" height="200" style={{ transform: 'rotate(135deg)' }}>
                {/* Background arc */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * 0.25} // covers 75% of circle
                  strokeLinecap="round"
                />
                {/* Foreground filled arc */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke={tier.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                />
              </svg>

              {/* Text inside gauge */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-10px)' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff' }}>
                  {score}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>OUT OF 1000</span>
              </div>
            </div>

            {/* Tier description */}
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: tier.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {tier.label}
              </span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.4 }}>
                {tier.desc}
              </p>
            </div>

            {/* Micro rating comparison */}
            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', width: '100%', marginTop: '1.5rem', paddingTop: '1rem', justify: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <TrendingUp size={16} style={{ color: '#10b981' }} />
              <span>Score increased by <strong style={{ color: '#10b981' }}>+45 pts</strong> this week</span>
            </div>
          </div>
        </div>

        {/* Right Column: Metrics Breakdown & Mentor Reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Scorecard breakdown */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem' }}>Scorecard Weight Parameters</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              
              {/* Projects weight */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PROJECTS SOLVED</span>
                  <Award size={16} style={{ color: 'var(--accent-violet)' }} />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{completedProjectsCount} / 3</div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Contribution: +{completedProjectsCount * 120} pts</span>
              </div>

              {/* Skill weight */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SKILL MASTERY</span>
                  <TrendingUp size={16} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {careerData.skills.length > 0 ? (careerData.skills.reduce((acc, curr) => acc + curr.current, 0) / careerData.skills.length).toFixed(0) : 0}%
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Contribution: +{Math.round((careerData.skills.reduce((acc, curr) => acc + curr.current, 0) / careerData.skills.length) * 3.5)} pts
                </span>
              </div>

              {/* Internship Weight */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>INTERNSHIPS</span>
                  <Briefcase size={16} style={{ color: 'var(--accent-emerald)' }} />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{completedInternshipsCount} completed</div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Contribution: +{completedInternshipsCount * 100} pts</span>
              </div>

              {/* Community Squad Weight */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SQUAD WORK</span>
                  <Users size={16} style={{ color: '#f472b6' }} />
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  {squadPeersCount > 0 ? 'Active Squad' : 'Inactive'}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Contribution: +{squadPeersCount > 0 ? 50 : 0} pts</span>
              </div>

            </div>
          </div>

          {/* Mentor Reviews Panel */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Verified Mentor Endorsements
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {MENTOR_REVIEWS.map(rev => (
                <div key={rev.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)' }}>
                  
                  {/* Rating icon circle */}
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.2)', color: 'var(--accent-violet)', display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                    <Star size={16} fill="var(--accent-violet)" />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{rev.mentor}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{rev.role}</span>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                        ★ {rev.rating} / 5.0
                      </span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.4, fontStyle: 'italic' }}>
                      "{rev.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
