import React, { useState } from 'react';
import { Target, BookOpen, Users, Briefcase, Award, Star, Trash2, Plus, AlertCircle } from 'lucide-react';

export default function DataManager({
  careerPaths,
  projects,
  peers,
  internships,
  challenges,
  mentorReviews,
  onAddCareerPath,
  onDeleteCareerPath,
  onAddProject,
  onDeleteProject,
  onAddPeer,
  onDeletePeer,
  onAddInternship,
  onDeleteInternship,
  onAddChallenge,
  onDeleteChallenge,
  onAddMentorReview,
  onDeleteMentorReview
}) {
  const [activeSubTab, setActiveSubTab] = useState('careers');

  // Form states
  // 1. Career Path Form State
  const [careerTitle, setCareerTitle] = useState("");
  const [careerDesc, setCareerDesc] = useState("");
  const [careerAdvisor, setCareerAdvisor] = useState("");
  
  // Skills list for new career
  const [skill1Name, setSkill1Name] = useState("");
  const [skill1Req, setSkill1Req] = useState("80");
  const [skill2Name, setSkill2Name] = useState("");
  const [skill2Req, setSkill2Req] = useState("80");
  const [skill3Name, setSkill3Name] = useState("");
  const [skill3Req, setSkill3Req] = useState("80");

  // Goals list for new career
  const [goal1Text, setGoal1Text] = useState("");
  const [goal2Text, setGoal2Text] = useState("");

  // Roadmap steps for new career
  const [step1Title, setStep1Title] = useState("");
  const [step1Desc, setStep1Desc] = useState("");
  const [step2Title, setStep2Title] = useState("");
  const [step2Desc, setStep2Desc] = useState("");

  // 2. Project Form State
  const [projTitle, setProjTitle] = useState("");
  const [projSponsor, setProjSponsor] = useState("");
  const [projSponsorType, setProjSponsorType] = useState("Startup");
  const [projDesc, setProjDesc] = useState("");
  const [projDiff, setProjDiff] = useState("Medium");
  const [projDeliverables, setProjDeliverables] = useState("");
  const [projSkills, setProjSkills] = useState("");
  const [projImage, setProjImage] = useState("");
  const [projXp, setProjXp] = useState("400");
  const [projCredits, setProjCredits] = useState("3");
  const [projRep, setProjRep] = useState("10");

  // 3. Peer Form State
  const [peerName, setPeerName] = useState("");
  const [peerAvatar, setPeerAvatar] = useState("");
  const [peerGoal, setPeerGoal] = useState("");
  const [peerSkills, setPeerSkills] = useState("");
  const [peerInterests, setPeerInterests] = useState("");
  const [peerBio, setPeerBio] = useState("");

  // 4. Internship Form State
  const [internCompany, setInternCompany] = useState("");
  const [internCompanyType, setInternCompanyType] = useState("Startup");
  const [internTitle, setInternTitle] = useState("");
  const [internType, setInternType] = useState("Micro Internship");
  const [internDuration, setInternDuration] = useState("4 weeks");
  const [internDesc, setInternDesc] = useState("");
  const [internReqSkills, setInternReqSkills] = useState("");
  const [internXp, setInternXp] = useState("800");
  const [internCredits, setInternCredits] = useState("5");
  const [internRep, setInternRep] = useState("20");
  const [internImage, setInternImage] = useState("");

  // 5. Challenge Form State
  const [chalTitle, setChalTitle] = useState("");
  const [chalCategory, setChalCategory] = useState("Social Problem");
  const [chalHost, setChalHost] = useState("");
  const [chalDesc, setChalDesc] = useState("");
  const [chalGrant, setChalGrant] = useState("$5,000 Funding");
  const [chalInc, setChalInc] = useState("Incubator Onboarding");
  const [chalOffer, setChalOffer] = useState("Direct Interview Offer");
  const [chalXp, setChalXp] = useState("1000");
  const [chalRep, setChalRep] = useState("40");
  const [chalDiff, setChalDiff] = useState("High");
  const [chalReqSkill, setChalReqSkill] = useState("");
  const [chalMinLevel, setChalMinLevel] = useState("50");

  // 6. Mentor Review Form State
  const [mentorName, setMentorName] = useState("");
  const [mentorRole, setMentorRole] = useState("");
  const [mentorRating, setMentorRating] = useState("4.8");
  const [mentorComment, setMentorComment] = useState("");

  const handleCreateCareer = (e) => {
    e.preventDefault();
    if (!careerTitle.trim() || !careerDesc.trim()) return;

    const newPath = {
      title: careerTitle.trim(),
      description: careerDesc.trim(),
      advisorGreeting: careerAdvisor.trim() || `Hello! I am your AI Career Twin for ${careerTitle}. Ready to build projects?`,
      skills: [],
      weeklyGoals: [],
      roadmap: []
    };

    // Skills
    if (skill1Name.trim()) {
      newPath.skills.push({ name: skill1Name.trim(), current: 15, required: parseInt(skill1Req) || 80 });
    }
    if (skill2Name.trim()) {
      newPath.skills.push({ name: skill2Name.trim(), current: 10, required: parseInt(skill2Req) || 80 });
    }
    if (skill3Name.trim()) {
      newPath.skills.push({ name: skill3Name.trim(), current: 20, required: parseInt(skill3Req) || 80 });
    }

    // Default if no skills provided
    if (newPath.skills.length === 0) {
      newPath.skills.push({ name: "General Competence", current: 20, required: 80 });
    }

    // Weekly Goals
    if (goal1Text.trim()) {
      newPath.weeklyGoals.push({ id: `g-custom-${Date.now()}-1`, text: goal1Text.trim(), completed: false, xpReward: 50 });
    }
    if (goal2Text.trim()) {
      newPath.weeklyGoals.push({ id: `g-custom-${Date.now()}-2`, text: goal2Text.trim(), completed: false, xpReward: 75 });
    }

    // Default goal
    if (newPath.weeklyGoals.length === 0) {
      newPath.weeklyGoals.push({ id: `g-custom-${Date.now()}-d`, text: `Explore roadmap for ${careerTitle}`, completed: false, xpReward: 50 });
    }

    // Roadmap
    if (step1Title.trim()) {
      newPath.roadmap.push({
        id: `r-step-${Date.now()}-1`,
        title: step1Title.trim(),
        description: step1Desc.trim() || "Gain fundamental concepts.",
        type: "theory",
        status: "active",
        resources: ["Online Docs", "Standard Tutorials"]
      });
    }
    if (step2Title.trim()) {
      newPath.roadmap.push({
        id: `r-step-${Date.now()}-2`,
        title: step2Title.trim(),
        description: step2Desc.trim() || "Work on your dynamic project.",
        type: "project",
        status: "locked",
        resources: ["Framer/Figma", "GitHub Repository"],
        linkedProjectId: projects.length > 0 ? projects[0].id : "proj-1"
      });
    }

    // Default roadmap steps
    if (newPath.roadmap.length === 0) {
      newPath.roadmap.push({
        id: `r-step-${Date.now()}-d1`,
        title: "Introduction to Specialization",
        description: "Study basic concepts and read reference documentation.",
        type: "theory",
        status: "active",
        resources: ["Official Guides"]
      });
    }

    onAddCareerPath(newPath);

    // Reset Form
    setCareerTitle("");
    setCareerDesc("");
    setCareerAdvisor("");
    setSkill1Name("");
    setSkill2Name("");
    setSkill3Name("");
    setGoal1Text("");
    setGoal2Text("");
    setStep1Title("");
    setStep1Desc("");
    setStep2Title("");
    setStep2Desc("");
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projTitle.trim() || !projDesc.trim()) return;

    const deliverablesArr = projDeliverables
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean);

    const skillsArr = projSkills
      .split(',')
      .map(x => x.trim())
      .filter(Boolean);

    const newProj = {
      id: `proj-${Date.now()}`,
      title: projTitle.trim(),
      sponsor: projSponsor.trim() || "Anonymous Sponsor",
      sponsorType: projSponsorType,
      description: projDesc.trim(),
      difficulty: projDiff,
      deliverables: deliverablesArr.length > 0 ? deliverablesArr : ["Interactive Prototype", "Documentation GitHub Link"],
      skillsEarned: skillsArr.length > 0 ? skillsArr : ["Core Competencies"],
      image: projImage.trim() || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      rewards: {
        xp: parseInt(projXp) || 300,
        credits: parseInt(projCredits) || 3,
        reputation: parseInt(projRep) || 10
      }
    };

    onAddProject(newProj);

    // Reset Form
    setProjTitle("");
    setProjSponsor("");
    setProjDesc("");
    setProjDeliverables("");
    setProjSkills("");
    setProjImage("");
  };

  const handleCreatePeer = (e) => {
    e.preventDefault();
    if (!peerName.trim()) return;

    const avatarInitials = peerAvatar.trim().toUpperCase().slice(0, 2) || peerName.trim().split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2);
    
    const skillsArr = peerSkills
      .split(',')
      .map(x => x.trim())
      .filter(Boolean);

    const interestsArr = peerInterests
      .split(',')
      .map(x => x.trim())
      .filter(Boolean);

    const newPeer = {
      id: `peer-${Date.now()}`,
      name: peerName.trim(),
      avatar: avatarInitials,
      targetGoal: peerGoal || Object.keys(careerPaths)[0] || "Generalist",
      skills: skillsArr.length > 0 ? skillsArr : ["Agile", "Collaborating"],
      interests: interestsArr.length > 0 ? interestsArr : ["Tech", "SaaS"],
      bio: peerBio.trim() || "Looking forward to collaborating with dynamic learners in study squads.",
      squadJoined: false
    };

    onAddPeer(newPeer);

    // Reset
    setPeerName("");
    setPeerAvatar("");
    setPeerSkills("");
    setPeerInterests("");
    setPeerBio("");
  };

  const handleCreateInternship = (e) => {
    e.preventDefault();
    if (!internCompany.trim() || !internTitle.trim()) return;

    // Parse Requirements (format: SkillName:Level, Skill2Name:Level)
    const reqs = internReqSkills
      .split(',')
      .map(item => {
        const parts = item.split(':');
        if (parts.length >= 2) {
          return { name: parts[0].trim(), minLevel: parseInt(parts[1]) || 50 };
        } else if (parts[0].trim()) {
          return { name: parts[0].trim(), minLevel: 50 };
        }
        return null;
      })
      .filter(Boolean);

    const newIntern = {
      id: `int-${Date.now()}`,
      company: internCompany.trim(),
      companyType: internCompanyType,
      title: internTitle.trim(),
      type: internType,
      duration: internDuration.trim(),
      description: internDesc.trim(),
      requirements: reqs.length > 0 ? reqs : [{ name: "General Competence", minLevel: 40 }],
      rewards: {
        xp: parseInt(internXp) || 800,
        credits: parseInt(internCredits) || 5,
        reputation: parseInt(internRep) || 20
      },
      image: internImage.trim() || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
      status: "open"
    };

    onAddInternship(newIntern);

    // Reset
    setInternCompany("");
    setInternTitle("");
    setInternDesc("");
    setInternReqSkills("");
    setInternImage("");
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    if (!chalTitle.trim() || !chalHost.trim()) return;

    const newChallenge = {
      id: `ch-${Date.now()}`,
      title: chalTitle.trim(),
      category: chalCategory,
      host: chalHost.trim(),
      description: chalDesc.trim(),
      rewards: {
        grant: chalGrant.trim() || "$5,000",
        incubation: chalInc.trim() || "Standard accelerator access",
        offer: chalOffer.trim() || "Interview loop pass",
        xp: parseInt(chalXp) || 1000,
        reputation: parseInt(chalRep) || 30
      },
      difficulty: chalDiff,
      requiredSkill: chalReqSkill.trim() || "General Competence",
      minSkillLevel: parseInt(chalMinLevel) || 50
    };

    onAddChallenge(newChallenge);

    // Reset
    setChalTitle("");
    setChalHost("");
    setChalDesc("");
    setChalGrant("");
    setChalInc("");
    setChalOffer("");
    setChalReqSkill("");
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!mentorName.trim() || !mentorComment.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      mentor: mentorName.trim(),
      role: mentorRole.trim() || "Independent Mentor",
      comment: mentorComment.trim(),
      rating: parseFloat(mentorRating) || 4.5
    };

    onAddMentorReview(newReview);

    // Reset
    setMentorName("");
    setMentorRole("");
    setMentorComment("");
  };

  return (
    <div className="data-manager-container">
      {/* Header */}
      <div className="glass-panel" style={{ marginBottom: '2rem', background: 'radial-gradient(circle at top left, rgba(124, 58, 237, 0.1), transparent), var(--bg-card)' }}>
         <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
           Application Database Panel
         </h2>
         <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
           Manage custom specializations, mock peers, project specifications, and evaluation keys. Build your workspace.
         </p>
      </div>

      {/* Admin Tab Selectors */}
      <div className="filter-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {[
          { key: 'careers', label: 'Career Paths', icon: <Target size={16} /> },
          { key: 'projects', label: 'Projects', icon: <BookOpen size={16} /> },
          { key: 'peers', label: 'Peers Network', icon: <Users size={16} /> },
          { key: 'internships', label: 'Internships', icon: <Briefcase size={16} /> },
          { key: 'challenges', label: 'Arena Challenges', icon: <Award size={16} /> },
          { key: 'reviews', label: 'Mentor Reviews', icon: <Star size={16} /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSubTab(tab.key)}
            className={`filter-btn ${activeSubTab === tab.key ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem' }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid: Form Left, List Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        
        {/* Left Side: Creation Form */}
        <div className="glass-panel">
          
          {activeSubTab === 'careers' && (
            <form onSubmit={handleCreateCareer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} style={{ color: 'var(--accent-violet)' }} /> Add Career Pathway
              </h3>
              
              <div>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>PATHWAY TITLE</label>
                <input required type="text" value={careerTitle} onChange={e => setCareerTitle(e.target.value)} className="form-input" placeholder="e.g. AI Engineer, Fullstack Web Dev..." style={{ width: '100%', padding: '0.6rem' }} />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>DESCRIPTION</label>
                <textarea required value={careerDesc} onChange={e => setCareerDesc(e.target.value)} className="form-input" placeholder="Explain the roles and competencies involved..." style={{ width: '100%', padding: '0.6rem', height: '80px', resize: 'vertical' }} />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>AI ADVISOR GREETING</label>
                <input type="text" value={careerAdvisor} onChange={e => setCareerAdvisor(e.target.value)} className="form-input" placeholder="Welcome message from Advisor..." style={{ width: '100%', padding: '0.6rem' }} />
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>SKILL METRIC TARGETS (UP TO 3)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" value={skill1Name} onChange={e => setSkill1Name(e.target.value)} className="form-input" placeholder="Skill 1 e.g. Python" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }} />
                    <input type="number" value={skill1Req} onChange={e => setSkill1Req(e.target.value)} className="form-input" placeholder="Req %" style={{ width: '80px', padding: '0.5rem', fontSize: '0.8rem' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" value={skill2Name} onChange={e => setSkill2Name(e.target.value)} className="form-input" placeholder="Skill 2 e.g. MLOps" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }} />
                    <input type="number" value={skill2Req} onChange={e => setSkill2Req(e.target.value)} className="form-input" placeholder="Req %" style={{ width: '80px', padding: '0.5rem', fontSize: '0.8rem' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" value={skill3Name} onChange={e => setSkill3Name(e.target.value)} className="form-input" placeholder="Skill 3 e.g. Statistics" style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }} />
                    <input type="number" value={skill3Req} onChange={e => setSkill3Req(e.target.value)} className="form-input" placeholder="Req %" style={{ width: '80px', padding: '0.5rem', fontSize: '0.8rem' }} />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>WEEKLY GOALS (UP TO 2)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input type="text" value={goal1Text} onChange={e => setGoal1Text(e.target.value)} className="form-input" placeholder="e.g. Read RAG documentation" style={{ padding: '0.5rem', fontSize: '0.8rem' }} />
                  <input type="text" value={goal2Text} onChange={e => setGoal2Text(e.target.value)} className="form-input" placeholder="e.g. Write basic Flask route" style={{ padding: '0.5rem', fontSize: '0.8rem' }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>ROADMAP MILESTONES (UP TO 2)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.01)', padding: '0.5rem', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--text-muted)' }}>MILESTONE 1 (CONCEPTUAL)</span>
                    <input type="text" value={step1Title} onChange={e => setStep1Title(e.target.value)} className="form-input" placeholder="Title: e.g. Python Fundamentals" style={{ padding: '0.4rem', fontSize: '0.8rem', width: '100%', marginBottom: '0.25rem' }} />
                    <input type="text" value={step1Desc} onChange={e => setStep1Desc(e.target.value)} className="form-input" placeholder="Short description..." style={{ padding: '0.4rem', fontSize: '0.8rem', width: '100%' }} />
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.01)', padding: '0.5rem', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--text-muted)' }}>MILESTONE 2 (PRACTICAL PROJECT)</span>
                    <input type="text" value={step2Title} onChange={e => setStep2Title(e.target.value)} className="form-input" placeholder="Title: e.g. Build API Route" style={{ padding: '0.4rem', fontSize: '0.8rem', width: '100%', marginBottom: '0.25rem' }} />
                    <input type="text" value={step2Desc} onChange={e => setStep2Desc(e.target.value)} className="form-input" placeholder="Short description..." style={{ padding: '0.4rem', fontSize: '0.8rem', width: '100%' }} />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Save Specialization
              </button>
            </form>
          )}

          {activeSubTab === 'projects' && (
            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Create Brief</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>PROJECT TITLE</label>
                  <input required type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} className="form-input" placeholder="Design a Food App" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>SPONSOR CLIENT</label>
                  <input required type="text" value={projSponsor} onChange={e => setProjSponsor(e.target.value)} className="form-input" placeholder="BiteLocal" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>SPONSOR TYPE</label>
                  <select value={projSponsorType} onChange={e => setProjSponsorType(e.target.value)} className="goal-selector" style={{ padding: '0.5rem', fontSize: '0.85rem', height: '36px' }}>
                    <option value="Startup">Startup</option>
                    <option value="NGO">NGO</option>
                    <option value="Local Business">Local Business</option>
                    <option value="Company">Company</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>DIFFICULTY</label>
                  <select value={projDiff} onChange={e => setProjDiff(e.target.value)} className="goal-selector" style={{ padding: '0.5rem', fontSize: '0.85rem', height: '36px' }}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>DESCRIPTION</label>
                <textarea required value={projDesc} onChange={e => setProjDesc(e.target.value)} className="form-input" placeholder="Outline the client's problem..." style={{ width: '100%', padding: '0.5rem', height: '70px', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>DELIVERABLES (ONE PER LINE)</label>
                <textarea value={projDeliverables} onChange={e => setProjDeliverables(e.target.value)} className="form-input" placeholder="Figma Wireframes&#10;Heuristic Assessment" style={{ width: '100%', padding: '0.5rem', height: '60px', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>EARNED SKILLS (COMMA SEPARATED)</label>
                <input type="text" value={projSkills} onChange={e => setProjSkills(e.target.value)} className="form-input" placeholder="e.g. UX Design, Product Strategy" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem' }}>XP REWARD</label>
                  <input type="number" value={projXp} onChange={e => setProjXp(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem' }}>CREDITS</label>
                  <input type="number" value={projCredits} onChange={e => setProjCredits(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem' }}>REP SCORE</label>
                  <input type="number" value={projRep} onChange={e => setProjRep(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>COVER IMAGE URL</label>
                <input type="text" value={projImage} onChange={e => setProjImage(e.target.value)} className="form-input" placeholder="https://..." style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
              </div>

              <button type="submit" className="btn btn-primary">
                Save Project
              </button>
            </form>
          )}

          {activeSubTab === 'peers' && (
            <form onSubmit={handleCreatePeer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Add Peer</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>NAME</label>
                  <input required type="text" value={peerName} onChange={e => setPeerName(e.target.value)} className="form-input" placeholder="Sarah Kim" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>AVATAR CHIPS</label>
                  <input type="text" value={peerAvatar} onChange={e => setPeerAvatar(e.target.value)} className="form-input" placeholder="SK" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>TARGET GOAL PATHWAY</label>
                <select value={peerGoal} onChange={e => setPeerGoal(e.target.value)} className="goal-selector" style={{ padding: '0.5rem', fontSize: '0.85rem', height: '36px' }}>
                  <option value="">-- Choose Specialization --</option>
                  {Object.keys(careerPaths).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>PEER SKILLS (COMMA SEPARATED)</label>
                <input type="text" value={peerSkills} onChange={e => setPeerSkills(e.target.value)} className="form-input" placeholder="User Research, Wireframes" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>INTERESTS (COMMA SEPARATED)</label>
                <input type="text" value={peerInterests} onChange={e => setPeerInterests(e.target.value)} className="form-input" placeholder="Fintech, SaaS, Mobile" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>SHORT BIO</label>
                <textarea value={peerBio} onChange={e => setPeerBio(e.target.value)} className="form-input" placeholder="transitioning from business ops to engineering..." style={{ width: '100%', padding: '0.5rem', height: '65px', fontSize: '0.85rem' }} />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Peer Node
              </button>
            </form>
          )}

          {activeSubTab === 'internships' && (
            <form onSubmit={handleCreateInternship} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Create Internship Brief</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>COMPANY NAME</label>
                  <input required type="text" value={internCompany} onChange={e => setInternCompany(e.target.value)} className="form-input" placeholder="BiteLocal" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>COMPANY TYPE</label>
                  <select value={internCompanyType} onChange={e => setInternCompanyType(e.target.value)} className="goal-selector" style={{ padding: '0.5rem', fontSize: '0.85rem', height: '36px' }}>
                    <option value="Startup">Startup</option>
                    <option value="NGO">NGO</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>ROLE TITLE</label>
                  <input required type="text" value={internTitle} onChange={e => setInternTitle(e.target.value)} className="form-input" placeholder="Product Management Intern" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>INTERNSHIP TYPE</label>
                  <select value={internType} onChange={e => setInternType(e.target.value)} className="goal-selector" style={{ padding: '0.5rem', fontSize: '0.85rem', height: '36px' }}>
                    <option value="Micro Internship">Micro Internship</option>
                    <option value="Remote Project">Remote Project</option>
                    <option value="Startup Internship">Startup Internship</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>DURATION</label>
                  <input type="text" value={internDuration} onChange={e => setInternDuration(e.target.value)} className="form-input" placeholder="4 weeks" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>SKILL REQUIREMENTS (e.g. Strategy:50,Design:60)</label>
                  <input type="text" value={internReqSkills} onChange={e => setInternReqSkills(e.target.value)} className="form-input" placeholder="Product Strategy:50,UX Design:55" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>DESCRIPTION</label>
                <textarea required value={internDesc} onChange={e => setInternDesc(e.target.value)} className="form-input" placeholder="Document onboarding flow..." style={{ width: '100%', padding: '0.5rem', height: '65px', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem' }}>XP REWARD</label>
                  <input type="number" value={internXp} onChange={e => setInternXp(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem' }}>CREDITS</label>
                  <input type="number" value={internCredits} onChange={e => setInternCredits(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem' }}>REP SCORE</label>
                  <input type="number" value={internRep} onChange={e => setInternRep(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>THUMBNAIL IMAGE URL</label>
                <input type="text" value={internImage} onChange={e => setInternImage(e.target.value)} className="form-input" placeholder="https://..." style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
              </div>

              <button type="submit" className="btn btn-primary">
                Save Internship Opening
              </button>
            </form>
          )}

          {activeSubTab === 'challenges' && (
            <form onSubmit={handleCreateChallenge} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Create Arena Challenge</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>CHALLENGE TITLE</label>
                  <input required type="text" value={chalTitle} onChange={e => setChalTitle(e.target.value)} className="form-input" placeholder="AI Health Router" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>HOST ORGANIZATION</label>
                  <input required type="text" value={chalHost} onChange={e => setChalHost(e.target.value)} className="form-input" placeholder="HealthForAll Hub" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>CATEGORY</label>
                  <select value={chalCategory} onChange={e => setChalCategory(e.target.value)} className="goal-selector" style={{ padding: '0.5rem', fontSize: '0.85rem', height: '36px' }}>
                    <option value="Social Problem">Social Problem</option>
                    <option value="Startup Problem">Startup Problem</option>
                    <option value="Industry Challenge">Industry Challenge</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>DIFFICULTY</label>
                  <select value={chalDiff} onChange={e => setChalDiff(e.target.value)} className="goal-selector" style={{ padding: '0.5rem', fontSize: '0.85rem', height: '36px' }}>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>DESCRIPTION</label>
                <textarea required value={chalDesc} onChange={e => setChalDesc(e.target.value)} className="form-input" placeholder="Outline the grand challenge constraints..." style={{ width: '100%', padding: '0.5rem', height: '65px', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>REQUIRED SKILL</label>
                  <input type="text" value={chalReqSkill} onChange={e => setChalReqSkill(e.target.value)} className="form-input" placeholder="e.g. Machine Learning Models" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>MIN LEVEL REQ %</label>
                  <input type="number" value={chalMinLevel} onChange={e => setChalMinLevel(e.target.value)} className="form-input" placeholder="55" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.7rem', display: 'block', color: 'var(--accent-violet)', fontWeight: 700 }}>AWARD POOL DETAILS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.25rem' }}>
                  <input type="text" value={chalGrant} onChange={e => setChalGrant(e.target.value)} className="form-input" placeholder="Grant: e.g. $10,000 Seed Capital" style={{ padding: '0.4rem', fontSize: '0.8rem' }} />
                  <input type="text" value={chalInc} onChange={e => setChalInc(e.target.value)} className="form-input" placeholder="Incubation: e.g. Incubator cohort slot" style={{ padding: '0.4rem', fontSize: '0.8rem' }} />
                  <input type="text" value={chalOffer} onChange={e => setChalOffer(e.target.value)} className="form-input" placeholder="Job Offer: e.g. Lead Dev Offer" style={{ padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem' }}>XP REWARD</label>
                  <input type="number" value={chalXp} onChange={e => setChalXp(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem' }}>REP SCORE</label>
                  <input type="number" value={chalRep} onChange={e => setChalRep(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem' }} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Deploy Arena Challenge
              </button>
            </form>
          )}

          {activeSubTab === 'reviews' && (
            <form onSubmit={handleCreateReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Submit Mentor Endorsement</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>MENTOR NAME</label>
                  <input required type="text" value={mentorName} onChange={e => setMentorName(e.target.value)} className="form-input" placeholder="Dr. Aris Thorne" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>ROLE / CLIENT</label>
                  <input type="text" value={mentorRole} onChange={e => setMentorRole(e.target.value)} className="form-input" placeholder="Lead AI Scientist, Aegis" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>RATING SCORE (OUT OF 5.0)</label>
                <input type="number" step="0.1" min="1" max="5" value={mentorRating} onChange={e => setMentorRating(e.target.value)} className="form-input" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>COMMENT / FEEDBACK</label>
                <textarea required value={mentorComment} onChange={e => setMentorComment(e.target.value)} className="form-input" placeholder="Outstanding execution, scalable microservice setup..." style={{ width: '100%', padding: '0.5rem', height: '80px', fontSize: '0.85rem' }} />
              </div>

              <button type="submit" className="btn btn-primary">
                Log Mentor Review
              </button>
            </form>
          )}

        </div>

        {/* Right Side: Existing Database List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel" style={{ flex: 1, minHeight: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.20rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Database Items
            </h3>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '550px', paddingRight: '0.25rem' }}>
              
              {/* Careers List */}
              {activeSubTab === 'careers' && (
                Object.keys(careerPaths).length === 0 ? (
                  <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                    No Career pathways added.
                  </p>
                ) : (
                  Object.keys(careerPaths).map(key => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{key}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{careerPaths[key].description.slice(0, 60)}...</span>
                      </div>
                      <button onClick={() => onDeleteCareerPath(key)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.25rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )
              )}

              {/* Projects List */}
              {activeSubTab === 'projects' && (
                projects.length === 0 ? (
                  <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                    No Project briefs created.
                  </p>
                ) : (
                  projects.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{p.title}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{p.sponsor} ({p.sponsorType}) • {p.difficulty}</span>
                      </div>
                      <button onClick={() => onDeleteProject(p.id)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.25rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )
              )}

              {/* Peers List */}
              {activeSubTab === 'peers' && (
                peers.length === 0 ? (
                  <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                    No mock peers logged.
                  </p>
                ) : (
                  peers.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '0.7rem', fontWeight: 700 }}>{p.avatar}</div>
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{p.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-violet)', display: 'block' }}>{p.targetGoal}</span>
                        </div>
                      </div>
                      <button onClick={() => onDeletePeer(p.id)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.25rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )
              )}

              {/* Internships List */}
              {activeSubTab === 'internships' && (
                internships.length === 0 ? (
                  <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                    No internship vacancies loaded.
                  </p>
                ) : (
                  internships.map(intern => (
                    <div key={intern.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{intern.title}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{intern.company} ({intern.companyType}) • {intern.type}</span>
                      </div>
                      <button onClick={() => onDeleteInternship(intern.id)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.25rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )
              )}

              {/* Challenges List */}
              {activeSubTab === 'challenges' && (
                challenges.length === 0 ? (
                  <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                    No Innovation Arena challenges created.
                  </p>
                ) : (
                  challenges.map(ch => (
                    <div key={ch.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{ch.title}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{ch.host} • {ch.category}</span>
                      </div>
                      <button onClick={() => onDeleteChallenge(ch.id)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.25rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )
              )}

              {/* Reviews List */}
              {activeSubTab === 'reviews' && (
                mentorReviews.length === 0 ? (
                  <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
                    No mentor reviews recorded.
                  </p>
                ) : (
                  mentorReviews.map(rev => (
                    <div key={rev.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{rev.mentor} ({rev.rating}★)</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>{rev.role} • "{rev.comment.slice(0, 40)}..."</span>
                      </div>
                      <button onClick={() => onDeleteMentorReview(rev.id)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.25rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )
              )}

            </div>

            {/* Helpful Box */}
            <div style={{ background: 'rgba(6,182,212,0.04)', padding: '0.75rem', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '10px', display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
               <AlertCircle size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
               <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                 Modifying database collections will immediately update the local memory, graphs, and matching nodes in relevant application panels.
               </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
