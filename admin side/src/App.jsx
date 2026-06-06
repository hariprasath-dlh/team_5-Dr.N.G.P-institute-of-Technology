import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Database } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CareerTwin from './components/CareerTwin';
import ProjectMarketplace from './components/ProjectMarketplace';
import Portfolio from './components/Portfolio';
import PeerNetwork from './components/PeerNetwork';
import InternshipEngine from './components/InternshipEngine';
import EmployabilityScore from './components/EmployabilityScore';
import InnovationArena from './components/InnovationArena';
import DataManager from './components/DataManager';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Load collections dynamically from localStorage (or default empty)
  const [careerDataMap, setCareerDataMap] = useState(() => {
    try {
      const saved = localStorage.getItem('careerDataMap');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeGoal, setActiveGoal] = useState(() => {
    return localStorage.getItem('activeGoal') || "";
  });

  const [projectList, setProjectList] = useState(() => {
    try {
      const saved = localStorage.getItem('projectList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [peerList, setPeerList] = useState(() => {
    try {
      const saved = localStorage.getItem('peerList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [internshipList, setInternshipList] = useState(() => {
    try {
      const saved = localStorage.getItem('internshipList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [challengeList, setChallengeList] = useState(() => {
    try {
      const saved = localStorage.getItem('challengeList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [mentorReviewList, setMentorReviewList] = useState(() => {
    try {
      const saved = localStorage.getItem('mentorReviewList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Student statistics state
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('stats');
      return saved ? JSON.parse(saved) : {
        level: 1,
        xp: 0,
        nextLevelXp: 1000,
        portfolioCredits: 0,
        reputationScore: 0
      };
    } catch {
      return {
        level: 1,
        xp: 0,
        nextLevelXp: 1000,
        portfolioCredits: 0,
        reputationScore: 0
      };
    }
  });

  // Active / completed project IDs in Marketplace
  const [activeProjectIds, setActiveProjectIds] = useState(() => {
    try {
      const saved = localStorage.getItem('activeProjectIds');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedProjectIds, setCompletedProjectIds] = useState(() => {
    try {
      const saved = localStorage.getItem('completedProjectIds');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Peer network squad state
  const [activeSquadPeers, setActiveSquadPeers] = useState(() => {
    try {
      const saved = localStorage.getItem('activeSquadPeers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Internship states
  const [completedInternshipIds, setCompletedInternshipIds] = useState(() => {
    try {
      const saved = localStorage.getItem('completedInternshipIds');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Innovation Arena won challenge IDs
  const [wonChallengeIds, setWonChallengeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('wonChallengeIds');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Chat histories per career path
  const [chatHistoryMap, setChatHistoryMap] = useState(() => {
    try {
      const saved = localStorage.getItem('chatHistoryMap');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Automatically update active goal if it gets deleted or is unset
  useEffect(() => {
    const keys = Object.keys(careerDataMap);
    if (keys.length > 0 && (!activeGoal || !careerDataMap[activeGoal])) {
      setActiveGoal(keys[0]);
    } else if (keys.length === 0) {
      setActiveGoal("");
    }
  }, [careerDataMap, activeGoal]);

  // Sync basic state to localStorage
  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('activeGoal', activeGoal);
  }, [activeGoal]);

  useEffect(() => {
    localStorage.setItem('activeProjectIds', JSON.stringify(activeProjectIds));
  }, [activeProjectIds]);

  useEffect(() => {
    localStorage.setItem('completedProjectIds', JSON.stringify(completedProjectIds));
  }, [completedProjectIds]);

  useEffect(() => {
    localStorage.setItem('activeSquadPeers', JSON.stringify(activeSquadPeers));
  }, [activeSquadPeers]);

  useEffect(() => {
    localStorage.setItem('completedInternshipIds', JSON.stringify(completedInternshipIds));
  }, [completedInternshipIds]);

  useEffect(() => {
    localStorage.setItem('wonChallengeIds', JSON.stringify(wonChallengeIds));
  }, [wonChallengeIds]);

  useEffect(() => {
    localStorage.setItem('chatHistoryMap', JSON.stringify(chatHistoryMap));
  }, [chatHistoryMap]);

  // Admin Callbacks to add / delete items
  const handleAddCareerPath = (newPath) => {
    setCareerDataMap(prev => {
      const updated = { ...prev, [newPath.title]: newPath };
      localStorage.setItem('careerDataMap', JSON.stringify(updated));
      return updated;
    });
    setChatHistoryMap(prev => {
      if (!prev[newPath.title]) {
        return {
          ...prev,
          [newPath.title]: [
            {
              sender: 'advisor',
              text: newPath.advisorGreeting,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return prev;
    });
    if (!activeGoal) {
      setActiveGoal(newPath.title);
    }
  };

  const handleDeleteCareerPath = (title) => {
    setCareerDataMap(prev => {
      const updated = { ...prev };
      delete updated[title];
      localStorage.setItem('careerDataMap', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddProject = (newProj) => {
    setProjectList(prev => {
      const updated = [...prev, newProj];
      localStorage.setItem('projectList', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteProject = (id) => {
    setProjectList(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('projectList', JSON.stringify(updated));
      return updated;
    });
    setActiveProjectIds(prev => prev.filter(idVal => idVal !== id));
    setCompletedProjectIds(prev => prev.filter(idVal => idVal !== id));
  };

  const handleAddPeer = (newPeer) => {
    setPeerList(prev => {
      const updated = [...prev, newPeer];
      localStorage.setItem('peerList', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeletePeer = (id) => {
    setPeerList(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('peerList', JSON.stringify(updated));
      return updated;
    });
    setActiveSquadPeers(prev => prev.filter(pId => pId !== id));
  };

  const handleAddInternship = (newIntern) => {
    setInternshipList(prev => {
      const updated = [...prev, newIntern];
      localStorage.setItem('internshipList', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteInternship = (id) => {
    setInternshipList(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('internshipList', JSON.stringify(updated));
      return updated;
    });
    setCompletedInternshipIds(prev => prev.filter(cId => cId !== id));
  };

  const handleAddChallenge = (newChallenge) => {
    setChallengeList(prev => {
      const updated = [...prev, newChallenge];
      localStorage.setItem('challengeList', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteChallenge = (id) => {
    setChallengeList(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('challengeList', JSON.stringify(updated));
      return updated;
    });
    setWonChallengeIds(prev => prev.filter(wId => wId !== id));
  };

  const handleAddMentorReview = (newReview) => {
    setMentorReviewList(prev => {
      const updated = [...prev, newReview];
      localStorage.setItem('mentorReviewList', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteMentorReview = (id) => {
    setMentorReviewList(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem('mentorReviewList', JSON.stringify(updated));
      return updated;
    });
  };

  // Level up detection logic helper
  const addXp = (amount, currentStats) => {
    let newXp = currentStats.xp + amount;
    let newLevel = currentStats.level;
    let nextXp = currentStats.nextLevelXp;

    if (newXp >= nextXp) {
      newXp = newXp - nextXp;
      newLevel += 1;
      nextXp = Math.floor(nextXp * 1.25);
      
      setTimeout(() => {
        alert(`🎉 LEVEL UP! You reached Level ${newLevel}!`);
      }, 100);
    } else if (newXp < 0) {
      newXp = 0;
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
    if (!activeGoal) return;
    setChatHistoryMap(prev => ({
      ...prev,
      [activeGoal]: [...(prev[activeGoal] || []), newMessage]
    }));
  };

  // Toggle Weekly Goal completion & reward XP
  const handleToggleWeeklyGoal = (goalId, xpReward) => {
    if (!activeGoal) return;
    const activeCareer = careerDataMap[activeGoal];
    if (!activeCareer) return;
    
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
    setCareerDataMap(prev => {
      const updated = {
        ...prev,
        [activeGoal]: {
          ...activeCareer,
          weeklyGoals: updatedGoals
        }
      };
      localStorage.setItem('careerDataMap', JSON.stringify(updated));
      return updated;
    });

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
    if (!activeGoal) return;
    const currentCareer = careerDataMap[activeGoal];
    if (!currentCareer) return;
    
    // Boost current skill metrics by +20% to +35% for skills in this career
    const updatedSkills = currentCareer.skills.map(skill => {
      const boost = Math.floor(Math.random() * 15) + 20; // 20-35% boost
      return {
        ...skill,
        current: Math.min(skill.required, skill.current + boost)
      };
    });

    // Advance the roadmap step
    const updatedRoadmap = currentCareer.roadmap.map((step, index, arr) => {
      if (step.linkedProjectId === projectId) {
        return { ...step, status: 'completed' };
      }
      if (index > 0 && arr[index - 1].linkedProjectId === projectId) {
        return { ...step, status: 'active' };
      }
      return step;
    });

    setCareerDataMap(prev => {
      const updated = {
        ...prev,
        [activeGoal]: {
          ...currentCareer,
          skills: updatedSkills,
          roadmap: updatedRoadmap
        }
      };
      localStorage.setItem('careerDataMap', JSON.stringify(updated));
      return updated;
    });
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
    setInternshipList(prev => {
      const updated = prev.map(intern => {
        if (intern.id === internshipId) {
          return { ...intern, status };
        }
        return intern;
      });
      localStorage.setItem('internshipList', JSON.stringify(updated));
      return updated;
    });
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
    const careerData = careerDataMap[activeGoal];

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            stats={stats}
            activeGoal={activeGoal}
            careerData={careerData}
            activeProjects={projectList.filter(p => activeProjectIds.includes(p.id))}
            onNavigate={setActiveTab}
          />
        );
      case 'career-twin':
        return (
          <CareerTwin 
            careerPaths={careerDataMap}
            activeGoal={activeGoal}
            onGoalChange={handleGoalChange}
            careerData={careerData}
            onToggleWeeklyGoal={handleToggleWeeklyGoal}
            onAddMessage={handleAddChatMessage}
            chatHistory={chatHistoryMap[activeGoal] || []}
          />
        );
      case 'marketplace':
        return (
          <ProjectMarketplace 
            stats={stats}
            projects={projectList}
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
            peers={peerList}
            activeGoal={activeGoal}
            activeSquadPeers={activeSquadPeers}
            onInvitePeer={handleInvitePeer}
            onRemovePeer={handleRemovePeer}
          />
        );
      case 'internships':
        return (
          <InternshipEngine 
            careerData={careerData}
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
            careerData={careerData}
            completedProjectIds={completedProjectIds}
            completedInternshipIds={completedInternshipIds}
            activeSquadPeers={activeSquadPeers}
            mentorReviews={mentorReviewList}
          />
        );
      case 'arena':
        return (
          <InnovationArena 
            careerData={careerData}
            challenges={challengeList}
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
            projects={projectList}
            challenges={challengeList}
          />
        );
      case 'manage-data':
        return (
          <DataManager
            careerPaths={careerDataMap}
            projects={projectList}
            peers={peerList}
            internships={internshipList}
            challenges={challengeList}
            mentorReviews={mentorReviewList}
            onAddCareerPath={handleAddCareerPath}
            onDeleteCareerPath={handleDeleteCareerPath}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
            onAddPeer={handleAddPeer}
            onDeletePeer={handleDeletePeer}
            onAddInternship={handleAddInternship}
            onDeleteInternship={handleDeleteInternship}
            onAddChallenge={handleAddChallenge}
            onDeleteChallenge={handleDeleteChallenge}
            onAddMentorReview={handleAddMentorReview}
            onDeleteMentorReview={handleDeleteMentorReview}
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
          <button 
            onClick={() => setActiveTab('manage-data')} 
            className={`nav-item ${activeTab === 'manage-data' ? 'active' : ''}`}
            style={{ borderColor: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)' }}
          >
            <Database size={14} />
            Manage Data
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
