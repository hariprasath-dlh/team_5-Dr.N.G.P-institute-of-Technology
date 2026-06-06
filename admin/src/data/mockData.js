// CareerTwin.ai Mock Database & AI Advisor Simulation

export const CAREER_PATHS = {};
export const PROJECTS = [];
export const MOCK_PEERS = [];
export const INTERNSHIPS = [];
export const ARENA_CHALLENGES = [];
export const MENTOR_REVIEWS = [];
export const getAIAdvisorResponse = (careerGoal, userMessage, completedStepsCount = 0) => {
  const normalized = userMessage.toLowerCase();
  
  if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey")) {
    return `Hello! Good to see you back on track for the ${careerGoal} roadmap. Ready to dive into your next milestone?`;
  }
  
  if (normalized.includes("skill") || normalized.includes("gap") || normalized.includes("measure")) {
    return `Looking at your skill gaps for ${careerGoal}, you're doing well in standard conceptual knowledge, but we need to boost your practical design/development parameters. I recommend accepting the next available project in the marketplace.`;
  }

  if (normalized.includes("roadmap") || normalized.includes("next step") || normalized.includes("path")) {
    return `Your current milestone is: Step 2. You've cleared the theoretical fundamentals! You should tackle a live project. Doing this will bridge your skill gap and credit your portfolio.`;
  }

  if (normalized.includes("goal") || normalized.includes("weekly") || normalized.includes("todo")) {
    return `Your weekly goals are tailored to build muscle memory. Try completing: "Create wireframe user flow" or "Train predictive models" depending on your target path! You'll earn solid XP.`;
  }

  if (normalized.includes("project") || normalized.includes("build") || normalized.includes("marketplace")) {
    return `Real projects build real competence. In the Project Marketplace tab, you can take on briefs from startups like GrowthAI or NGOs like FeedShare. Submit your deliverable link (even a mock repository or figma URL) and I'll review it!`;
  }

  if (normalized.includes("peer") || normalized.includes("squad") || normalized.includes("team")) {
    return `Peer learning accelerates retention. In the Peer Network tab, I've matched students with matching interests. You can invite them to form a learning squad, hackathon team, or study circle!`;
  }

  if (normalized.includes("internship") || normalized.includes("match") || normalized.includes("apply")) {
    return `Forget standard resumes. The Internship Engine matches your verified skill graph directly against corporate logs. If you complete more marketplace projects, your match score increases, unlocking enterprise slots!`;
  }

  if (normalized.includes("employability") || normalized.includes("score") || normalized.includes("credit")) {
    return `Your Employability Score is like a credit rating for your career. It ranges from 0 to 1000 and is computed using your completed projects, verified skills, active internships, squads joined, and mentor feedback reviews! Complete more projects to raise it.`;
  }

  if (normalized.includes("arena") || normalized.includes("challenge") || normalized.includes("funding")) {
    return `The Innovation Arena contains high-stakes startup and industry briefs. Submit scalable solutions to win cash seed grants, incubation space, and job offers. Your career twin recommends applying once you meet the skill thresholds!`;
  }

  return `Interesting query about ${careerGoal}. As your career twin, my advice is to prioritize coding/designing over passive video watching. Let's finish your active marketplace items! Let me know if you need specific advice on any deliverables.`;
};

export const getAIProjectReview = (projectId, submissionUrl) => {
  if (!submissionUrl.startsWith("http://") && !submissionUrl.startsWith("https://")) {
    return {
      status: "rejected",
      feedback: "Review Rejected: Please submit a valid URL (starting with http:// or https://) representing your GitHub repository, Figma project, or hosted prototype."
    };
  }

  const projectNames = {
    "proj-1": "Design a Food Delivery App",
    "proj-2": "Build Smart Inventory System",
    "proj-3": "Marketing Automation Flow",
    "proj-4": "Renewable Energy Dashboard",
    "proj-5": "AI Customer Support Chatbot"
  };

  const name = projectNames[projectId] || "Project";

  return {
    status: "approved",
    feedback: `✨ MOCK AI REVIEW PASSED ✨\n\nExcellent submission for "${name}". \n- URL validated: ${submissionUrl}\n- Checked files, structure, and deliverables outline.\n- High-fidelity visual standards were met.\n\nRewards: Congratulations on earning XP, Portfolio Credits, and Reputation score. Your Career Twin profile has been updated!`
  };
};

export const getInternshipMatchScore = (internship, userSkills) => {
  if (!internship.requirements || internship.requirements.length === 0) return 100;

  let totalScore = 0;
  internship.requirements.forEach(req => {
    const userSkill = userSkills.find(s => s.name === req.name);
    if (userSkill) {
      const matchRatio = (userSkill.current / req.minLevel) * 100;
      totalScore += Math.min(100, matchRatio);
    } else {
      totalScore += 0;
    }
  });

  return Math.round(totalScore / internship.requirements.length);
};

export const calculateEmployabilityScore = (stats, skills, completedProjectsCount, completedInternshipsCount, squadPeersCount) => {
  // Base Score
  let score = 350;

  // Projects Factor: +120 points per completed project (max 360)
  score += completedProjectsCount * 120;

  // Skills Factor: average skill level % * 3.5 (max 350)
  if (skills && skills.length > 0) {
    const avgSkill = skills.reduce((acc, curr) => acc + curr.current, 0) / skills.length;
    score += Math.round(avgSkill * 3.5);
  }

  // Internships Factor: +100 points per completed internship (max 200)
  score += completedInternshipsCount * 100;

  // Squads Factor: +50 points if active in peer squad (max 50)
  if (squadPeersCount > 0) {
    score += 50;
  }

  // Reputation factor: +Math.min(40, rep * 1.5) (max 40)
  score += Math.min(40, stats.reputationScore * 1.5);

  // Cap at 1000
  return Math.min(1000, Math.round(score));
};

export const getArenaJuryReview = (challengeId, submissionUrl) => {
  if (!submissionUrl.startsWith("http://") && !submissionUrl.startsWith("https://")) {
    return {
      status: "rejected",
      feedback: "Jury Verdict: Invalid submission. Please submit a live URL representing your architecture diagram, repository code, or pitch deck link."
    };
  }

  const challenges = {
    "ch-1": "Rural Health AI Diagnostic Router",
    "ch-2": "Zero-Waste Grocery Log Engine",
    "ch-3": "Community Solar Power Grid Ledger"
  };

  const name = challenges[challengeId] || "Challenge Proposal";

  return {
    status: "approved",
    feedback: `🏆 JURY AWARD GRANTED 🏆\n\nYour proposal for "${name}" has won! \n- Evaluated metrics: Scalability (Vetted), Feasibility (High), API Depth (Passed).\n- Seed grant approved for dispatch.\n- Accelerator Cohort Seat reserved.\n\nCongratulations! Your certificate portfolio updates are logged.`
  };
};
