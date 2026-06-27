// Career Guidance Dataset for Indian Students (with special highlights for Andhra Pradesh)

export const PATHWAY_DATA = {
  schooling: {
    title: "After 10th Class (Schooling)",
    description: "Completed secondary education? You have four main paths to choose from based on your interests, budget, and career goals.",
    options: [
      {
        id: "intermediate",
        title: "Intermediate (10+2 / HSC)",
        duration: "2 Years",
        focus: "Academic & Theory-focused",
        suitability: "Recommended for students aiming for professional degrees like B.Tech, MBBS, CA, Law, etc.",
        nextSteps: "Leads to Engineering, Medical, Arts, Commerce, Management, and Science degrees.",
        icon: "BookOpen",
        streams: ["MPC", "BiPC", "CEC", "MEC", "HEC"]
      },
      {
        id: "diploma",
        title: "Polytechnic / Diploma",
        duration: "3 Years",
        focus: "Practical & Skill-focused",
        suitability: "Great for hands-on learners looking for early employment or lateral entry directly to 2nd year B.Tech.",
        nextSteps: "Leads to Junior Engineer jobs or Engineering degree through AP ECET lateral entry.",
        icon: "Cpu",
        streams: ["Computer Engineering", "ECE", "Mechanical", "Civil", "EEE"]
      },
      {
        id: "iti",
        title: "ITI (Industrial Training)",
        duration: "1-2 Years",
        focus: "Trade-specific hands-on training",
        suitability: "Best for quick entry into technical trades like electrical, mechanical fabrication, etc.",
        nextSteps: "Direct jobs in railways, PSUs, manufacturing, or self-employment.",
        icon: "Wrench",
        streams: ["Electrician", "Fitter", "Welder", "Diesel Mechanic"]
      },
      {
        id: "vocational",
        title: "Vocational Courses",
        duration: "2 Years",
        focus: "Specialized vocational streams",
        suitability: "For students interested in specific services (nursing assistance, digital media, office management).",
        nextSteps: "Immediate entry level employment or specialized diplomas.",
        icon: "Briefcase",
        streams: ["Medical Lab Tech", "Accounting & Auditing", "Office Secretaryship"]
      }
    ]
  },
  
  intermediateStreams: {
    title: "Intermediate Streams (10+2)",
    description: "In India, Intermediate is categorized into major subject streams. Choose the stream that matches your target graduation degree.",
    streams: [
      {
        id: "MPC",
        name: "MPC (Mathematics, Physics, Chemistry)",
        description: "The core stream for engineering and technology enthusiasts.",
        paths: [
          { name: "Engineering (B.Tech/B.E)", duration: "4 Years", info: "Paths in CS, IT, AI, Mechanical, ECE, Civil, etc. via JEE Main, AP EAPCET." },
          { name: "Architecture (B.Arch)", duration: "5 Years", info: "Design and construction of buildings via NATA or JEE Paper 2." },
          { name: "Defense Services (NDA)", duration: "3 Years", info: "Join Army, Navy, or Air Force officer cadres through NDA entrance exam." },
          { name: "Merchant Navy", duration: "3-4 Years", info: "Nautical Science or Marine Engineering for careers at sea." },
          { name: "B.Sc / BCA / Data Science", duration: "3-4 Years", info: "Degrees in Computer Applications, Math, Physics, or Statistics." }
        ]
      },
      {
        id: "BiPC",
        name: "BiPC (Biology, Physics, Chemistry)",
        description: "The dream path for medicine, life sciences, and healthcare fields.",
        paths: [
          { name: "Medicine (MBBS)", duration: "5.5 Years", info: "Allopathic medicine practitioner through NEET UG entrance exam." },
          { name: "Dental Surgery (BDS)", duration: "5 Years", info: "Dental care professional through NEET UG entrance exam." },
          { name: "AYUSH (BAMS, BHMS, BUMS)", duration: "5.5 Years", info: "Alternative medicine systems (Ayurveda, Homeopathy, Unani) via NEET." },
          { name: "Agriculture & Veterinary Science", duration: "4-5 Years", info: "High-demand careers in Agri-business, Animal health via AP EAPCET." },
          { name: "Pharmacy (B.Pharm / Pharm.D)", duration: "4-6 Years", info: "Drug formulation, pharmaceutical industry via EAPCET/NEET." },
          { name: "Allied Health Sciences (Nursing, Physio)", duration: "3-4.5 Years", info: "Nursing, Physiotherapy, Lab tech, Radiology courses." }
        ]
      },
      {
        id: "MEC",
        name: "MEC (Mathematics, Economics, Commerce)",
        description: "A versatile blend of quantitative skill and commercial training.",
        paths: [
          { name: "Chartered Accountancy (CA)", duration: "4.5 Years", info: "Premium audit and tax professional path via ICAI Foundation." },
          { name: "Company Secretary (CS)", duration: "3-4 Years", info: "Corporate law compliance and governance via ICSI CSEET." },
          { name: "Management (BBA / BMS)", duration: "3 Years", info: "Foundation for MBA, corporate roles, HR, and marketing." },
          { name: "Economics (B.A./B.Sc. Hons)", duration: "3-4 Years", info: "High-value career in policy, analytics, banking, and research." },
          { name: "Actuarial Science", duration: "3-5 Years", info: "Risk modeling in finance/insurance using high-level mathematics." }
        ]
      },
      {
        id: "CEC",
        name: "CEC (Commerce, Economics, Civics)",
        description: "The ideal foundation for business management, finance, and humanities.",
        paths: [
          { name: "Commerce (B.Com General/Computers)", duration: "3 Years", info: "Core business degree in accounting, taxation, and business laws." },
          { name: "Law (Integrated BA LLB / BBA LLB)", duration: "5 Years", info: "Professional lawyer or corporate counsel via CLAT or AP LAWCET." },
          { name: "Business Management (BBA)", duration: "3 Years", info: "Corporate administration, startup management, and marketing." },
          { name: "Hotel & Hospitality Management", duration: "3-4 Years", info: "Global career in luxury hotels, tourism, and event management." },
          { name: "Cost & Management Accountancy (CMA)", duration: "3-4 Years", info: "Cost accounting and budgeting professional via ICMAI." }
        ]
      },
      {
        id: "HEC",
        name: "HEC (History, Economics, Civics)",
        description: "The classical stream for administrative services, law, and creative fields.",
        paths: [
          { name: "Civil Services (UPSC / APPSC Group I & II)", duration: "Preparation based", info: "IAS, IPS, IRS, and Deputy Collector administrative officer roles." },
          { name: "Law (BA LLB)", duration: "5 Years", info: "Five-year integrated law degree via CLAT/LAWCET." },
          { name: "Humanities (BA Hons in History, Pol Sci)", duration: "3-4 Years", info: "Research, teaching, public policy, and think-tank advisory." },
          { name: "Journalism & Mass Comm", duration: "3 Years", info: "Media, broadcasting, writing, advertising, and public relations." },
          { name: "Fine Arts, Design & Animation", duration: "3-4 Years", info: "Fashion design, UX/UI, animation, and graphic arts via NIFT/UCEED." }
        ]
      }
    ]
  },
  
  diplomaLateral: {
    title: "Diploma (Polytechnic) & Lateral Entry Pathway",
    description: "Did you know? Diploma holders in India (including Andhra Pradesh) have a unique path to engineering. Instead of starting B.Tech from the 1st year, they can skip it entirely and join directly in the 2nd year!",
    benefits: [
      "No 11th & 12th stress - focus directly on core engineering basics from day one.",
      "Practical-heavy lab learning, making you more industrial-ready than regular students.",
      "Cost-effective: Can secure jobs right after 3-year diploma, or study B.Tech with 1 year saved.",
      "AP Specific: Through AP ECET (Engineering Common Entrance Test), you get a reservation quota for admission to B.Tech 2nd year."
    ],
    flow: [
      { step: "1", title: "Complete 10th Class", details: "Pass board exams with good grades in Mathematics and Science." },
      { step: "2", title: "Write Entrance Exam", details: "Write AP POLYCET (Polytechnic Common Entrance Test) to get a state rank." },
      { step: "3", title: "Study 3-Yr Diploma", details: "Join polytechnic in fields like CSE, ECE, EEE, Mechanical, Civil, Chemical." },
      { step: "4", title: "Write AP ECET", details: "Write Engineering Common Entrance Test in your final year of diploma." },
      { step: "5", title: "Lateral Entry B.Tech", details: "Directly join 2nd Year (3rd semester) B.Tech in top colleges. Study only 3 years." }
    ]
  }
};

export const EXAM_DATA = [
  // National Exams
  {
    id: "jee",
    name: "JEE (Joint Entrance Examination) Main & Advanced",
    level: "National",
    stream: "Engineering & Architecture",
    eligibility: "Completed/Appearing 12th Class with MPC (Maths, Physics, Chemistry)",
    dates: "Main: January & April | Advanced: May/June",
    description: "Entrance portal for top-tier Indian institutes including IITs, NITs, and IIITs. JEE Main is the qualifier for JEE Advanced (needed for IITs).",
    url: "https://jeemain.nta.nic.in/"
  },
  {
    id: "neet",
    name: "NEET UG (National Eligibility cum Entrance Test)",
    level: "National",
    stream: "Medical & Allied Healthcare",
    eligibility: "Completed/Appearing 12th Class with BiPC (Biology, Physics, Chemistry), min 17 years old",
    dates: "May (Once a year)",
    description: "The single national exam for admissions to MBBS, BDS, BAMS, BHMS, and other medical/dental courses across all government and private colleges.",
    url: "https://neet.nta.nic.in/"
  },
  {
    id: "clat",
    name: "CLAT (Common Law Admission Test)",
    level: "National",
    stream: "Law (5-Year Integrated LLB)",
    eligibility: "Completed/Appearing 12th Class (Any stream), minimum 45% marks",
    dates: "December (Usually held before board exams)",
    description: "National exam for admission to 24 National Law Universities (NLUs) in India offering integrated BA/BBA/B.Com LLB programs.",
    url: "https://consortiumofnlus.ac.in/"
  },
  {
    id: "nda",
    name: "NDA & NA Exam (National Defence Academy)",
    level: "National",
    stream: "Defense Services",
    eligibility: "Unmarried males and females, 12th class pass (MPC required for Navy/Air Force)",
    dates: "April & September (Twice a year)",
    description: "Conducted by UPSC, selection includes a written exam followed by SSB Interview for commissioning as officers in Army, Navy, and Air Force.",
    url: "https://upsc.gov.in"
  },
  {
    id: "cuet",
    name: "CUET UG (Common University Entrance Test)",
    level: "National",
    stream: "Arts, Sciences, Commerce, Management",
    eligibility: "Completed/Appearing 12th Class (Any stream)",
    dates: "May (Once a year)",
    description: "A centralized test for admissions to undergraduate programs in all Central Universities (like Delhi University, BHU, JNU) and many state universities.",
    url: "https://cuet.samarth.ac.in/"
  },
  {
    id: "nata",
    name: "NATA (National Aptitude Test in Architecture)",
    level: "National",
    stream: "Architecture (B.Arch)",
    eligibility: "12th with PCM or 10+3 Diploma with Mathematics",
    dates: "Multiple phases between April and July",
    description: "Measures drawing and observation skills, aesthetic sensitivity, and critical thinking for admission to 5-year B.Arch courses.",
    url: "https://www.nata.in/"
  },
  
  // AP State Exams
  {
    id: "apeapcet",
    name: "AP EAPCET (Engineering, Agriculture & Pharmacy Common Entrance Test)",
    level: "AP State",
    stream: "Engineering, Agriculture & Pharmacy",
    eligibility: "Completed/Appearing 12th Class (MPC for Engineering, BiPC for Agriculture/Pharmacy)",
    dates: "May (Once a year)",
    description: "Conducted by APSCHE (formerly EAMCET). Gatekeeper to engineering (B.Tech), agriculture (B.Sc Agri), veterinary (BVSc), and pharmacy (B.Pharm/Pharm.D) courses in Andhra Pradesh colleges.",
    url: "https://cets.apsche.ap.gov.in"
  },
  {
    id: "appolycet",
    name: "AP POLYCET (Polytechnic Common Entrance Test)",
    level: "AP State",
    stream: "Diploma / Polytechnic",
    eligibility: "Passed/Appearing 10th Class (SSC) from AP Board or equivalent with Math/Science",
    dates: "April (Once a year)",
    description: "State-level exam for admission to 3-year diploma courses in government, aided, and private polytechnic institutions across Andhra Pradesh.",
    url: "https://polycetap.nic.in"
  },
  {
    id: "apecet",
    name: "AP ECET (Engineering Common Entrance Test for Diploma Holders)",
    level: "AP State",
    stream: "Engineering Lateral Entry",
    eligibility: "Completed 3-year Diploma in Engineering/Technology or B.Sc with Mathematics",
    dates: "May (Once a year)",
    description: "Enables diploma holders to gain direct lateral entry admission to the 2nd year (3rd semester) of B.E. / B.Tech programs in AP engineering colleges.",
    url: "https://cets.apsche.ap.gov.in"
  },
  {
    id: "aplawcet",
    name: "AP LAWCET",
    level: "AP State",
    stream: "Law (3-Year & 5-Year)",
    eligibility: "12th Class for 5-Year LLB | Any Graduation for 3-Year LLB",
    dates: "June (Once a year)",
    description: "State-level entrance exam for admissions to LLB programs in law colleges of Andhra Pradesh.",
    url: "https://cets.apsche.ap.gov.in"
  },
  {
    id: "apicet",
    name: "AP ICET (Integrated Common Entrance Test)",
    level: "AP State",
    stream: "Postgraduation (MBA/MCA)",
    eligibility: "Recognized Bachelor's Degree with minimum 50% marks (45% for reserved)",
    dates: "May/June (Once a year)",
    description: "State entrance test for admissions to MBA and MCA courses in state universities and affiliated professional colleges in AP.",
    url: "https://cets.apsche.ap.gov.in"
  }
];

export const AP_PORTAL_DATA = {
  reservationZones: [
    { name: "AU Area (Andhra University)", districts: "Srikakulam, Vizianagaram, Visakhapatnam, East Godavari, West Godavari, Krishna, Guntur, Prakasam", quota: "85% local seats reserved in colleges located in this zone." },
    { name: "SVU Area (Sri Venkateswara University)", districts: "Nellore, Chittoor, Kadapa, Anantapur, Kurnool", quota: "85% local seats reserved in colleges located in this zone." },
    { name: "State-wide / OU Area (Osmania University)", districts: "Note: Hyderabad-based older institutes. Some state-wide institutions in AP offer open-to-all pools.", quota: "15% unreserved seats open to students from both AU and SVU regions." }
  ],
  schemes: [
    {
      name: "Jagananna Vidya Deevena (JVD)",
      type: "Fee Reimbursement",
      eligibility: "Students studying ITI, Polytechnic, Degree, Engineering, Medicine, and PG courses. Annual family income must be under ₹2.5 Lakhs. Attendance must be above 75%.",
      benefits: "100% tuition fee reimbursement credited directly to the mother's bank account in quarterly installments to pay the college."
    },
    {
      name: "Jagananna Vasathi Deevena (Javad)",
      type: "Hostel & Mess Charges",
      eligibility: "All students eligible for Jagananna Vidya Deevena.",
      benefits: "Financial assistance for boarding and lodging expenses: ₹10,000 per year for ITI students, ₹15,000 for Polytechnic students, and ₹20,000 for Degree/Engineering/Medicine students."
    },
    {
      name: "AP State Minorities Welfare Scholarship",
      type: "Scholarship",
      eligibility: "Post-matric students belonging to minority communities (Muslims, Christians, Sikhs, Buddhists, Parsis, Jains). Income limit applies.",
      benefits: "Tuition fee reimbursement and maintenance allowance for post-matric professional courses."
    }
  ],
  admissionQuotas: [
    {
      name: "Convenor Quota (Category-A)",
      share: "70% Seats in Private, 100% in Govt",
      criteria: "Entrance rank in state exams (AP EAPCET / ECET / POLYCET). Done via APSCHE online single window counseling.",
      benefits: "Full Fee Reimbursement (JVD) eligible. Standardized low government-capped fees."
    },
    {
      name: "Management Quota (Category-B)",
      share: "30% Seats in Private Colleges",
      criteria: "Admitted by the college directly based on JEE Main ranks, AP EAPCET ranks, or Intermediate marks.",
      benefits: "NOT eligible for Fee Reimbursement. High tuition fees and optional development charges apply."
    },
    {
      name: "Lateral Entry Quota",
      share: "10% Supernumerary Seats in 2nd Year B.Tech",
      criteria: "Polytechnic Diploma holders who pass AP ECET. Admissions mapped directly to the second year.",
      benefits: "Full Fee Reimbursement (JVD) eligible if admitted under Convenor quota."
    }
  ],
  admissionSteps: [
    { phase: "1. Entrance Exam", details: "Qualify in POLYCET (diploma), EAPCET (degree/engg), or ECET (lateral entry)." },
    { phase: "2. Certificate Verification", details: "Upload documents online or visit Help Line Centers (HLCs) for physical verification (caste, income, study certificates)." },
    { phase: "3. Web Options Entry", details: "Critically important! Fill out a prioritized list of colleges and branches on the APSCHE counseling portal." },
    { phase: "4. Seat Allotment", details: "APSCHE releases college allotments based on rank, reservation category, gender, and options entered." },
    { phase: "5. Self-Reporting & Joining", details: "Report online via the portal and physically submit original documents at the college to confirm your seat." }
  ],
  topColleges: [
    { name: "Andhra University (AU) College of Engineering", location: "Visakhapatnam", type: "State Government", ratings: "NAAC A++ | Top State Univ", popularFor: "CSE, ECE, Chemical, Pharmacy, Marine", baseCutoff: 5000, cityRegion: "visakhapatnam", fees: { convenor: "₹35,000/year (Govt standard)", management: "N/A (Government Intake Only)", nri: "₹1,50,000/year" } },
    { name: "JNTU Kakinada (JNTUK) College of Engineering", location: "Kakinada", type: "State Government", ratings: "Top Technical University", popularFor: "Computer Science, Civil, EEE, ECE", baseCutoff: 7000, cityRegion: "kakinada-godavari", fees: { convenor: "₹40,000/year", management: "N/A (Government Intake Only)", nri: "₹1,80,000/year" } },
    { name: "Sri Venkateswara University (SVU) College of Engineering", location: "Tirupati", type: "State Government", ratings: "NAAC A+ | Premium State Univ", popularFor: "Electrical, ECE, Chemical, Civil", baseCutoff: 10000, cityRegion: "tirupati-nellore", fees: { convenor: "₹38,000/year", management: "N/A (Government Intake Only)", nri: "₹1,60,000/year" } },
    { name: "JNTU Anantapur (JNTUA) College of Engineering", location: "Anantapur", type: "State Government", ratings: "NAAC A", popularFor: "Mechanical, CSE, EEE, Chemical", baseCutoff: 12000, cityRegion: "anantapur-kadapa", fees: { convenor: "₹38,000/year", management: "N/A (Government Intake Only)", nri: "₹1,50,000/year" } },
    { name: "JNTU Gurajada Vizianagaram (JNTUGV)", location: "Vizianagaram", type: "State Government", ratings: "State University", popularFor: "IT, CSE, Metallurgical, EEE", baseCutoff: 15000, cityRegion: "visakhapatnam", fees: { convenor: "₹35,000/year", management: "N/A", nri: "₹1,20,000/year" } },
    { name: "Acharya Nagarjuna University (ANU)", location: "Guntur", type: "State Government", ratings: "NAAC A", popularFor: "Civil, Biotech, EEE, CSE", baseCutoff: 20000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹35,000/year", management: "N/A", nri: "₹1,20,000/year" } },
    { name: "Yogi Vemana University (YVU)", location: "Kadapa", type: "State Government", ratings: "NAAC A", popularFor: "Sciences, Metallurgy, CSE", baseCutoff: 22000, cityRegion: "anantapur-kadapa", fees: { convenor: "₹32,000/year", management: "N/A", nri: "N/A" } },
    { name: "IIT Tirupati", location: "Tirupati", type: "National (Central Govt)", ratings: "NIRF Ranked IIT", popularFor: "Core Engineering, AI, Civil, Electrical", baseCutoff: 1000, cityRegion: "tirupati-nellore", fees: { convenor: "₹2,20,000/year", management: "N/A (JEE Advanced Intake Only)", nri: "N/A (JEE DASA: $4,000)" } },
    { name: "NIT Andhra Pradesh", location: "Tadepalligudem", type: "National (Central Govt)", ratings: "National Institute", popularFor: "CSE, Biotech, Chemical, ECE", baseCutoff: 2000, cityRegion: "kakinada-godavari", fees: { convenor: "₹1,45,000/year", management: "N/A (CSAB Intake Only)", nri: "N/A (JEE DASA: $4,000)" } },
    { name: "IIIT Sri City", location: "Sri City", type: "PPP National Institute", ratings: "Superb CS Placements", popularFor: "Computer Science, AI, ECE", baseCutoff: 2500, cityRegion: "tirupati-nellore", fees: { convenor: "₹3,00,000/year", management: "N/A", nri: "N/A" } },
    { name: "VIT AP University", location: "Amaravati", type: "Private University", ratings: "Top Private Ranked", popularFor: "CSE, AI & SE, ECE, Biotech", baseCutoff: 12000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹95,000/year (EAPCET quota)", management: "₹2,01,000/year (VITEEE Cat-1)", nri: "₹4,50,000/year ($5,400)" } },
    { name: "SRM University AP", location: "Amaravati", type: "Private University", ratings: "Premium Private Brand", popularFor: "CSE, AIDS, Mech, EEE, Biotech", baseCutoff: 10000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹1,15,000/year (EAPCET)", management: "₹2,50,000/year", nri: "₹5,00,000/year ($6,000)" } },
    { name: "Velagapudi Ramakrishna (VR) Siddhartha Engineering College", location: "Vijayawada", type: "Private Autonomous", ratings: "NAAC A+ | Premium Private", popularFor: "Information Tech, CSE, Civil, EEE", baseCutoff: 14000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹70,000/year", management: "₹1,80,000/year", nri: "₹3,50,000/year ($4,200)" } },
    { name: "Prasad V. Potluri Siddhartha Institute of Technology (PVPSIT)", location: "Vijayawada", type: "Private Autonomous", ratings: "NAAC A+", popularFor: "CSE, IT, ECE, Mech", baseCutoff: 18000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹65,000/year", management: "₹1,60,000/year", nri: "₹3,00,000/year ($3,600)" } },
    { name: "Lakireddy Bali Reddy College of Engineering (LBRCE)", location: "Mylavaram", type: "Private Autonomous", ratings: "NAAC A", popularFor: "CSE, Aerospace, EEE, ECE", baseCutoff: 20000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹56,000/year", management: "₹1,40,000/year", nri: "₹2,80,000/year ($3,300)" } },
    { name: "DVR & Dr. HS MIC College of Technology (MIC College)", location: "Kanchikacherla", type: "Private Autonomous", ratings: "NAAC A", popularFor: "CSE, IT, ECE, Mech", baseCutoff: 28000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹45,000/year", management: "₹1,10,000/year", nri: "₹2,20,000/year ($2,600)" } },
    { name: "R.V.R. & J.C. College of Engineering", location: "Guntur", type: "Private Autonomous", ratings: "NAAC A+ | Top Ranked", popularFor: "CSE, Chemical, Mech, EEE, IT", baseCutoff: 13000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹68,000/year", management: "₹1,75,000/year", nri: "₹3,50,000/year" } },
    { name: "Vasireddy Venkatadri Institute of Technology (VVIT)", location: "Guntur", type: "Private Autonomous", ratings: "NAAC A", popularFor: "CSE, AI & DS, ECE, Mech", baseCutoff: 18000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹60,000/year", management: "₹1,50,000/year", nri: "₹3,00,000/year" } },
    { name: "Bapatla Engineering College (BEC)", location: "Bapatla", type: "Private Autonomous", ratings: "NAAC A | Classic Institute", popularFor: "Civil, Mechanical, CSE, ECE", baseCutoff: 20000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹58,000/year", management: "₹1,35,000/year", nri: "₹2,70,000/year" } },
    { name: "SRK Institute of Technology", location: "Vijayawada", type: "Private Autonomous", ratings: "NAAC A", popularFor: "CSE, IT, MBA, MCA, ECE", baseCutoff: 26000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹45,000/year", management: "₹1,00,000/year", nri: "₹2,00,000/year" } },
    { name: "Dhanekula Institute of Engineering & Technology", location: "Vijayawada", type: "Private Autonomous", ratings: "NAAC A", popularFor: "CSE, EEE, Mech, Civil", baseCutoff: 25000, cityRegion: "vijayawada-guntur", fees: { convenor: "₹48,000/year", management: "₹1,10,000/year", nri: "₹2,20,000/year" } },
    { name: "Gayatri Vidya Parishad (GVP) College of Engineering", location: "Visakhapatnam", type: "Private Autonomous", ratings: "NAAC A | Top Private", popularFor: "CSE, ECE, Mechanical, Chemical", baseCutoff: 12000, cityRegion: "visakhapatnam", fees: { convenor: "₹69,000/year", management: "₹1,85,000/year", nri: "₹3,60,000/year ($4,300)" } },
    { name: "GMR Institute of Technology (GMRIT)", location: "Rajam", type: "Private Autonomous", ratings: "NAAC A | Industry Tier-1", popularFor: "Power Engg, CSE, ECE, Mechanical", baseCutoff: 16000, cityRegion: "kakinada-godavari", fees: { convenor: "₹66,000/year", management: "₹1,50,000/year", nri: "₹3,00,000/year ($3,600)" } },
    { name: "SRKR Engineering College", location: "Bhimavaram", type: "Private Autonomous", ratings: "NAAC A | Top Placements", popularFor: "CSE, Civil, Mechanical, ECE", baseCutoff: 15000, cityRegion: "kakinada-godavari", fees: { convenor: "₹67,000/year", management: "₹1,70,000/year", nri: "₹3,20,000/year ($3,800)" } },
    { name: "Aditya Engineering College", location: "Surampalem", type: "Private Autonomous", ratings: "NAAC A++ | Top Brand", popularFor: "Petroleum, CSE, Agricultural, ECE", baseCutoff: 25000, cityRegion: "kakinada-godavari", fees: { convenor: "₹50,000/year", management: "₹1,20,000/year", nri: "₹2,40,000/year" } },
    { name: "Pragati Engineering College", location: "Surampalem", type: "Private Autonomous", ratings: "NAAC A | High Placements", popularFor: "CSE, IT, EEE, Mech", baseCutoff: 22000, cityRegion: "kakinada-godavari", fees: { convenor: "₹52,000/year", management: "₹1,30,000/year", nri: "₹2,60,000/year" } },
    { name: "Mohan Babu University (Sree Vidyanikethan)", location: "Tirupati", type: "Private Autonomous / Deemed", ratings: "NAAC A", popularFor: "CSE, AI & DS, ECE, CS & System Engg", baseCutoff: 16000, cityRegion: "tirupati-nellore", fees: { convenor: "₹75,000/year", management: "₹1,90,000/year", nri: "₹3,80,000/year ($4,500)" } },
    { name: "Raghu Engineering College", location: "Visakhapatnam", type: "Private Autonomous", ratings: "NAAC A+", popularFor: "CSE, CS-IOT, ECE, Mechanical", baseCutoff: 24000, cityRegion: "visakhapatnam", fees: { convenor: "₹52,000/year", management: "₹1,20,000/year", nri: "₹2,40,000/year ($2,900)" } },
    { name: "Madanapalle Institute of Technology & Science (MITS)", location: "Madanapalle", type: "Private Autonomous", ratings: "NAAC A+", popularFor: "CSE, AI & ML, ECE, EEE", baseCutoff: 22000, cityRegion: "tirupati-nellore", fees: { convenor: "₹62,000/year", management: "₹1,50,000/year", nri: "₹3,00,000/year ($3,600)" } },
    { name: "Anil Neerukonda Institute of Technology & Sciences (ANITS)", location: "Visakhapatnam", type: "Private Autonomous", ratings: "NAAC A", popularFor: "Chemical, IT, ECE, CSE", baseCutoff: 18000, cityRegion: "visakhapatnam", fees: { convenor: "₹58,000/year", management: "₹1,30,000/year", nri: "₹2,60,000/year ($3,100)" } },
    { name: "G. Pulla Reddy Engineering College (GPREC)", location: "Kurnool", type: "Private Autonomous", ratings: "NAAC A+ | Top Rayalaseema", popularFor: "CSE, EEE, ECE, Civil", baseCutoff: 14000, cityRegion: "anantapur-kadapa", fees: { convenor: "₹68,000/year", management: "₹1,70,000/year", nri: "₹3,40,000/year" } },
    { name: "G. Pullaiah College of Engineering & Technology", location: "Kurnool", type: "Private Autonomous", ratings: "NAAC A", popularFor: "CSE, ECE, Mech", baseCutoff: 24000, cityRegion: "anantapur-kadapa", fees: { convenor: "₹50,000/year", management: "₹1,20,000/year", nri: "₹2,40,000/year" } },
    { name: "Lendi Institute of Engineering & Technology", location: "Vizianagaram", type: "Private Autonomous", ratings: "NAAC A", popularFor: "CSE, IT, ECE, EEE", baseCutoff: 22000, cityRegion: "visakhapatnam", fees: { convenor: "₹50,000/year", management: "₹1,15,000/year", nri: "₹2,30,000/year" } }
  ],
  polytechnicColleges: [
    { name: "Government Polytechnic, Vijayawada", location: "Vijayawada", type: "State Government", ratings: "Top Polytechnic", popularFor: "Diploma in CSE, ECE, EEE, Mech, Civil", baseCutoff: 1500, cityRegion: "vijayawada-guntur", fees: { convenor: "₹4,700/year (Govt fee)", management: "N/A (No Management seats)", nri: "N/A" } },
    { name: "Government Polytechnic, Visakhapatnam", location: "Visakhapatnam", type: "State Government", ratings: "Top Polytechnic", popularFor: "Diploma in Mech, CSE, ECE, EEE", baseCutoff: 2000, cityRegion: "visakhapatnam", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "Andhra Polytechnic (APT), Kakinada", location: "Kakinada", type: "State Government", ratings: "Premium Institute", popularFor: "Diploma in Civil, CSE, Mech, EEE", baseCutoff: 3000, cityRegion: "kakinada-godavari", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "S.V. Government Polytechnic, Tirupati", location: "Tirupati", type: "State Government", ratings: "Rayalaseema Top", popularFor: "Diploma in EEE, ECE, Mech, CSE", baseCutoff: 4000, cityRegion: "tirupati-nellore", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "Government Polytechnic for Women, Guntur", location: "Guntur", type: "State Government", ratings: "Premium Women's Govt", popularFor: "Diploma in CSE, ECE, Pharmacy", baseCutoff: 3500, cityRegion: "vijayawada-guntur", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "Government Polytechnic, Anantapur", location: "Anantapur", type: "State Government", ratings: "Govt Institute", popularFor: "Diploma in EEE, Mech, CSE", baseCutoff: 6000, cityRegion: "anantapur-kadapa", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "Government Polytechnic, Nellore", location: "Nellore", type: "State Government", ratings: "Govt Institute", popularFor: "Diploma in ECE, EEE, Civil", baseCutoff: 7000, cityRegion: "tirupati-nellore", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "MRAGR Government Polytechnic, Vizianagaram", location: "Vizianagaram", type: "State Government", ratings: "Govt Institute", popularFor: "Diploma in Mech, Civil, EEE", baseCutoff: 8000, cityRegion: "visakhapatnam", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "S.N.M. Government Polytechnic, Kuppam", location: "Chittoor", type: "State Government", ratings: "Govt Institute", popularFor: "Diploma in Mech, CSE, ECE", baseCutoff: 10000, cityRegion: "tirupati-nellore", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "Government Polytechnic, Proddatur", location: "Kadapa", type: "State Government", ratings: "Govt Institute", popularFor: "Diploma in EEE, ECE, Mech", baseCutoff: 9000, cityRegion: "anantapur-kadapa", fees: { convenor: "₹4,700/year", management: "N/A", nri: "N/A" } },
    { name: "GMR Polytechnic, Rajam", location: "Rajam", type: "Private Autonomous", ratings: "Industry Allied", popularFor: "Diploma in Mech, ECE, EEE", baseCutoff: 5500, cityRegion: "kakinada-godavari", fees: { convenor: "₹15,000/year", management: "₹35,000/year", nri: "N/A" } },
    { name: "Vignan's Polytechnic, Guntur", location: "Guntur", type: "Private Autonomous", ratings: "Top Private Polytechnic", popularFor: "Diploma in CSE, Civil, EEE", baseCutoff: 4500, cityRegion: "vijayawada-guntur", fees: { convenor: "₹18,000/year", management: "₹38,000/year", nri: "N/A" } }
  ]
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What subjects or topics do you enjoy learning or discussing the most?",
    options: [
      { text: "Solving puzzles, building logic, and playing with numbers or gadgets.", type: "engineering" },
      { text: "Human biology, diseases, plant life, and working in labs or health science.", type: "medical" },
      { text: "How money works, businesses, stocks, calculating profits, and trade.", type: "commerce" },
      { text: "History, society, politics, laws, writing arguments, and social issues.", type: "humanities" }
    ]
  },
  {
    id: 2,
    question: "Which of these activities sounds most exciting as a future career?",
    options: [
      { text: "Coding software, inventing smart electronics, or designing infrastructure.", type: "engineering" },
      { text: "Treating sick people/animals, discovering drugs, or researching genetics.", type: "medical" },
      { text: "Advising businesses on finances, filing audits, or starting a company.", type: "commerce" },
      { text: "Arguing cases in court, policy analysis, creative writing, or journalism.", type: "humanities" }
    ]
  },
  {
    id: 3,
    question: "How do you prefer to solve difficult problems?",
    options: [
      { text: "Using formulas, algorithms, and analytical logic.", type: "engineering" },
      { text: "Observing details, diagnosing causes, and testing in a laboratory.", type: "medical" },
      { text: "Analyzing cost-benefit, planning spreadsheets, and calculating risk.", type: "commerce" },
      { text: "Reading research, debating viewpoints, and using persuasive communication.", type: "humanities" }
    ]
  },
  {
    id: 4,
    question: "What is your preferred study duration before starting your career?",
    options: [
      { text: "3 to 4 years of solid practical or technical training (B.Tech / BCA).", type: "engineering" },
      { text: "5 to 7 years of deep study and hospital internships (MBBS / Pharmacy).", type: "medical" },
      { text: "3 to 4 years of degree study combined with professional exams (CA / CS / B.Com).", type: "commerce" },
      { text: "3 to 5 years of flexible studies, arts, or preparing for administrative exams (BA / LLB).", type: "humanities" }
    ]
  },
  {
    id: 5,
    question: "What primary goal do you seek from your professional life?",
    options: [
      { text: "Working in global tech companies, building tech products, or automation.", type: "engineering" },
      { text: "Helping society, saving lives, or doing scientific medical research.", type: "medical" },
      { text: "Leading corporate teams, running financial audits, or entrepreneurial growth.", type: "commerce" },
      { text: "Serving the nation (Civil Services), fighting for justice (Law), or media creation.", type: "humanities" }
    ]
  },
  {
    id: 6,
    question: "Which skill do you think is your strongest point?",
    options: [
      { text: "Logical reasoning, math, and mechanical understanding.", type: "engineering" },
      { text: "Patience, observational skills, and biological memory.", type: "medical" },
      { text: "Data analysis, budgeting, and commercial negotiation.", type: "commerce" },
      { text: "Public speaking, persuasive writing, and understanding social dynamics.", type: "humanities" }
    ]
  }
];

export const PARENT_GUIDE_DATA = {
  faqs: [
    {
      q: "My child wants a secure job quickly. Should they choose Intermediate or Diploma?",
      a: "If the child wants to get job-ready in 3 years, a Polytechnic Diploma is excellent. They can get Junior Engineer (JE) jobs immediately in railways, electricity boards, and private factories. If they change their mind later, they can write AP ECET and join B.Tech directly in the 2nd year. Intermediate is better if they are sure about writing JEE/NEET and doing regular 4-5 year degrees."
    },
    {
      q: "What is full fee reimbursement in AP (Jagananna Vidya Deevena) and how do we apply?",
      a: "Jagananna Vidya Deevena (JVD) provides 100% tuition fee reimbursement for courses like Polytechnic, B.Tech, Medicine, MBA, MCA, and Degrees in Andhra Pradesh. To qualify: Family income must be under ₹2.5 Lakhs, land ownership under 10 acres dry/3 acres wet, and the student must have 75% attendance. Apply during admission through the college office by submitting income, caste, and Aadhaar cards. The money is credited directly to the mother's account to pay the college."
    },
    {
      q: "Is MPC better or BiPC? What if my child is average in Mathematics?",
      a: "If your child struggles with math logic, BiPC is a great alternative. It opens paths in life sciences, nursing, agriculture, biotechnology, and medicine. However, if they have interest in computers, MPC is needed even if they are average, as basic math is required for coding. Regular practice and coaching can help them bridge the gap."
    },
    {
      q: "What is the difference between B.Tech CSE and lateral entry?",
      a: "B.Tech CSE is a standard 4-year degree for Intermediate (MPC) graduates who qualify through JEE or AP EAPCET. Lateral entry is a special scheme for students who completed a 3-year Polytechnic Diploma. These students write AP ECET and join the same B.Tech CSE class directly in the 2nd year. They skip the first-year syllabus (which covers general physics/chemistry/math) and start engineering courses immediately."
    },
    {
      q: "Are arts streams (HEC) useful for careers? Do they pay well?",
      a: "Yes! Arts and Humanities (HEC) are highly valuable, especially for students targeting Law (integrated 5-year LLB), Civil Services (IAS/IPS via UPSC), Journalism, Public Policy, UX/UI Design, and Economics. High salaries are common in corporate law, international think tanks, UX design, and mass media roles."
    }
  ],
  stressManagement: [
    { title: "Avoid Unrealistic Comparisons", desc: "Every child has a unique pace. Comparing your child's rank to relatives or neighbors leads to severe exam stress and underperformance." },
    { title: "Financial Planning Early", desc: "Check fees and scholarship eligibility (JVD/Vasathi Deevena) before lock-in. Avoid taking high-interest personal loans; prefer education loans from public banks which offer low interest and moratorium periods." },
    { title: "Alternative Options Ready", desc: "If a child misses a seat in MBBS, fields like Agriculture, Veterinary, Pharmacy, and Biotechnology offer stellar careers with less pressure. Have a Plan B!" },
    { title: "Focus on Skill over Degree", desc: "In today's job market, a degree from a top college helps, but specialized skills (coding, communication, accounting, analytical design) matter more for getting high-paying jobs." }
  ]
};
