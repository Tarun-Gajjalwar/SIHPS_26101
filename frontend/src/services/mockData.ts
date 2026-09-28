// StatSaksham Self-Contained Mock Database
// MoSPI Official Statistical Intelligence Platform

export interface MockUser {
  id: string;
  email: string;
  role: 'EMPLOYEE' | 'TRAINER' | 'ADMIN';
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    designation: string;
    experience: number;
    education: string;
    phone: string;
    bio: string;
    department: { name: string; code: string };
    jobRole: { title: string; code: string; level: string };
    competencies?: any[];
    skillGaps?: any[];
    certificates?: any[];
  };
}

export const MOCK_USERS: Record<string, MockUser> = {
  'employee@statintel.demo': {
    id: 'user-emp-001',
    email: 'employee@statintel.demo',
    role: 'EMPLOYEE',
    profile: {
      id: 'prof-001',
      firstName: 'Rahul',
      lastName: 'Sharma',
      employeeId: 'MOS2021001',
      designation: 'Statistical Data Analyst',
      experience: 3.2,
      education: 'M.Sc. Statistics, Delhi University',
      phone: '+91-9876543210',
      bio: 'Passionate about data-driven governance and statistical methodologies for policy-making.',
      department: { name: 'Economic Statistics', code: 'ECON' },
      jobRole: { title: 'Statistical Data Analyst', code: 'SDA', level: 'Junior' }
    }
  },
  'trainer@statintel.demo': {
    id: 'user-trn-002',
    email: 'trainer@statintel.demo',
    role: 'TRAINER',
    profile: {
      id: 'prof-002',
      firstName: 'Priya',
      lastName: 'Patel',
      employeeId: 'MOS2019002',
      designation: 'Training & Capacity Building Officer',
      experience: 7.5,
      education: 'Ph.D. Statistics, IIT Delhi',
      phone: '+91-9876543211',
      bio: 'Statistical trainer with expertise in survey methodology and data science education.',
      department: { name: 'Data Analytics Division', code: 'DATA' },
      jobRole: { title: 'Training & Capacity Building Officer', code: 'TRNA', level: 'Mid' }
    }
  },
  'admin@statintel.demo': {
    id: 'user-adm-003',
    email: 'admin@statintel.demo',
    role: 'ADMIN',
    profile: {
      id: 'prof-003',
      firstName: 'Dr. Vikram',
      lastName: 'Singh',
      employeeId: 'MOS2015001',
      designation: 'Director, Human Resource Development',
      experience: 15.0,
      education: 'IAS, M.Sc. Economics',
      phone: '+91-9876543212',
      bio: 'Director overseeing workforce development and capacity building for the statistical system.',
      department: { name: 'Data Analytics Division', code: 'DATA' },
      jobRole: { title: 'Data Governance Officer', code: 'DGO', level: 'Senior' }
    }
  }
};

export const MOCK_COMPETENCIES = [
  { id: 'c-01', code: 'STAT001', name: 'Survey Design', category: 'Statistical', description: 'Questionnaire design, sampling frames, and fieldwork methodology for official surveys.' },
  { id: 'c-02', code: 'STAT002', name: 'Sampling Methodology', category: 'Statistical', description: 'Stratified sampling, multistage probability sampling, FSUs, USUs, and non-sampling error control.' },
  { id: 'c-03', code: 'STAT003', name: 'Statistical Analysis', category: 'Statistical', description: 'Application of parametric and non-parametric statistical methods and inference.' },
  { id: 'c-04', code: 'STAT004', name: 'Data Quality & Validation', category: 'Statistical', description: 'GSBPM standards, logic checks, range validation, and record consistency checks.' },
  { id: 'c-05', code: 'STAT005', name: 'Index Numbers & Price Stats', category: 'Statistical', description: 'Laspeyres formulation, geometric mean chaining, CPI, WPI, and IIP computation.' },
  { id: 'c-06', code: 'TECH001', name: 'Python for Data Analysis', category: 'Technical', description: 'Pandas, NumPy, automated data wrangling, and statistical scripting.' },
  { id: 'c-07', code: 'TECH002', name: 'SQL & Database Systems', category: 'Technical', description: 'Relational data extraction, complex joins, indexing, and aggregation pipelines.' },
  { id: 'c-08', code: 'TECH003', name: 'R Programming', category: 'Technical', description: 'Statistical modelling, regression diagnostics, and reproducible reporting with R.' },
  { id: 'c-09', code: 'TECH004', name: 'Machine Learning & AI', category: 'Technical', description: 'Imputation of missing survey records, outlier detection, and NLP classification.' },
  { id: 'c-10', code: 'TECH005', name: 'Data Visualization & Dashboards', category: 'Technical', description: 'Visual storytelling, interactive charts, Power BI, and publication graphics.' },
  { id: 'c-11', code: 'DIG001', name: 'Cybersecurity & Data Privacy', category: 'Digital Governance', description: 'Protection of sensitive respondent microdata, encryption, and anonymization.' },
  { id: 'c-12', code: 'DIG002', name: 'Data Governance & Standards', category: 'Digital Governance', description: 'National data sharing and accessibility policies, metadata management.' }
];

export const MOCK_EMPLOYEE_COMPETENCIES = [
  { id: 'ec-01', competencyId: 'c-01', currentLevel: 2.5, requiredLevel: 4.0, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[0] },
  { id: 'ec-02', competencyId: 'c-02', currentLevel: 2.2, requiredLevel: 4.0, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[1] },
  { id: 'ec-03', competencyId: 'c-03', currentLevel: 3.2, requiredLevel: 4.0, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[2] },
  { id: 'ec-04', competencyId: 'c-04', currentLevel: 3.0, requiredLevel: 3.5, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[3] },
  { id: 'ec-05', competencyId: 'c-05', currentLevel: 3.4, requiredLevel: 4.0, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[4] },
  { id: 'ec-06', competencyId: 'c-06', currentLevel: 2.3, requiredLevel: 4.0, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[5] },
  { id: 'ec-07', competencyId: 'c-07', currentLevel: 3.1, requiredLevel: 4.0, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[6] },
  { id: 'ec-08', competencyId: 'c-08', currentLevel: 2.8, requiredLevel: 3.5, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[7] },
  { id: 'ec-09', competencyId: 'c-09', currentLevel: 1.8, requiredLevel: 3.5, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[8] },
  { id: 'ec-10', competencyId: 'c-10', currentLevel: 2.8, requiredLevel: 4.0, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[9] },
  { id: 'ec-11', competencyId: 'c-11', currentLevel: 3.7, requiredLevel: 3.5, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[10] },
  { id: 'ec-12', competencyId: 'c-12', currentLevel: 3.5, requiredLevel: 3.5, lastAssessed: '2024-01-15', competency: MOCK_COMPETENCIES[11] },
];

export const MOCK_SKILL_GAPS = [
  { id: 'sg-01', competencyId: 'c-09', gapScore: 1.7, priority: 1, reason: 'AI/ML competency (1.8/5.0) is critical for statistical data imputation and predictive analytics in the modern statistical system.', competency: MOCK_COMPETENCIES[8] },
  { id: 'sg-02', competencyId: 'c-02', gapScore: 1.8, priority: 1, reason: 'Sampling methodology (2.2/5.0) is essential for NSSO field surveys, multi-stage stratification, and variance estimation.', competency: MOCK_COMPETENCIES[1] },
  { id: 'sg-03', competencyId: 'c-06', gapScore: 1.7, priority: 1, reason: 'Python proficiency (2.3/5.0) is required for automating survey data ingestion and cleaning workflows.', competency: MOCK_COMPETENCIES[5] },
  { id: 'sg-04', competencyId: 'c-01', gapScore: 1.5, priority: 2, reason: 'Survey Design (2.5/5.0) is below benchmark for official survey design protocols and questionnaire piloting.', competency: MOCK_COMPETENCIES[0] },
  { id: 'sg-05', competencyId: 'c-10', gapScore: 1.2, priority: 2, reason: 'Data Visualization (2.8/5.0) needs enhancement to prepare publication-ready policy dashboards.', competency: MOCK_COMPETENCIES[9] },
  { id: 'sg-06', competencyId: 'c-07', gapScore: 0.9, priority: 3, reason: 'SQL & Database Systems (3.1/5.0) is near benchmark but requires advanced analytical window functions.', competency: MOCK_COMPETENCIES[6] }
];

export const MOCK_IGOT_COURSES = [
  { id: 'crs-01', title: 'Python for Official Data Analysis', provider: 'iGOT Karmayogi / MoSPI', description: 'Comprehensive Python for statistical offices: Pandas, NumPy, and automated data validation.', duration: '20 hours', level: 'INTERMEDIATE', skills: ['Python', 'Pandas', 'Data Analysis'], isIgot: true, category: 'Technical', rating: 4.8 },
  { id: 'crs-02', title: 'SQL for Statistical Databases', provider: 'iGOT Karmayogi', description: 'Relational querying, aggregation pipelines, and high-volume data retrieval for government analysts.', duration: '15 hours', level: 'BEGINNER', skills: ['SQL', 'Database Queries'], isIgot: true, category: 'Technical', rating: 4.7 },
  { id: 'crs-03', title: 'AI & Machine Learning for Official Statistics', provider: 'iGOT Karmayogi / NSSO', description: 'AI algorithms applied to statistical processes, automated imputation, and satellite imagery analysis.', duration: '25 hours', level: 'ADVANCED', skills: ['AI/ML', 'Machine Learning', 'Imputation'], isIgot: true, category: 'Technical', rating: 4.9 },
  { id: 'crs-04', title: 'Data Visualization & Interactive Reporting', provider: 'iGOT Karmayogi', description: 'Designing high-impact charts, dashboards, and policy summaries using Power BI and modern tools.', duration: '12 hours', level: 'BEGINNER', skills: ['Data Visualization', 'Dashboards'], isIgot: true, category: 'Technical', rating: 4.6 },
  { id: 'crs-05', title: 'Survey Sampling Methods & Stratification', provider: 'iGOT Karmayogi / NSSTA', description: 'Probability sampling, multi-stage stratification, clustering, and sampling error estimation.', duration: '22 hours', level: 'INTERMEDIATE', skills: ['Sampling', 'Survey Design'], isIgot: true, category: 'Statistical', rating: 4.8 },
  { id: 'crs-06', title: 'Consumer Price Index (CPI) Methodology', provider: 'iGOT Karmayogi / PSD', description: 'Laspeyres index computation, item weighting, and rural/urban price collection protocols.', duration: '14 hours', level: 'INTERMEDIATE', skills: ['CPI', 'Index Numbers'], isIgot: true, category: 'Statistical', rating: 4.7 },
  { id: 'crs-07', title: 'National Accounts Statistics & GVA Compilation', provider: 'iGOT Karmayogi / NAD', description: 'Gross Value Added estimation, double deflation methods, and SNA 2008 international standards.', duration: '30 hours', level: 'ADVANCED', skills: ['National Accounts', 'GVA', 'SNA 2008'], isIgot: true, category: 'Statistical', rating: 4.9 },
  { id: 'crs-08', title: 'Data Governance & Microdata Anonymization', provider: 'iGOT Karmayogi / MeitY', description: 'Statistical disclosure control, differential privacy, and respondent confidentiality standards.', duration: '10 hours', level: 'INTERMEDIATE', skills: ['Data Governance', 'Cybersecurity'], isIgot: true, category: 'Digital Governance', rating: 4.5 }
];

export const MOCK_NSSTA_PROGRAMMES = [
  { id: 'nssta-01', title: 'Residential Workshop on Survey Sampling & Multi-Stage Design', description: 'Intensive 5-day residential programme on probability sampling, FSUs, USUs, and non-sampling errors.', targetAudience: 'Statistical Officers & Field Supervisors', duration: '5 Days', mode: 'Residential', competencies: ['Sampling', 'Survey Design', 'Statistical Analysis'], eligibility: 'Grade B & C Statistical Officers', schedule: 'Quarterly', venue: 'NSSTA Campus, Greater Noida' },
  { id: 'nssta-02', title: 'Applied Machine Learning in Official Survey Validation', description: 'Hands-on training in Python and Random Forest imputation algorithms for national survey data.', targetAudience: 'Data Analysts and Senior Statistical Officers', duration: '5 Days', mode: 'Classroom', competencies: ['AI/ML', 'Python', 'Statistical Analysis'], eligibility: 'Working knowledge of statistics required', schedule: 'Bi-monthly', venue: 'NSSTA Campus, Greater Noida' },
  { id: 'nssta-03', title: 'National Accounts & Gross Domestic Product Compilation', description: 'Compilation techniques for Annual and Quarterly National Accounts according to SNA 2008 standards.', targetAudience: 'National Accounts Officers and Economists', duration: '10 Days', mode: 'Residential', competencies: ['National Accounts', 'Index Numbers', 'Economic Statistics'], eligibility: 'Economics or Statistics cadre', schedule: 'Bi-annual', venue: 'NSSTA, Greater Noida' },
  { id: 'nssta-04', title: 'Geospatial Statistics & Remote Sensing for Agricultural Surveys', description: 'Using satellite data and GIS mapping for independent crop yield forecasts and acreage estimation.', targetAudience: 'Agricultural Statistics Officers & GIS Specialists', duration: '4 Days', mode: 'Blended', competencies: ['GIS', 'Spatial Analysis', 'Survey Design'], eligibility: 'Field Experience required', schedule: 'Quarterly', venue: 'NSSTA / ISRO Regional Centres' }
];

export const MOCK_LEARNING_PATH = {
  id: 'lp-01',
  title: 'Statistical Data Analyst Development Roadmap (MoSPI Cadre)',
  goal: 'Junior Statistical Officer → Senior Statistical Officer (SSO)',
  isActive: true,
  progress: 35,
  items: [
    { id: 'lpi-01', title: 'Python for Official Data Analysis', courseId: 'crs-01', order: 1, status: 'COMPLETED', duration: '20 hours', difficulty: 'MEDIUM', skills: ['Python', 'Pandas', 'NumPy'], description: 'Foundation programming for data cleaning and exploratory analysis.' },
    { id: 'lpi-02', title: 'Survey Sampling Methods & Stratification', courseId: 'crs-05', order: 2, status: 'IN_PROGRESS', duration: '22 hours', difficulty: 'MEDIUM', skills: ['Sampling', 'Stratification'], description: 'Critical sampling principles for official NSSO surveys.' },
    { id: 'lpi-03', title: 'AI & Machine Learning for Official Statistics', courseId: 'crs-03', order: 3, status: 'RECOMMENDED', duration: '25 hours', difficulty: 'ADVANCED', skills: ['AI/ML', 'Imputation'], description: 'Automating survey data validation and record imputation.' },
    { id: 'lpi-04', title: 'Residential Workshop on Survey Sampling (NSSTA)', nsstaId: 'nssta-01', order: 4, status: 'RECOMMENDED', duration: '5 Days', difficulty: 'ADVANCED', skills: ['Field Surveys', 'Sampling'], description: 'NSSTA TPAC recommended 5-day residential field immersion.' },
    { id: 'lpi-05', title: 'Data Visualization & Interactive Reporting', courseId: 'crs-04', order: 5, status: 'UPCOMING', duration: '12 hours', difficulty: 'BEGINNER', skills: ['Dashboards', 'Reporting'], description: 'Preparing high-quality ministerial briefs and dashboards.' }
  ]
};

export const MOCK_QUESTIONS = [
  {
    id: 'q-01',
    text: 'Which sampling method ensures that every member of the population has an equal, non-zero probability of selection?',
    optionA: 'Purposive Sampling',
    optionB: 'Simple Random Sampling (SRS)',
    optionC: 'Quota Sampling',
    optionD: 'Snowball Sampling',
    correctAnswer: 'B',
    explanation: 'Simple Random Sampling (SRS) guarantees every sampling unit has an identical probability of inclusion, satisfying probability theory.',
    difficulty: 'MEDIUM',
    domain: 'Survey Sampling',
    status: 'APPROVED'
  },
  {
    id: 'q-02',
    text: 'In the Consumer Price Index (CPI), which formula is primarily adopted by MoSPI to aggregate item indices at the base subgroup level?',
    optionA: 'Paasche Index',
    optionB: 'Laspeyres Formula (Weighted Arithmetic Mean)',
    optionC: 'Fisher Ideal Index',
    optionD: 'Marshall-Edgeworth Formula',
    correctAnswer: 'B',
    explanation: 'MoSPI utilizes the modified Laspeyres formula with fixed base-year expenditure budget weights (Base Year 2012=100).',
    difficulty: 'HARD',
    domain: 'Price Statistics (CPI)',
    status: 'APPROVED'
  },
  {
    id: 'q-03',
    text: 'What is the primary role of First Stage Units (FSUs) in the NSSO multi-stage stratified survey design?',
    optionA: 'Individual household respondents',
    optionB: 'Census villages in rural areas and Urban Frame Survey (UFS) blocks in urban areas',
    optionC: 'District administrative headquarters',
    optionD: 'National economic classification codes',
    correctAnswer: 'B',
    explanation: 'In NSSO multi-stage sampling, FSUs are 2011 Census villages (rural) and UFS blocks (urban), from which Ultimate Stage Units (households) are selected.',
    difficulty: 'MEDIUM',
    domain: 'Survey Methodology',
    status: 'APPROVED'
  },
  {
    id: 'q-04',
    text: 'In national accounts under the SNA 2008 framework, how is Gross Value Added (GVA) at basic prices computed from Gross Output?',
    optionA: 'Gross Output + Subsidies',
    optionB: 'Gross Output minus Intermediate Consumption',
    optionC: 'Gross Output + Taxes on Products',
    optionD: 'Gross Output divided by Deflator',
    correctAnswer: 'B',
    explanation: 'GVA at basic prices = Gross Output at basic prices minus Intermediate Consumption at purchasers prices.',
    difficulty: 'HARD',
    domain: 'National Accounts (GVA)',
    status: 'AI_GENERATED'
  },
  {
    id: 'q-05',
    text: 'In Python data processing for official statistics, which method is safest for replacing missing values with the column median?',
    optionA: 'df.drop_duplicates()',
    optionB: 'df.fillna(df.median(numeric_only=True))',
    optionC: 'df.remove_nan()',
    optionD: 'df.interpolate(method="zeros")',
    correctAnswer: 'B',
    explanation: 'fillna() paired with median() replaces missing numerical records with median values, preventing outlier distortion.',
    difficulty: 'EASY',
    domain: 'Python Data Science',
    status: 'APPROVED'
  }
];

export const MOCK_MATERIALS = [
  {
    id: 'mat-01',
    title: 'MoSPI Consumer Price Index (CPI) Compilation Guidelines & Base Year Weighting (2024)',
    filename: 'MoSPI_CPI_Methodology_Manual_2024.pdf',
    status: 'READY',
    topics: ['Laspeyres Formula', 'Price Collection', 'Geometric Mean Imputation', 'Weighting Protocols'],
    summary: 'Comprehensive methodology for CPI(Urban/Rural/Combined) compiled by Price Statistics Division, MoSPI.',
    createdAt: '2024-03-12T10:30:00.000Z'
  },
  {
    id: 'mat-02',
    title: 'NSSO Household Survey Sampling Design & Multi-Stage Stratification (Vol. 4)',
    filename: 'NSSO_Sampling_Design_Guidelines_Vol4.pdf',
    status: 'READY',
    topics: ['First Stage Units (FSUs)', 'Ultimate Stage Units (USUs)', 'Stratified Multi-Stage Sampling', 'Non-Sampling Errors'],
    summary: 'Field Operations Division survey sampling protocol for national socio-economic surveys.',
    createdAt: '2024-04-05T14:15:00.000Z'
  },
  {
    id: 'mat-03',
    title: 'National Accounts Statistics: Gross Value Added (GVA) & Deflator Standards',
    filename: 'National_Accounts_GVA_Manual.pdf',
    status: 'READY',
    topics: ['GVA Estimation', 'Double Deflation', 'Annual Survey of Industries (ASI)', 'SNA 2008 Framework'],
    summary: 'Central Statistics Office standards for annual and quarterly national accounts compilation.',
    createdAt: '2024-05-20T09:00:00.000Z'
  }
];

export const MOCK_QUIZZES = [
  {
    id: 'quiz-01',
    title: 'Official Statistics & Survey Sampling Assessment',
    description: 'Comprehensive evaluation covering NSSO survey design, sampling errors, and MoSPI statistical standards.',
    duration: 15,
    totalMarks: 50,
    passingScore: 35,
    questionsCount: 5,
    questions: MOCK_QUESTIONS
  }
];

export const MOCK_CERTIFICATES = [
  { id: 'cert-01', title: 'Foundations of Official Statistics & GSBPM Framework', issuer: 'National Statistical Systems Training Academy (NSSTA)', issuedAt: '2023-08-15', skills: ['Statistical Analysis', 'Survey Design'] },
  { id: 'cert-02', title: 'Python for Statistical Officers & Data Analysts', issuer: 'iGOT Karmayogi', issuedAt: '2023-11-20', skills: ['Python', 'Pandas', 'Automation'] },
  { id: 'cert-03', title: 'Government Data Protection & Microdata Confidentiality', issuer: 'CERT-In / MoSPI', issuedAt: '2024-02-10', skills: ['Cybersecurity', 'Data Governance'] }
];

export const MOCK_ANALYTICS = {
  totalLearners: 1240,
  averageCompetencyIndex: 3.42,
  completedCourses: 890,
  activeGapsIdentified: 312,
  departmentHeatmap: [
    { department: 'NSSO', sampling: 4.6, cpi: 3.2, nationalAccounts: 2.8, iip: 3.1, python: 3.5 },
    { department: 'Price Statistics', sampling: 2.9, cpi: 4.8, nationalAccounts: 3.0, iip: 3.6, python: 3.9 },
    { department: 'National Accounts', sampling: 2.7, cpi: 3.4, nationalAccounts: 4.7, iip: 3.8, python: 3.2 },
    { department: 'Field Operations', sampling: 4.2, cpi: 3.6, nationalAccounts: 2.4, iip: 2.9, python: 2.3 },
    { department: 'Economic Statistics', sampling: 3.1, cpi: 4.0, nationalAccounts: 3.9, iip: 4.6, python: 3.7 }
  ]
};
