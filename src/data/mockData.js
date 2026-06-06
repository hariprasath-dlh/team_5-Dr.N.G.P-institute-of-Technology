// CareerTwin.ai Mock Database & AI Advisor Simulation

export const CAREER_PATHS = {
  "Product Manager": {
    title: "Product Manager",
    description: "Orchestrate product lifecycle, coordinate cross-functional teams, and align business goals with user needs.",
    skills: [
      { name: "Product Strategy", current: 35, required: 85 },
      { name: "UX Design & Wireframing", current: 40, required: 75 },
      { name: "Data Analytics", current: 20, required: 80 },
      { name: "Agile & Scrum", current: 50, required: 90 },
      { name: "Market Research", current: 45, required: 85 }
    ],
    roadmap: [
      {
        id: "pm-1",
        title: "Product Fundamentals",
        description: "Learn product lifecycle management, user research methodologies, and how to define product-market fit.",
        type: "theory",
        status: "completed",
        resources: ["Product School Guides", "Inspiring Product - Marty Cagan"]
      },
      {
        id: "pm-2",
        title: "UX Project (Design food delivery app)",
        description: "Translate user problems into wireframes, design user flows, and run usability tests.",
        type: "project",
        status: "active",
        resources: ["Figma Basics", "Don't Make Me Think - Steve Krug"],
        linkedProjectId: "proj-1"
      },
      {
        id: "pm-3",
        title: "Product Case Study",
        description: "Perform a deep-dive analysis on a product feature launch, documenting success metrics and failures.",
        type: "study",
        status: "locked",
        resources: ["Growth.design case studies", "SQL for PMs"]
      },
      {
        id: "pm-4",
        title: "Startup Internship / Capstone",
        description: "Work with a startup team or NGO to ship a functional MVP in the marketplace.",
        type: "internship",
        status: "locked",
        resources: ["Lean Startup - Eric Ries"]
      }
    ],
    weeklyGoals: [
      { id: "g-pm-1", text: "Create wireframe user flow for local delivery app", completed: false, xpReward: 50 },
      { id: "g-pm-2", text: "Draft a PRD (Product Requirement Document) outline for a chat feature", completed: false, xpReward: 75 },
      { id: "g-pm-3", text: "Analyze a case study of Spotify's recommendation algorithm", completed: false, xpReward: 60 }
    ],
    advisorGreeting: "Hello! I am your AI Career Twin. My goal is to groom you into a top-tier Product Manager. Instead of theoretical lectures, we will build a portfolio through projects sourced from local businesses and startups. What would you like to plan today?"
  },
  "AI Engineer": {
    title: "AI Engineer",
    description: "Design and implement machine learning models, build neural architectures, and deploy intelligent agents.",
    skills: [
      { name: "Python & PyTorch", current: 50, required: 95 },
      { name: "Machine Learning Models", current: 30, required: 90 },
      { name: "NLP & Large Language Models", current: 15, required: 80 },
      { name: "MLOps & Cloud Deployment", current: 10, required: 75 },
      { name: "Mathematics & Statistics", current: 40, required: 85 }
    ],
    roadmap: [
      {
        id: "ai-1",
        title: "Mathematical Foundations & Python",
        description: "Master NumPy, Pandas, linear algebra, and gradient descent mechanics.",
        type: "theory",
        status: "completed",
        resources: ["3Blue1Brown Linear Algebra", "Python Data Science Handbook"]
      },
      {
        id: "ai-2",
        title: "Model Building (Build Inventory System AI)",
        description: "Train classification models and build predictive algorithms for stock levels.",
        type: "project",
        status: "active",
        resources: ["Scikit-Learn Tutorials", "Fast.ai Practical Deep Learning"],
        linkedProjectId: "proj-2"
      },
      {
        id: "ai-3",
        title: "NLP & LLM Integrations",
        description: "Build custom Retrieval Augmented Generation (RAG) pipelines and fine-tune APIs.",
        type: "study",
        status: "locked",
        resources: ["Hugging Face Course", "LangChain Documentation"]
      },
      {
        id: "ai-4",
        title: "Production Deployment",
        description: "Containerize ML APIs using Docker and deploy them to cloud engines (AWS/GCP).",
        type: "internship",
        status: "locked",
        resources: ["MLOps Zoomcamp", "Kubernetes basics"]
      }
    ],
    weeklyGoals: [
      { id: "g-ai-1", text: "Train a decision tree model on inventory datasets", completed: false, xpReward: 60 },
      { id: "g-ai-2", text: "Set up a FastAPI server returning predictions", completed: false, xpReward: 70 },
      { id: "g-ai-3", text: "Read the original Attention Is All You Need paper", completed: false, xpReward: 80 }
    ],
    advisorGreeting: "Welcome to the future of technology. As your AI Career Twin, I will help you master machine learning and AI integrations. We will focus on building API microservices, neural nets, and automated scripts for real companies. Ready to dive into code?"
  },
  "Frontend Developer": {
    title: "Frontend Developer",
    description: "Create pixel-perfect, highly interactive, and responsive user interfaces using modern web technologies.",
    skills: [
      { name: "HTML5 & CSS3/Sass", current: 60, required: 90 },
      { name: "JavaScript (ES6+)", current: 45, required: 85 },
      { name: "React & State Management", current: 20, required: 80 },
      { name: "Responsive Design & Accessibility", current: 30, required: 75 },
      { name: "Build Tools (Vite, Webpack)", current: 15, required: 70 }
    ],
    roadmap: [
      {
        id: "fe-1",
        title: "Web Core Essentials",
        description: "Master semantic HTML, CSS flexbox/grid layout structures, and DOM manipulations.",
        type: "theory",
        status: "completed",
        resources: ["MDN Web Docs", "CSS-Tricks Guides"]
      },
      {
        id: "fe-2",
        title: "UI Design (Marketing Automation UI)",
        description: "Build reactive landing pages, state-driven widgets, and configure complex dashboards.",
        type: "project",
        status: "active",
        resources: ["React Official Docs", "CSS Modules Guidelines"],
        linkedProjectId: "proj-3"
      },
      {
        id: "fe-3",
        title: "Advanced State & Performance",
        description: "Optimize render trees, manage global state with Context/Redux, and configure routing systems.",
        type: "study",
        status: "locked",
        resources: ["Kent C. Dodds React Articles", "Webpack/Vite optimizations"]
      },
      {
        id: "fe-4",
        title: "Real-World Deployment & Tests",
        description: "Configure unit testing with Jest/RTL, and set up CI/CD pipelines to Vercel/Netlify.",
        type: "internship",
        status: "locked",
        resources: ["Testing Library Docs", "GitHub Actions Tutorial"]
      }
    ],
    weeklyGoals: [
      { id: "g-fe-1", text: "Refactor a form using React hooks and custom validations", completed: false, xpReward: 50 },
      { id: "g-fe-2", text: "Implement clean glassmorphism styling card in CSS", completed: false, xpReward: 40 },
      { id: "g-fe-3", text: "Optimize web assets to score 90+ on Lighthouse audit", completed: false, xpReward: 80 }
    ],
    advisorGreeting: "Greetings! I'm your Frontend Career Twin. Together, we'll design web apps that user can't take their eyes off. We will focus on smooth animations, dynamic states, and scalable React components. Let's make the web beautiful!"
  }
};

export const PROJECTS = [
  {
    id: "proj-1",
    title: "Design a Food Delivery App",
    sponsor: "BiteLocal",
    sponsorType: "Local Business",
    description: "Design the end-to-end client booking flow and order-tracking dashboard for local independent restaurants, helping them bypass high aggregator fees.",
    difficulty: "Medium",
    deliverables: [
      "User persona profiles & user flows",
      "Interactive high-fidelity wireframes",
      "Heuristic evaluation report"
    ],
    rewards: {
      xp: 400,
      credits: 3,
      reputation: 8
    },
    skillsEarned: ["UX Design & Wireframing", "Product Strategy", "Market Research"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "proj-2",
    title: "Build Smart Inventory System",
    sponsor: "FeedShare",
    sponsorType: "NGO",
    description: "Develop a predictive analytics inventory system to anticipate weekly food donation needs and reduce waste at a community regional food hub.",
    difficulty: "Hard",
    deliverables: [
      "Forecasting algorithm model (Python/JS)",
      "Database schema configuration",
      "Live operational dashboard UI"
    ],
    rewards: {
      xp: 600,
      credits: 5,
      reputation: 15
    },
    skillsEarned: ["Python & PyTorch", "Machine Learning Models", "Mathematics & Statistics"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "proj-3",
    title: "Marketing Automation Flow",
    sponsor: "GrowthAI",
    sponsorType: "Startup",
    description: "Construct an automated email sequencing flow and tracking analytics board that triggers based on student sign-up behaviors and engagement metrics.",
    difficulty: "Easy",
    deliverables: [
      "Sequence flow diagram",
      "Responsive email newsletter templates",
      "Trigger logic script / Webhook setup"
    ],
    rewards: {
      xp: 300,
      credits: 2,
      reputation: 5
    },
    skillsEarned: ["HTML5 & CSS3/Sass", "JavaScript (ES6+)", "Responsive Design & Accessibility"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "proj-4",
    title: "Renewable Energy Dashboard",
    sponsor: "EcoSphere",
    sponsorType: "NGO",
    description: "Design and implement a real-time data visualizer for community solar panel performance, illustrating total output, savings, and carbon offset.",
    difficulty: "Medium",
    deliverables: [
      "Chart.js/SVG visual integrations",
      "Carbon savings calculator engine",
      "Responsive layout for tablets and desktop"
    ],
    rewards: {
      xp: 500,
      credits: 4,
      reputation: 10
    },
    skillsEarned: ["React & State Management", "JavaScript (ES6+)", "Responsive Design & Accessibility"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "proj-5",
    title: "AI Customer Support Chatbot",
    sponsor: "Nexis Corp",
    sponsorType: "Company",
    description: "Integrate a customized RAG-based AI support bot into an existing service portal to resolve common customer issues using document-matching API calls.",
    difficulty: "Hard",
    deliverables: [
      "API route handlers",
      "Chat user interface component",
      "Evaluation metric report (accuracy & latency)"
    ],
    rewards: {
      xp: 750,
      credits: 6,
      reputation: 20
    },
    skillsEarned: ["NLP & Large Language Models", "Python & PyTorch", "MLOps & Cloud Deployment"],
    image: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=800&auto=format&fit=crop&q=60"
  }
];

export const MOCK_PEERS = [
  {
    id: "peer-1",
    name: "Sarah Kim",
    avatar: "SK",
    targetGoal: "Product Manager",
    skills: ["User Research", "Market Research", "Agile & Scrum"],
    interests: ["Fintech", "Mobile Design", "SaaS", "UX Wireframes"],
    bio: "Ex-marketing manager transitioning to Product. Love building zero-to-one mobile apps.",
    squadJoined: false
  },
  {
    id: "peer-2",
    name: "Devon Miller",
    avatar: "DM",
    targetGoal: "AI Engineer",
    skills: ["Python & PyTorch", "Mathematics & Statistics"],
    interests: ["Generative AI", "NLP", "Robotics", "MLOps"],
    bio: "Data science undergrad specializing in Large Language Models and custom vector indexing.",
    squadJoined: false
  },
  {
    id: "peer-3",
    name: "Elena Rostova",
    avatar: "ER",
    targetGoal: "Frontend Developer",
    skills: ["HTML5 & CSS3/Sass", "JavaScript (ES6+)", "React & State Management"],
    interests: ["Web Accessibility", "Creative Layouts", "SaaS UI", "TailwindCSS"],
    bio: "Visual designer switching to frontend development. Addicted to CSS grid structures.",
    squadJoined: false
  },
  {
    id: "peer-4",
    name: "Arjun Mehta",
    avatar: "AM",
    targetGoal: "Product Manager",
    skills: ["Data Analytics", "Product Strategy", "Agile & Scrum"],
    interests: ["Data-driven Growth", "EdTech", "B2B SaaS", "SQL Analysis"],
    bio: "Business operations lead moving to Product Management. Love optimization case studies.",
    squadJoined: false
  },
  {
    id: "peer-5",
    name: "Chloe Dupont",
    avatar: "CD",
    targetGoal: "AI Engineer",
    skills: ["Python & PyTorch", "Machine Learning Models", "MLOps & Cloud Deployment"],
    interests: ["Computer Vision", "HealthTech", "FastAPI", "Data Quality"],
    bio: "ML developer exploring automated diagnostic systems and real-time inference serving.",
    squadJoined: false
  },
  {
    id: "peer-6",
    name: "Tariq Yusuf",
    avatar: "TY",
    targetGoal: "Frontend Developer",
    skills: ["HTML5 & CSS3/Sass", "JavaScript (ES6+)", "React & State Management"],
    interests: ["NextJS", "State Management", "Animations", "TailwindCSS"],
    bio: "React developer interested in building high-performance interactive dashboards.",
    squadJoined: false
  }
];

export const INTERNSHIPS = [
  {
    id: "int-1",
    company: "BiteLocal",
    companyType: "Startup",
    title: "Product Management Intern (Micro-Internship)",
    type: "Micro Internship",
    duration: "4 weeks",
    requirements: [
      { name: "Product Strategy", minLevel: 50 },
      { name: "UX Design & Wireframing", minLevel: 55 }
    ],
    description: "Map and structure the merchant onboarding user journey. Document functional flow specifications and collaborate on engineering product requirements (PRDs).",
    rewards: { xp: 800, credits: 5, reputation: 25 },
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
    status: "open"
  },
  {
    id: "int-2",
    company: "EcoSphere",
    companyType: "NGO",
    title: "Carbon Offset Developer (Remote Project)",
    type: "Remote Project",
    duration: "6 weeks",
    requirements: [
      { name: "HTML5 & CSS3/Sass", minLevel: 65 },
      { name: "React & State Management", minLevel: 45 }
    ],
    description: "Design and code dynamic visualizers representing local offset metrics. Set up chart loaders, metric triggers, and optimize page responses for community members.",
    rewards: { xp: 1000, credits: 7, reputation: 35 },
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60",
    status: "open"
  },
  {
    id: "int-3",
    company: "Nexis Corp",
    companyType: "Enterprise",
    title: "AI Engineer (Startup Internship)",
    type: "Startup Internship",
    duration: "12 weeks",
    requirements: [
      { name: "Python & PyTorch", minLevel: 65 },
      { name: "Machine Learning Models", minLevel: 55 }
    ],
    description: "Develop RAG pipelines to read internal documentation systems. Build custom Python scripts and construct API route servers using FastAPI and Docker containers.",
    rewards: { xp: 1600, credits: 12, reputation: 50 },
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60",
    status: "open"
  }
];

export const ARENA_CHALLENGES = [
  {
    id: "ch-1",
    title: "Rural Health AI Diagnostic Router",
    category: "Social Problem",
    host: "HealthForAll Accelerator",
    description: "Architect a routing topology to triage diagnostic reports from rural medical clinics to regional hospitals using low-bandwidth JSON packets.",
    rewards: {
      grant: "$10,000 Seed Capital",
      incubation: "Incubation in Aegis Bio-Cohort",
      offer: "Vetted Micro-placement",
      xp: 1500,
      reputation: 60
    },
    difficulty: "High",
    requiredSkill: "Machine Learning Models",
    minSkillLevel: 55
  },
  {
    id: "ch-2",
    title: "Zero-Waste Grocery Log Engine",
    category: "Startup Problem",
    host: "ScaleUp Labs",
    description: "Formulate a predictive ledger tracking perishable storage levels, optimizing order-schedules for hyper-local grocers using seasonal demand models.",
    rewards: {
      grant: "$5,000 Funding",
      incubation: "Access to ScaleUp coworking labs",
      offer: "Fast-tracked Lead Interview",
      xp: 1200,
      reputation: 45
    },
    difficulty: "Medium",
    requiredSkill: "Data Analytics",
    minSkillLevel: 50
  },
  {
    id: "ch-3",
    title: "Community Solar Power Grid Ledger",
    category: "Industry Challenge",
    host: "CleanPower Coalition",
    description: "Design an output visualizer tracking real-time community solar output spikes, mapping surpluses to credit payouts on a simplified user portal.",
    rewards: {
      grant: "$15,000 Seed Grant",
      incubation: "Incubation in CleanPower Green Labs",
      offer: "Lead UI Developer Offer",
      xp: 2000,
      reputation: 80
    },
    difficulty: "Elite",
    requiredSkill: "React & State Management",
    minSkillLevel: 60
  }
];

export const MENTOR_REVIEWS = [
  {
    id: "rev-1",
    mentor: "Dr. Aris Thorne",
    role: "Lead AI Scientist, Aegis Lab",
    comment: "Exceptional coding discipline. Code submissions demonstrate solid modular architecture and clear understanding of computational limits.",
    rating: 4.8
  },
  {
    id: "rev-2",
    mentor: "Linda Vance",
    role: "Senior Director of Products, ScaleUp",
    comment: "Outstanding wireframing detail. She/he has a keen eye for finding friction points in user onboarding funnels and translating user needs into PRD blueprints.",
    rating: 4.9
  },
  {
    id: "rev-3",
    mentor: "Marcus Aurel",
    role: "NGO Program Lead, EcoSphere",
    comment: "Highly cooperative team player. Guided squad members during the inventory mapping sprint and structured tasks to meet deadlines.",
    rating: 4.7
  }
];

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
