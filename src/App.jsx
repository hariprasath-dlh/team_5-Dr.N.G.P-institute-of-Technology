import React, { useState } from 'react';
import { Sparkles, Zap, Award } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CareerTwin from './components/CareerTwin';
import ProjectMarketplace from './components/ProjectMarketplace';
import Portfolio from './components/Portfolio';
import PeerNetwork from './components/PeerNetwork';
import InternshipEngine from './components/InternshipEngine';
import EmployabilityScore from './components/EmployabilityScore';
import InnovationArena from './components/InnovationArena';
import { CAREER_PATHS, INTERNSHIPS, PROJECTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeGoal, setActiveGoal] = useState('Product Manager');
  
  // Student statistics state
  const [stats, setStats] = useState({
    level: 1,
    xp: 250, // start with a little XP
    nextLevelXp: 1000,
    portfolioCredits: 0,
    reputationScore: 15
  });

  // Load career pathway data into local state so we can mutate weekly goals and skills dynamically
  const [careerDataMap, setCareerDataMap] = useState(CAREER_PATHS);

  // Active / completed project IDs in Marketplace
  const [activeProjectIds, setActiveProjectIds] = useState([]);
  const [completedProjectIds, setCompletedProjectIds] = useState([]);

  // Peer network squad state
  const [activeSquadPeers, setActiveSquadPeers] = useState([]);

  // Internship states
  const [internshipList, setInternshipList] = useState(INTERNSHIPS);
  const [completedInternshipIds, setCompletedInternshipIds] = useState([]);

  // Innovation Arena won challenge IDs
  const [wonChallengeIds, setWonChallengeIds] = useState([]);

  // Chat histories per career path
  const [chatHistoryMap, setChatHistoryMap] = useState({
    "Product Manager": [
      {
        sender: 'advisor',
        text: CAREER_PATHS["Product Manager"].advisorGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    "AI Engineer": [
      {
        sender: 'advisor',
        text: CAREER_PATHS["AI Engineer"].advisorGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ],
    "Frontend Developer": [
      {
        sender: 'advisor',
        text: CAREER_PATHS["Frontend Developer"].advisorGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  });

  // Level up detection logic helper
  const addXp = (amount, currentStats) => {
    let newXp = currentStats.xp + amount;
    let newLevel = currentStats.level;
    let nextXp = currentStats.nextLevelXp;

    if (newXp >= nextXp) {
      newXp = newXp - nextXp;
      newLevel += 1;
      nextXp = Math.floor(nextXp * 1.25); // increase threshold slightly
      
      // Visual feedback via advisor message trigger
      setTimeout(() => {
        alert(`🎉 LEVEL UP! You reached Level ${newLevel}!`);
      }, 100);
    } else if (newXp < 0) {
      newXp = 0; // prevent negative XP
    }

    return {
      ...currentStats,
      xp: newXp,
      level: newLevel,
      nextLevelXp: nextXp
    };
  };

  // Change active career goal
  const handleGoalChange = (newGoal) => {
    setActiveGoal(newGoal);
  };

  // Chat message management
  const handleAddChatMessage = (newMessage) => {
    setChatHistoryMap(prev => ({
      ...prev,
      [activeGoal]: [...prev[activeGoal], newMessage]
    }));
  };

  // Toggle Weekly Goal completion & reward XP
  const handleToggleWeeklyGoal = (goalId, xpReward) => {
    const activeCareer = careerDataMap[activeGoal];
    const goalIndex = activeCareer.weeklyGoals.findIndex(g => g.id === goalId);
    
    if (goalIndex === -1) return;
    
    const isNowCompleted = !activeCareer.weeklyGoals[goalIndex].completed;
    
    // Modify completed state
    const updatedGoals = [...activeCareer.weeklyGoals];
    updatedGoals[goalIndex] = {
      ...updatedGoals[goalIndex],
      completed: isNowCompleted
    };

    // Update career mapping
    setCareerDataMap(prev => ({
      ...prev,
      [activeGoal]: {
        ...activeCareer,
        weeklyGoals: updatedGoals
      }
    }));

    // Reward XP if marking completed, deduct if uncompleted
    const xpDifference = isNowCompleted ? xpReward : -xpReward;
    setStats(prev => addXp(xpDifference, prev));
  };

  // Accept a project brief from Marketplace
  const handleAcceptProject = (projectId) => {
    if (activeProjectIds.includes(projectId)) return;
    setActiveProjectIds(prev => [...prev, projectId]);
  };

  // Complete a project & update skills/roadmap/stats
  const handleCompleteProject = (projectId, xpReward, creditsReward, repReward) => {
    if (completedProjectIds.includes(projectId)) return;

    // Remove from active, add to completed
    setActiveProjectIds(prev => prev.filter(id => id !== projectId));
    setCompletedProjectIds(prev => [...prev, projectId]);

    // Update Student Stats
    setStats(prev => {
      const statsWithXp = addXp(xpReward, prev);
      return {
        ...statsWithXp,
        portfolioCredits: statsWithXp.portfolioCredits + creditsReward,
        reputationScore: statsWithXp.reputationScore + repReward
      };
    });

    // Update Career Path: Increment skills and update roadmap status
    const currentCareer = careerDataMap[activeGoal];
    
    // 1. Boost current skill metrics by +20% to +35% for skills in this career
    const updatedSkills = currentCareer.skills.map(skill => {
      const boost = Math.floor(Math.random() * 15) + 20; // 20-35% boost
      return {
        ...skill,
        current: Math.min(skill.required, skill.current + boost)
      };
    });

    // 2. Advance the roadmap step
    const updatedRoadmap = currentCareer.roadmap.map((step, index, arr) => {
      if (step.linkedProjectId === projectId) {
        return { ...step, status: 'completed' };
      }
      // If previous step just finished, activate this one
      if (index > 0 && arr[index - 1].linkedProjectId === projectId) {
        return { ...step, status: 'active' };
      }
      return step;
    });

    setCareerDataMap(prev => ({
      ...prev,
      [activeGoal]: {
        ...currentCareer,
        skills: updatedSkills,
        roadmap: updatedRoadmap
      }
    }));
  };

  // Squad Invite actions
  const handleInvitePeer = (peerId) => {
    if (activeSquadPeers.includes(peerId)) return;
    setActiveSquadPeers(prev => [...prev, peerId]);
  };

  const handleRemovePeer = (peerId) => {
    setActiveSquadPeers(prev => prev.filter(id => id !== peerId));
  };

  // Internship Rewards Callback
  const handleAddInternshipStats = (xpReward, creditsReward, repReward) => {
    setStats(prev => {
      const statsWithXp = addXp(xpReward, prev);
      return {
        ...statsWithXp,
        portfolioCredits: statsWithXp.portfolioCredits + creditsReward,
        reputationScore: statsWithXp.reputationScore + repReward
      };
    });
  };

  // Update Internship Status
  const handleUpdateInternshipStatus = (internshipId, status) => {
    setInternshipList(prev => prev.map(intern => {
      if (intern.id === internshipId) {
        return { ...intern, status };
      }
      return intern;
    }));
    if (status === 'approved') {
      setCompletedInternshipIds(prev => [...prev, internshipId]);
    }
  };

  // Win Challenge in Innovation Arena
  const handleWinChallenge = (challengeId, xpReward, repReward) => {
    if (wonChallengeIds.includes(challengeId)) return;
    setWonChallengeIds(prev => [...prev, challengeId]);
    setStats(prev => {
      const statsWithXp = addXp(xpReward, prev);
      return {
        ...statsWithXp,
        reputationScore: statsWithXp.reputationScore + repReward
      };
    });
  };

  // Renders the specific component based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            stats={stats}
            activeGoal={activeGoal}
            careerData={careerDataMap[activeGoal]}
            activeProjects={PROJECTS.filter(p => activeProjectIds.includes(p.id))}
            onNavigate={setActiveTab}
          />
        );
      case 'career-twin':
        return (
          <CareerTwin 
            activeGoal={activeGoal}
            onGoalChange={handleGoalChange}
            careerData={careerDataMap[activeGoal]}
            onToggleWeeklyGoal={handleToggleWeeklyGoal}
            onAddMessage={handleAddChatMessage}
            chatHistory={chatHistoryMap[activeGoal]}
          />
        );
      case 'marketplace':
        return (
          <ProjectMarketplace 
            stats={stats}
            activeProjectIds={activeProjectIds}
            completedProjectIds={completedProjectIds}
            onAcceptProject={handleAcceptProject}
            onCompleteProject={handleCompleteProject}
            activeGoal={activeGoal}
          />
        );
      case 'peers':
        return (
          <PeerNetwork 
            activeGoal={activeGoal}
            activeSquadPeers={activeSquadPeers}
            onInvitePeer={handleInvitePeer}
            onRemovePeer={handleRemovePeer}
          />
        );
      case 'internships':
        return (
          <InternshipEngine 
            careerData={careerDataMap[activeGoal]}
            completedProjectIds={completedProjectIds}
            activeGoal={activeGoal}
            stats={stats}
            onAddStats={handleAddInternshipStats}
            onUpdateInternshipStatus={handleUpdateInternshipStatus}
            internshipList={internshipList}
          />
        );
      case 'score':
        return (
          <EmployabilityScore 
            stats={stats}
            careerData={careerDataMap[activeGoal]}
            completedProjectIds={completedProjectIds}
            completedInternshipIds={completedInternshipIds}
            activeSquadPeers={activeSquadPeers}
          />
        );
      case 'arena':
        return (
          <InnovationArena 
            careerData={careerDataMap[activeGoal]}
            wonChallengeIds={wonChallengeIds}
            onWinChallenge={handleWinChallenge}
            stats={stats}
          />
        );
      case 'portfolio':
        return (
          <Portfolio 
            stats={stats}
            completedProjectIds={completedProjectIds}
            activeGoal={activeGoal}
            wonChallengeIds={wonChallengeIds}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Top Glass Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <Sparkles size={24} style={{ color: 'var(--accent-cyan)' }} />
          <span>CareerTwin.ai</span>
        </div>

        <div className="nav-links">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('career-twin')} 
            className={`nav-item ${activeTab === 'career-twin' ? 'active' : ''}`}
          >
            AI Twin
          </button>
          <button 
            onClick={() => setActiveTab('marketplace')} 
            className={`nav-item ${activeTab === 'marketplace' ? 'active' : ''}`}
          >
            Marketplace
          </button>
          <button 
            onClick={() => setActiveTab('peers')} 
            className={`nav-item ${activeTab === 'peers' ? 'active' : ''}`}
          >
            Squads
          </button>
          <button 
            onClick={() => setActiveTab('internships')} 
            className={`nav-item ${activeTab === 'internships' ? 'active' : ''}`}
          >
            Internships
          </button>
          <button 
            onClick={() => setActiveTab('score')} 
            className={`nav-item ${activeTab === 'score' ? 'active' : ''}`}
          >
            Readiness Score
          </button>
          <button 
            onClick={() => setActiveTab('arena')} 
            className={`nav-item ${activeTab === 'arena' ? 'active' : ''}`}
          >
            Innovation Arena
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')} 
            className={`nav-item ${activeTab === 'portfolio' ? 'active' : ''}`}
          >
            Portfolio
          </button>
        </div>

        {/* Global Student Stats bar widget */}
        <div className="nav-stats">
          <div className="stat-chip xp">
            <Zap size={14} />
            <span>LVL {stats.level} • {stats.xp} XP</span>
          </div>
        </div>
      </nav>

      {/* Main Container Content */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Tiny Footer */}
      <footer style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        © 2026 CareerTwin.ai • Built for Project-based Skill Acquisition
      </footer>
    </div>
  );
}
