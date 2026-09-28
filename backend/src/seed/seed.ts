import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding StatIntel AI database...');

  // ===== DEPARTMENTS =====
  const departments = await Promise.all([
    prisma.department.upsert({ where: { code: 'ECON' }, update: {}, create: { name: 'Economic Statistics', code: 'ECON', description: 'National Accounts, Index Numbers, and Macroeconomic Statistics' } }),
    prisma.department.upsert({ where: { code: 'SOC' }, update: {}, create: { name: 'Social Statistics', code: 'SOC', description: 'Population, Health, Education, and Social Development Statistics' } }),
    prisma.department.upsert({ where: { code: 'AGR' }, update: {}, create: { name: 'Agriculture Statistics', code: 'AGR', description: 'Agricultural Production, Land Use, and Rural Statistics' } }),
    prisma.department.upsert({ where: { code: 'IND' }, update: {}, create: { name: 'Industry Statistics', code: 'IND', description: 'Manufacturing, Mining, and Industrial Production Statistics' } }),
    prisma.department.upsert({ where: { code: 'DATA' }, update: {}, create: { name: 'Data Analytics Division', code: 'DATA', description: 'Advanced Analytics, Data Science, and AI/ML Applications' } }),
    prisma.department.upsert({ where: { code: 'IT' }, update: {}, create: { name: 'IT & Digital Infrastructure', code: 'IT', description: 'Technology Systems, Cybersecurity, and Digital Governance' } }),
  ]);
  console.log('✅ Departments created');

  // ===== JOB ROLES =====
  const roles = await Promise.all([
    prisma.jobRole.upsert({ where: { code: 'SDA' }, update: {}, create: { title: 'Statistical Data Analyst', code: 'SDA', level: 'Junior', description: 'Analyses statistical data for government reports and surveys' } }),
    prisma.jobRole.upsert({ where: { code: 'SSO' }, update: {}, create: { title: 'Senior Statistical Officer', code: 'SSO', level: 'Senior', description: 'Leads statistical surveys and data quality assurance' } }),
    prisma.jobRole.upsert({ where: { code: 'DSC' }, update: {}, create: { title: 'Data Scientist', code: 'DSC', level: 'Specialist', description: 'Applies advanced analytics and ML to statistical problems' } }),
    prisma.jobRole.upsert({ where: { code: 'SMP' }, update: {}, create: { title: 'Survey Methodology Professional', code: 'SMP', level: 'Mid', description: 'Designs and implements official survey methodologies' } }),
    prisma.jobRole.upsert({ where: { code: 'DGO' }, update: {}, create: { title: 'Data Governance Officer', code: 'DGO', level: 'Senior', description: 'Ensures data quality, security, and compliance standards' } }),
    prisma.jobRole.upsert({ where: { code: 'ITO' }, update: {}, create: { title: 'IT Operations Officer', code: 'ITO', level: 'Mid', description: 'Manages technology infrastructure for statistical systems' } }),
    prisma.jobRole.upsert({ where: { code: 'ECO' }, update: {}, create: { title: 'Economist / National Accounts Officer', code: 'ECO', level: 'Senior', description: 'Compiles GDP and national account statistics' } }),
    prisma.jobRole.upsert({ where: { code: 'NSO' }, update: {}, create: { title: 'NSO Field Supervisor', code: 'NSO', level: 'Junior', description: 'Supervises field data collection for NSO surveys' } }),
    prisma.jobRole.upsert({ where: { code: 'GIS' }, update: {}, create: { title: 'GIS Analyst', code: 'GIS', level: 'Mid', description: 'Spatial data analysis and geographic information systems' } }),
    prisma.jobRole.upsert({ where: { code: 'TRNA' }, update: {}, create: { title: 'Training & Capacity Building Officer', code: 'TRNA', level: 'Mid', description: 'Develops and delivers statistical training programmes' } }),
  ]);
  console.log('✅ Job roles created');

  // ===== COMPETENCIES =====
  const competencies = await Promise.all([
    // Statistical
    prisma.competency.upsert({ where: { code: 'STAT001' }, update: {}, create: { name: 'Survey Design', code: 'STAT001', category: 'Statistical', description: 'Ability to design surveys including questionnaire development and methodology selection' } }),
    prisma.competency.upsert({ where: { code: 'STAT002' }, update: {}, create: { name: 'Sampling', code: 'STAT002', category: 'Statistical', description: 'Knowledge of probability and non-probability sampling methods' } }),
    prisma.competency.upsert({ where: { code: 'STAT003' }, update: {}, create: { name: 'Statistical Analysis', code: 'STAT003', category: 'Statistical', description: 'Application of statistical methods for data analysis and inference' } }),
    prisma.competency.upsert({ where: { code: 'STAT004' }, update: {}, create: { name: 'Data Quality', code: 'STAT004', category: 'Statistical', description: 'Ensuring accuracy, completeness, and reliability of statistical data' } }),
    prisma.competency.upsert({ where: { code: 'STAT005' }, update: {}, create: { name: 'Index Numbers', code: 'STAT005', category: 'Statistical', description: 'Construction and interpretation of price and production index numbers' } }),
    // Technical
    prisma.competency.upsert({ where: { code: 'TECH001' }, update: {}, create: { name: 'Python', code: 'TECH001', category: 'Technical', description: 'Python programming for data analysis and automation' } }),
    prisma.competency.upsert({ where: { code: 'TECH002' }, update: {}, create: { name: 'SQL', code: 'TECH002', category: 'Technical', description: 'Database querying and management using SQL' } }),
    prisma.competency.upsert({ where: { code: 'TECH003' }, update: {}, create: { name: 'R Programming', code: 'TECH003', category: 'Technical', description: 'Statistical computing and graphics using R' } }),
    prisma.competency.upsert({ where: { code: 'TECH004' }, update: {}, create: { name: 'AI/ML', code: 'TECH004', category: 'Technical', description: 'Machine learning and artificial intelligence applications for statistics' } }),
    prisma.competency.upsert({ where: { code: 'TECH005' }, update: {}, create: { name: 'Data Visualization', code: 'TECH005', category: 'Technical', description: 'Creating effective data visualizations and dashboards' } }),
    // Digital Governance
    prisma.competency.upsert({ where: { code: 'DIG001' }, update: {}, create: { name: 'Cybersecurity', code: 'DIG001', category: 'Digital Governance', description: 'Information security practices and data protection' } }),
    prisma.competency.upsert({ where: { code: 'DIG002' }, update: {}, create: { name: 'Data Governance', code: 'DIG002', category: 'Digital Governance', description: 'Policies and practices for data management and compliance' } }),
    prisma.competency.upsert({ where: { code: 'DIG003' }, update: {}, create: { name: 'Cloud Computing', code: 'DIG003', category: 'Digital Governance', description: 'Cloud platforms and services for data storage and processing' } }),
    prisma.competency.upsert({ where: { code: 'DIG004' }, update: {}, create: { name: 'GIS', code: 'DIG004', category: 'Digital Governance', description: 'Geographic information systems for spatial data analysis' } }),
    // Managerial
    prisma.competency.upsert({ where: { code: 'MGT001' }, update: {}, create: { name: 'Project Management', code: 'MGT001', category: 'Managerial', description: 'Planning, executing, and monitoring statistical projects' } }),
    prisma.competency.upsert({ where: { code: 'MGT002' }, update: {}, create: { name: 'Communication', code: 'MGT002', category: 'Managerial', description: 'Effective written and verbal communication of statistical findings' } }),
    prisma.competency.upsert({ where: { code: 'MGT003' }, update: {}, create: { name: 'Leadership', code: 'MGT003', category: 'Managerial', description: 'Team leadership and capacity building' } }),
    prisma.competency.upsert({ where: { code: 'MGT004' }, update: {}, create: { name: 'Policy Analysis', code: 'MGT004', category: 'Managerial', description: 'Analysis of policy implications of statistical data' } }),
  ]);
  console.log('✅ Competencies created');

  const compMap = Object.fromEntries(competencies.map(c => [c.code, c]));

  // ===== DEMO USERS =====
  const hashedPassword = await bcrypt.hash('demo123', 10);

  // Primary demo employee - Rahul Sharma
  const rahulUser = await prisma.user.upsert({
    where: { email: 'employee@statintel.demo' },
    update: {},
    create: {
      email: 'employee@statintel.demo',
      password: hashedPassword,
      role: 'EMPLOYEE',
      profile: {
        create: {
          firstName: 'Rahul',
          lastName: 'Sharma',
          employeeId: 'MOS2021001',
          designation: 'Statistical Data Analyst',
          departmentId: departments[0].id,
          jobRoleId: roles[0].id,
          experience: 3.2,
          education: 'M.Sc. Statistics, Delhi University',
          phone: '+91-9876543210',
          bio: 'Passionate about data-driven governance and statistical methodologies for policy-making.',
          joinedAt: new Date('2021-06-15'),
        },
      },
    },
    include: { profile: true },
  });

  // Trainer
  const trainerUser = await prisma.user.upsert({
    where: { email: 'trainer@statintel.demo' },
    update: {},
    create: {
      email: 'trainer@statintel.demo',
      password: hashedPassword,
      role: 'TRAINER',
      profile: {
        create: {
          firstName: 'Priya',
          lastName: 'Patel',
          employeeId: 'MOS2019002',
          designation: 'Training & Capacity Building Officer',
          departmentId: departments[4].id,
          jobRoleId: roles[9].id,
          experience: 7.5,
          education: 'Ph.D. Statistics, IIT Delhi',
          bio: 'Statistical trainer with expertise in survey methodology and data science education.',
          joinedAt: new Date('2019-01-10'),
        },
      },
    },
    include: { profile: true },
  });

  // Admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@statintel.demo' },
    update: {},
    create: {
      email: 'admin@statintel.demo',
      password: hashedPassword,
      role: 'ADMIN',
      profile: {
        create: {
          firstName: 'Vikram',
          lastName: 'Singh',
          employeeId: 'MOS2015001',
          designation: 'Director, Human Resource Development',
          departmentId: departments[4].id,
          jobRoleId: roles[4].id,
          experience: 15.0,
          education: 'IAS, M.Sc. Economics',
          bio: 'Director overseeing workforce development and capacity building for the statistical system.',
          joinedAt: new Date('2015-04-01'),
        },
      },
    },
    include: { profile: true },
  });

  console.log('✅ Demo users created');

  // ===== RAHUL'S COMPETENCIES (Primary Demo Employee) =====
  if (rahulUser.profile) {
    const rahulCompetencies = [
      { code: 'STAT001', currentLevel: 2.5, requiredLevel: 4.0 },
      { code: 'STAT002', currentLevel: 2.2, requiredLevel: 4.0 },
      { code: 'STAT003', currentLevel: 3.2, requiredLevel: 4.0 },
      { code: 'STAT004', currentLevel: 3.0, requiredLevel: 3.5 },
      { code: 'TECH001', currentLevel: 2.3, requiredLevel: 4.0 },
      { code: 'TECH002', currentLevel: 3.1, requiredLevel: 4.0 },
      { code: 'TECH004', currentLevel: 1.8, requiredLevel: 3.5 },
      { code: 'TECH005', currentLevel: 2.8, requiredLevel: 4.0 },
      { code: 'DIG001', currentLevel: 3.7, requiredLevel: 3.5 },
      { code: 'DIG002', currentLevel: 3.5, requiredLevel: 3.5 },
      { code: 'MGT001', currentLevel: 3.0, requiredLevel: 3.5 },
      { code: 'MGT002', currentLevel: 3.8, requiredLevel: 3.5 },
    ];

    for (const ec of rahulCompetencies) {
      const comp = compMap[ec.code];
      if (comp) {
        await prisma.employeeCompetency.upsert({
          where: { profileId_competencyId: { profileId: rahulUser.profile.id, competencyId: comp.id } },
          update: {},
          create: {
            profileId: rahulUser.profile.id,
            competencyId: comp.id,
            currentLevel: ec.currentLevel,
            requiredLevel: ec.requiredLevel,
            lastAssessed: new Date('2024-01-15'),
          },
        });
      }
    }

    // Rahul's Skill Gaps
    const rahulGaps = [
      { code: 'TECH004', gap: 1.7, priority: 1, reason: 'AI/ML competency (1.8/5) is critical for the Data Analyst role in the Data Analytics Division, with a required level of 3.5/5.' },
      { code: 'STAT002', gap: 1.8, priority: 1, reason: 'Sampling competency (2.2/5) is essential for conducting official surveys. Required level is 4.0/5 for Statistical Data Analyst.' },
      { code: 'TECH001', gap: 1.7, priority: 1, reason: 'Python proficiency (2.3/5) is below the required 4.0/5 for data processing and automation in your role.' },
      { code: 'TECH005', gap: 1.2, priority: 2, reason: 'Data Visualization skills (2.8/5) need to reach 4.0/5 to effectively communicate insights to stakeholders.' },
      { code: 'STAT001', gap: 1.5, priority: 2, reason: 'Survey Design competency (2.5/5) is below the required 4.0/5 for designing official statistical surveys.' },
      { code: 'TECH002', gap: 0.9, priority: 3, reason: 'SQL proficiency (3.1/5) needs improvement to reach the required 4.0/5 for database-driven statistical analysis.' },
    ];

    for (const sg of rahulGaps) {
      const comp = compMap[sg.code];
      if (comp) {
        await prisma.skillGap.upsert({
          where: { profileId_competencyId: { profileId: rahulUser.profile.id, competencyId: comp.id } },
          update: {},
          create: {
            profileId: rahulUser.profile.id,
            competencyId: comp.id,
            gapScore: sg.gap,
            priority: sg.priority,
            reason: sg.reason,
          },
        });
      }
    }
    console.log('✅ Rahul competencies and skill gaps created');
  }

  // ===== iGOT COURSES =====
  const courses = await Promise.all([
    prisma.course.upsert({ where: { id: 'course-001' }, update: {}, create: { id: 'course-001', title: 'Python for Data Analysis', provider: 'iGOT Karmayogi', description: 'Comprehensive Python course covering pandas, numpy, matplotlib and statistical analysis for government data professionals.', duration: '20 hours', level: 'INTERMEDIATE', skills: ['Python', 'Data Analysis', 'Pandas', 'NumPy'], isIgot: true, category: 'Technical' } }),
    prisma.course.upsert({ where: { id: 'course-002' }, update: {}, create: { id: 'course-002', title: 'SQL for Statistical Databases', provider: 'iGOT Karmayogi', description: 'SQL fundamentals to advanced querying techniques for large government statistical databases.', duration: '15 hours', level: 'BEGINNER', skills: ['SQL', 'Database', 'Data Querying'], isIgot: true, category: 'Technical' } }),
    prisma.course.upsert({ where: { id: 'course-003' }, update: {}, create: { id: 'course-003', title: 'Introduction to AI for Official Statistics', provider: 'iGOT Karmayogi / NSSO', description: 'Introduction to AI and ML concepts applied to official statistical processes, including automated data validation and predictive analytics.', duration: '25 hours', level: 'BEGINNER', skills: ['AI/ML', 'Machine Learning', 'Data Science'], isIgot: true, category: 'Technical' } }),
    prisma.course.upsert({ where: { id: 'course-004' }, update: {}, create: { id: 'course-004', title: 'Data Visualization using Power BI', provider: 'iGOT Karmayogi', description: 'Create interactive dashboards and statistical reports using Power BI for government reporting.', duration: '12 hours', level: 'BEGINNER', skills: ['Data Visualization', 'Power BI', 'Dashboard', 'Reporting'], isIgot: true, category: 'Technical' } }),
    prisma.course.upsert({ where: { id: 'course-005' }, update: {}, create: { id: 'course-005', title: 'Cybersecurity Fundamentals for Government', provider: 'iGOT Karmayogi / CERT-In', description: 'Essential cybersecurity practices for government data protection, phishing prevention, and secure data handling.', duration: '8 hours', level: 'BEGINNER', skills: ['Cybersecurity', 'Data Protection', 'Security'], isIgot: true, category: 'Digital Governance' } }),
    prisma.course.upsert({ where: { id: 'course-006' }, update: {}, create: { id: 'course-006', title: 'Statistical Quality Management', provider: 'iGOT Karmayogi / NSSTA', description: 'Quality frameworks for official statistics including GSBPM and quality assurance methodologies.', duration: '18 hours', level: 'INTERMEDIATE', skills: ['Data Quality', 'Quality Management', 'GSBPM'], isIgot: true, category: 'Statistical' } }),
    prisma.course.upsert({ where: { id: 'course-007' }, update: {}, create: { id: 'course-007', title: 'Cloud Computing for Public Sector', provider: 'iGOT Karmayogi / MeitY', description: 'Introduction to cloud technologies for government data infrastructure and e-governance.', duration: '16 hours', level: 'BEGINNER', skills: ['Cloud Computing', 'AWS', 'Azure', 'Digital Infrastructure'], isIgot: true, category: 'Digital Governance' } }),
    prisma.course.upsert({ where: { id: 'course-008' }, update: {}, create: { id: 'course-008', title: 'Survey Design and Methodology', provider: 'iGOT Karmayogi / NSSO', description: 'Comprehensive survey design covering questionnaire development, pilot testing, and field implementation for NSO surveys.', duration: '22 hours', level: 'INTERMEDIATE', skills: ['Survey Design', 'Questionnaire Design', 'Methodology'], isIgot: true, category: 'Statistical' } }),
    prisma.course.upsert({ where: { id: 'course-009' }, update: {}, create: { id: 'course-009', title: 'R Programming for Statisticians', provider: 'iGOT Karmayogi', description: 'Statistical computing and graphics using R for data analysis and visualization.', duration: '20 hours', level: 'INTERMEDIATE', skills: ['R Programming', 'Statistical Computing', 'Data Analysis'], isIgot: true, category: 'Technical' } }),
    prisma.course.upsert({ where: { id: 'course-010' }, update: {}, create: { id: 'course-010', title: 'GIS for Official Statistics', provider: 'iGOT Karmayogi / NGIS', description: 'Geographic Information Systems for spatial analysis in official statistics.', duration: '14 hours', level: 'BEGINNER', skills: ['GIS', 'Spatial Analysis', 'Mapping'], isIgot: true, category: 'Digital Governance' } }),
    prisma.course.upsert({ where: { id: 'course-011' }, update: {}, create: { id: 'course-011', title: 'National Accounts Statistics', provider: 'iGOT Karmayogi / MOSPI', description: 'Understanding GDP computation, national accounts framework, and macroeconomic indicators.', duration: '30 hours', level: 'ADVANCED', skills: ['National Accounts', 'GDP', 'Economic Statistics'], isIgot: true, category: 'Statistical' } }),
    prisma.course.upsert({ where: { id: 'course-012' }, update: {}, create: { id: 'course-012', title: 'Data Governance for Government', provider: 'iGOT Karmayogi / NDSA', description: 'Policies, standards, and practices for effective data governance in government organizations.', duration: '10 hours', level: 'INTERMEDIATE', skills: ['Data Governance', 'Policy', 'Compliance'], isIgot: true, category: 'Digital Governance' } }),
    prisma.course.upsert({ where: { id: 'course-013' }, update: {}, create: { id: 'course-013', title: 'Project Management for Statistics', provider: 'iGOT Karmayogi / PMI', description: 'Project management fundamentals for statistical survey projects using agile and traditional methodologies.', duration: '15 hours', level: 'INTERMEDIATE', skills: ['Project Management', 'Planning', 'Agile'], isIgot: false, category: 'Managerial' } }),
    prisma.course.upsert({ where: { id: 'course-014' }, update: {}, create: { id: 'course-014', title: 'Effective Communication for Statisticians', provider: 'iGOT Karmayogi', description: 'Communication skills for presenting statistical findings to policymakers and the public.', duration: '8 hours', level: 'BEGINNER', skills: ['Communication', 'Presentation', 'Report Writing'], isIgot: true, category: 'Managerial' } }),
    prisma.course.upsert({ where: { id: 'course-015' }, update: {}, create: { id: 'course-015', title: 'Big Data Technologies for Statistics', provider: 'iGOT Karmayogi / NASSCOM', description: 'Introduction to big data frameworks and technologies for large-scale statistical data processing.', duration: '20 hours', level: 'ADVANCED', skills: ['Big Data', 'Hadoop', 'Spark', 'Data Engineering'], isIgot: true, category: 'Technical' } }),
    prisma.course.upsert({ where: { id: 'course-016' }, update: {}, create: { id: 'course-016', title: 'Machine Learning Applications in Statistics', provider: 'iGOT Karmayogi', description: 'Practical ML applications for statistical imputation, outlier detection, and predictive modelling.', duration: '35 hours', level: 'ADVANCED', skills: ['AI/ML', 'Machine Learning', 'Python', 'Scikit-learn'], isIgot: true, category: 'Technical' } }),
    prisma.course.upsert({ where: { id: 'course-017' }, update: {}, create: { id: 'course-017', title: 'Consumer Price Index (CPI) Methodology', provider: 'iGOT Karmayogi / MOSPI', description: 'Methodology for computing and interpreting Consumer Price Index for price monitoring.', duration: '12 hours', level: 'INTERMEDIATE', skills: ['CPI', 'Price Statistics', 'Index Numbers'], isIgot: true, category: 'Statistical' } }),
    prisma.course.upsert({ where: { id: 'course-018' }, update: {}, create: { id: 'course-018', title: 'Leadership for Public Sector Managers', provider: 'iGOT Karmayogi', description: 'Leadership skills for managing statistical teams and driving institutional change.', duration: '12 hours', level: 'ADVANCED', skills: ['Leadership', 'Management', 'Team Building'], isIgot: true, category: 'Managerial' } }),
    prisma.course.upsert({ where: { id: 'course-019' }, update: {}, create: { id: 'course-019', title: 'Natural Language Processing for Govt Data', provider: 'iGOT Karmayogi / AI4BH', description: 'NLP techniques for processing unstructured government data and text analytics.', duration: '18 hours', level: 'ADVANCED', skills: ['NLP', 'AI/ML', 'Text Analytics', 'Python'], isIgot: true, category: 'Technical' } }),
    prisma.course.upsert({ where: { id: 'course-020' }, update: {}, create: { id: 'course-020', title: 'e-Governance and Digital India', provider: 'iGOT Karmayogi / NeGD', description: 'Understanding e-governance framework, Digital India initiatives, and technology-driven public service delivery.', duration: '6 hours', level: 'BEGINNER', skills: ['Digital Governance', 'e-Governance', 'Digital India'], isIgot: true, category: 'Digital Governance' } }),
  ]);
  console.log('✅ iGOT Courses created');

  // ===== NSSTA PROGRAMMES =====
  await Promise.all([
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-001' }, update: {}, create: { id: 'nssta-001', title: 'Advanced Survey Methodology', description: 'In-depth training on survey planning, questionnaire design, field implementation, and data quality for NSO surveys.', targetAudience: 'Statistical Officers with 2+ years experience', duration: '5 Days', mode: 'Classroom', competencies: ['Survey Design', 'Sampling', 'Data Quality'], eligibility: 'Grade B & C Statistical Officers', schedule: 'Quarterly', venue: 'NSSTA, Faridabad' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-002' }, update: {}, create: { id: 'nssta-002', title: 'Statistical Computing with Python', description: 'Hands-on training in Python for statistical data analysis, automation, and visualization.', targetAudience: 'Data Analysts and Statistical Officers', duration: '5 Days', mode: 'Online', competencies: ['Python', 'Statistical Analysis', 'Data Visualization'], eligibility: 'Basic computer knowledge required', schedule: 'Monthly', venue: 'Online / NSSTA' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-003' }, update: {}, create: { id: 'nssta-003', title: 'Survey Sampling Methods Workshop', description: 'Comprehensive training on probability sampling methods including SRS, stratified, cluster, and systematic sampling.', targetAudience: 'Junior Statistical Officers and Field Supervisors', duration: '3 Days', mode: 'Blended', competencies: ['Sampling', 'Survey Design', 'Statistical Analysis'], eligibility: 'Grade C & D Officers', schedule: 'Bi-monthly', venue: 'NSSTA, Faridabad' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-004' }, update: {}, create: { id: 'nssta-004', title: 'AI and Machine Learning for Official Statistics', description: 'Practical applications of AI/ML in official statistics including automated data processing and predictive analytics.', targetAudience: 'Senior Statistical Officers and Data Scientists', duration: '5 Days', mode: 'Classroom', competencies: ['AI/ML', 'Python', 'Data Science'], eligibility: 'Proficiency in basic statistics required', schedule: 'Quarterly', venue: 'NSSTA, Faridabad / NIC' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-005' }, update: {}, create: { id: 'nssta-005', title: 'Data Governance and Quality Assurance', description: 'Training on data governance frameworks, GSBPM implementation, and quality assurance for official statistics.', targetAudience: 'Data Governance Officers and Senior Statisticians', duration: '4 Days', mode: 'Classroom', competencies: ['Data Governance', 'Data Quality', 'Statistical Analysis'], eligibility: 'Grade B Officers and above', schedule: 'Quarterly', venue: 'NSSTA, Faridabad' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-006' }, update: {}, create: { id: 'nssta-006', title: 'SQL and Database Management for Statistics', description: 'Advanced SQL techniques for managing and querying large statistical databases.', targetAudience: 'Data Analysts and IT Officers', duration: '3 Days', mode: 'Online', competencies: ['SQL', 'Database Management', 'Data Analysis'], eligibility: 'Basic SQL knowledge preferred', schedule: 'Monthly', venue: 'Online' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-007' }, update: {}, create: { id: 'nssta-007', title: 'National Accounts and Economic Indicators', description: 'Comprehensive training on national accounts compilation, GDP measurement, and economic indicators.', targetAudience: 'Economists and National Accounts Officers', duration: '10 Days', mode: 'Classroom', competencies: ['National Accounts', 'Statistical Analysis', 'Index Numbers'], eligibility: 'Economics or Statistics background required', schedule: 'Bi-annual', venue: 'NSSTA, Faridabad / ISI Delhi' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-008' }, update: {}, create: { id: 'nssta-008', title: 'GIS for Official Statistics', description: 'Practical training on geographic information systems for spatial data analysis in official surveys.', targetAudience: 'GIS Analysts and Survey Planners', duration: '4 Days', mode: 'Classroom', competencies: ['GIS', 'Spatial Analysis', 'Survey Design'], eligibility: 'Grade C Officers with field experience', schedule: 'Bi-annual', venue: 'NSSTA / Survey of India' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-009' }, update: {}, create: { id: 'nssta-009', title: 'Cybersecurity for Statistical Data', description: 'Information security best practices for protecting sensitive government statistical data.', targetAudience: 'IT Officers and Data Governance Officers', duration: '3 Days', mode: 'Blended', competencies: ['Cybersecurity', 'Data Governance', 'Cloud Computing'], eligibility: 'IT background preferred', schedule: 'Quarterly', venue: 'NSSTA / CERT-In' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-010' }, update: {}, create: { id: 'nssta-010', title: 'Data Visualization and Communication', description: 'Training on effective visualization of statistical data using modern tools and communication strategies.', targetAudience: 'Statistical Officers and Communication Officers', duration: '3 Days', mode: 'Online', competencies: ['Data Visualization', 'Communication', 'Reporting'], eligibility: 'Grade C & B Officers', schedule: 'Monthly', venue: 'Online' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-011' }, update: {}, create: { id: 'nssta-011', title: 'Leadership and Management for Senior Officers', description: 'Leadership development programme for senior statistical officers transitioning to management roles.', targetAudience: 'Grade A and Senior Grade B Officers', duration: '5 Days', mode: 'Residential', competencies: ['Leadership', 'Project Management', 'Policy Analysis'], eligibility: 'Grade A Officers only', schedule: 'Annual', venue: 'LBSNAA / NSSTA' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-012' }, update: {}, create: { id: 'nssta-012', title: 'Index Numbers: Theory and Practice', description: 'Detailed training on construction and interpretation of CPI, WPI, IIP and other index numbers.', targetAudience: 'Economic Statistics Officers', duration: '4 Days', mode: 'Classroom', competencies: ['Index Numbers', 'Economic Statistics', 'Statistical Analysis'], eligibility: 'Statistics or Economics background', schedule: 'Quarterly', venue: 'NSSTA, Faridabad' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-013' }, update: {}, create: { id: 'nssta-013', title: 'Agricultural Statistics Methods', description: 'Methods and techniques for collecting, processing, and analysing agricultural statistical data.', targetAudience: 'Agricultural Statistics Officers', duration: '5 Days', mode: 'Blended', competencies: ['Survey Design', 'Statistical Analysis', 'Data Quality'], eligibility: 'Officers in Agriculture Division', schedule: 'Bi-annual', venue: 'NSSTA / IASRI Delhi' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-014' }, update: {}, create: { id: 'nssta-014', title: 'R Programming for Data Analysis', description: 'Hands-on training in R for statistical computing, data visualization, and report generation.', targetAudience: 'Statisticians and Data Analysts', duration: '4 Days', mode: 'Online', competencies: ['R Programming', 'Statistical Analysis', 'Data Visualization'], eligibility: 'Basic statistics knowledge required', schedule: 'Monthly', venue: 'Online / NSSTA' } }),
    prisma.nsstaProgramme.upsert({ where: { id: 'nssta-015' }, update: {}, create: { id: 'nssta-015', title: 'Big Data Analytics for NSO', description: 'Introduction to big data technologies and their applications in official statistical systems.', targetAudience: 'Senior Data Analysts and IT Officers', duration: '5 Days', mode: 'Classroom', competencies: ['Big Data', 'AI/ML', 'Data Governance'], eligibility: 'Technical background required', schedule: 'Bi-annual', venue: 'NIC / NSSTA' } }),
  ]);
  console.log('✅ NSSTA Programmes created');

  // ===== ASSESSMENT QUESTIONS =====
  const questionData = [
    // Statistics domain
    { text: 'Which sampling method gives every member of the population an equal probability of selection?', optionA: 'Stratified Sampling', optionB: 'Simple Random Sampling', optionC: 'Cluster Sampling', optionD: 'Systematic Sampling', correctAnswer: 'B', explanation: 'Simple random sampling ensures each population element has an equal and known probability of being selected.', difficulty: 'MEDIUM' as const, domain: 'Statistics', competencyCode: 'STAT002' },
    { text: 'What does the term "sampling frame" refer to in survey methodology?', optionA: 'The geographic boundary of the survey', optionB: 'The complete list of all sampling units from which the sample is drawn', optionC: 'The statistical formula used for sampling', optionD: 'The time period covered by the survey', correctAnswer: 'B', explanation: 'A sampling frame is the complete list of all units in the population from which the sample is selected.', difficulty: 'MEDIUM' as const, domain: 'Statistics', competencyCode: 'STAT002' },
    { text: 'Which measure of central tendency is least affected by outliers?', optionA: 'Mean', optionB: 'Mode', optionC: 'Median', optionD: 'Standard Deviation', correctAnswer: 'C', explanation: 'The median divides a dataset into two equal halves and is not affected by extreme values (outliers).', difficulty: 'EASY' as const, domain: 'Statistics', competencyCode: 'STAT003' },
    { text: 'What is non-response bias in surveys?', optionA: 'Errors due to incorrect recording of data', optionB: 'Systematic difference between respondents and non-respondents that affects results', optionC: 'Bias introduced by the survey instrument', optionD: 'Errors in data processing', correctAnswer: 'B', explanation: 'Non-response bias occurs when people who respond differ systematically from those who do not.', difficulty: 'HARD' as const, domain: 'Statistics', competencyCode: 'STAT001' },
    { text: 'What is the purpose of stratification in sampling?', optionA: 'To reduce the sample size', optionB: 'To ensure representation of important subgroups and reduce variance', optionC: 'To speed up data collection', optionD: 'To eliminate non-sampling errors', correctAnswer: 'B', explanation: 'Stratified sampling divides the population into homogeneous subgroups and samples from each, ensuring better representation.', difficulty: 'MEDIUM' as const, domain: 'Statistics', competencyCode: 'STAT002' },
    // Python domain
    { text: 'In Python, which library is most commonly used for statistical data analysis and manipulation?', optionA: 'NumPy', optionB: 'Matplotlib', optionC: 'Pandas', optionD: 'Scikit-learn', correctAnswer: 'C', explanation: 'Pandas provides DataFrames and functions for data manipulation, making it the go-to library for statistical data analysis in Python.', difficulty: 'EASY' as const, domain: 'Python', competencyCode: 'TECH001' },
    { text: 'In Python, which function is used to handle missing values by removing rows with NaN?', optionA: 'df.remove_na()', optionB: 'df.drop_null()', optionC: 'df.dropna()', optionD: 'df.clean()', correctAnswer: 'C', explanation: 'df.dropna() removes rows containing NaN values from a Pandas DataFrame.', difficulty: 'EASY' as const, domain: 'Python', competencyCode: 'TECH001' },
    { text: 'Which Python function reads a CSV file into a DataFrame?', optionA: 'pd.read_excel()', optionB: 'pd.load_csv()', optionC: 'pd.import_csv()', optionD: 'pd.read_csv()', correctAnswer: 'D', explanation: 'pd.read_csv() from the Pandas library reads a CSV file into a Pandas DataFrame.', difficulty: 'EASY' as const, domain: 'Python', competencyCode: 'TECH001' },
    { text: 'What does the pandas groupby() function do?', optionA: 'Sorts the DataFrame by column values', optionB: 'Splits data into groups based on some criteria and applies functions', optionC: 'Merges two DataFrames together', optionD: 'Removes duplicate values', correctAnswer: 'B', explanation: 'groupby() splits data into groups, applies a function, and combines results—ideal for summarising statistical data by category.', difficulty: 'MEDIUM' as const, domain: 'Python', competencyCode: 'TECH001' },
    // SQL domain
    { text: 'Which SQL clause is used to filter rows after grouping?', optionA: 'WHERE', optionB: 'FILTER', optionC: 'HAVING', optionD: 'ORDER BY', correctAnswer: 'C', explanation: 'The HAVING clause filters rows after the GROUP BY operation, allowing conditions on aggregated data.', difficulty: 'MEDIUM' as const, domain: 'SQL', competencyCode: 'TECH002' },
    { text: 'Which SQL JOIN returns all rows when there is a match in either the left or right table?', optionA: 'INNER JOIN', optionB: 'LEFT JOIN', optionC: 'RIGHT JOIN', optionD: 'FULL OUTER JOIN', correctAnswer: 'D', explanation: 'FULL OUTER JOIN returns all rows from both tables, with NULL values where there is no match.', difficulty: 'MEDIUM' as const, domain: 'SQL', competencyCode: 'TECH002' },
    { text: 'What does SELECT DISTINCT do in SQL?', optionA: 'Selects all rows including duplicates', optionB: 'Selects only unique rows', optionC: 'Orders the results', optionD: 'Filters null values', correctAnswer: 'B', explanation: 'SELECT DISTINCT returns only unique rows, eliminating duplicate values from the result set.', difficulty: 'EASY' as const, domain: 'SQL', competencyCode: 'TECH002' },
    // AI/ML domain
    { text: 'In machine learning, what is the purpose of a training dataset?', optionA: 'To evaluate final model performance', optionB: 'To train the model by adjusting parameters', optionC: 'To validate hyperparameters', optionD: 'To generate new synthetic data', correctAnswer: 'B', explanation: 'A training dataset is used to fit the ML model, allowing the algorithm to learn patterns by adjusting its parameters.', difficulty: 'EASY' as const, domain: 'AI/ML', competencyCode: 'TECH004' },
    { text: 'What is overfitting in machine learning?', optionA: 'When a model is too simple', optionB: 'When a model performs well on training data but poorly on new data', optionC: 'When training takes too long', optionD: 'When the dataset is too large', correctAnswer: 'B', explanation: 'Overfitting occurs when a model learns the training data too well, resulting in poor generalization to unseen data.', difficulty: 'MEDIUM' as const, domain: 'AI/ML', competencyCode: 'TECH004' },
    // Data Visualization
    { text: 'Which chart type is best suited for showing the distribution of a continuous variable?', optionA: 'Bar Chart', optionB: 'Pie Chart', optionC: 'Histogram', optionD: 'Line Chart', correctAnswer: 'C', explanation: 'A histogram displays the frequency distribution of continuous data by grouping values into bins.', difficulty: 'EASY' as const, domain: 'Data Visualization', competencyCode: 'TECH005' },
    { text: 'What is the primary advantage of using a heat map for data visualization?', optionA: 'Showing trends over time', optionB: 'Displaying geographic distributions', optionC: 'Revealing patterns and correlations in large datasets through color intensity', optionD: 'Comparing individual data points', correctAnswer: 'C', explanation: 'Heat maps use color intensity to represent data values, making it easy to identify patterns and correlations in complex datasets.', difficulty: 'MEDIUM' as const, domain: 'Data Visualization', competencyCode: 'TECH005' },
    // Cybersecurity
    { text: 'In cybersecurity, what is phishing?', optionA: 'A type of network scanning technique', optionB: 'A social engineering attack that deceives users into revealing sensitive information', optionC: 'A method to encrypt government data', optionD: 'A firewall configuration technique', correctAnswer: 'B', explanation: 'Phishing is a cyber attack where attackers impersonate legitimate organizations to steal sensitive information.', difficulty: 'EASY' as const, domain: 'Cybersecurity', competencyCode: 'DIG001' },
    { text: 'What is the primary purpose of data encryption in government systems?', optionA: 'To speed up data processing', optionB: 'To protect data from unauthorized access by converting it to an unreadable format', optionC: 'To compress data for storage efficiency', optionD: 'To backup data automatically', correctAnswer: 'B', explanation: 'Encryption converts data into an encoded format that can only be read with the correct decryption key, protecting it from unauthorized access.', difficulty: 'EASY' as const, domain: 'Cybersecurity', competencyCode: 'DIG001' },
    // Official Statistics
    { text: 'What does GDP stand for in the context of national accounts?', optionA: 'General Domestic Production', optionB: 'Gross Domestic Product', optionC: 'Government Data Processing', optionD: 'Gross Development Program', correctAnswer: 'B', explanation: 'GDP (Gross Domestic Product) is the monetary value of all finished goods and services produced within a country\'s borders in a specific time period.', difficulty: 'EASY' as const, domain: 'Economic Statistics', competencyCode: 'STAT003' },
    { text: 'What is the Consumer Price Index (CPI) a measure of?', optionA: 'Industrial production levels', optionB: 'Government spending efficiency', optionC: 'Changes in the price level of goods and services purchased by households', optionD: 'National income distribution', correctAnswer: 'C', explanation: 'The CPI measures the average change in prices paid by consumers for a representative basket of goods and services.', difficulty: 'MEDIUM' as const, domain: 'Economic Statistics', competencyCode: 'STAT005' },
    { text: 'What does NSSO stand for?', optionA: 'National Statistics Survey Organization', optionB: 'National Sample Survey Office', optionC: 'National Statistical Standards Organization', optionD: 'National Survey and Statistics Office', correctAnswer: 'B', explanation: 'NSSO (National Sample Survey Office), now part of NSO, conducts large-scale sample surveys across India to collect socio-economic data.', difficulty: 'EASY' as const, domain: 'Official Statistics', competencyCode: 'STAT001' },
    { text: 'What is a census in the context of official statistics?', optionA: 'A sample of 10% of the population', optionB: 'A complete enumeration of all units in the target population', optionC: 'A monthly economic survey', optionD: 'A targeted survey of specific demographics', correctAnswer: 'B', explanation: 'A census is a complete enumeration that collects data on every unit in the target population, providing 100% coverage.', difficulty: 'EASY' as const, domain: 'Official Statistics', competencyCode: 'STAT002' },
  ];

  const createdQuestions = [];
  for (const qd of questionData) {
    const comp = compMap[qd.competencyCode];
    const question = await prisma.question.create({
      data: {
        text: qd.text,
        optionA: qd.optionA,
        optionB: qd.optionB,
        optionC: qd.optionC,
        optionD: qd.optionD,
        correctAnswer: qd.correctAnswer,
        explanation: qd.explanation,
        difficulty: qd.difficulty,
        domain: qd.domain,
        competencyId: comp?.id || null,
      },
    });
    createdQuestions.push(question);
  }
  console.log(`✅ ${createdQuestions.length} assessment questions created`);

  // ===== MAIN ASSESSMENT =====
  const mainAssessment = await prisma.assessment.upsert({
    where: { id: 'assessment-001' },
    update: {},
    create: {
      id: 'assessment-001',
      title: 'Official Statistics Competency Assessment',
      description: 'Comprehensive competency assessment covering Statistical Methods, Python, SQL, Data Visualization, AI/ML, and Cybersecurity for MoSPI employees.',
      duration: 40,
      totalMarks: 100,
      passingScore: 60,
      isActive: true,
    },
  });

  // Link questions to assessment
  for (let i = 0; i < Math.min(createdQuestions.length, 20); i++) {
    await prisma.assessmentQuestion.upsert({
      where: { assessmentId_questionId: { assessmentId: mainAssessment.id, questionId: createdQuestions[i].id } },
      update: {},
      create: {
        assessmentId: mainAssessment.id,
        questionId: createdQuestions[i].id,
        order: i + 1,
      },
    });
  }
  console.log('✅ Main assessment created with 20 questions');

  // ===== LEARNING PATH FOR RAHUL =====
  if (rahulUser.profile) {
    const existingPath = await prisma.learningPath.findFirst({
      where: { profileId: rahulUser.profile.id },
    });

    if (!existingPath) {
      await prisma.learningPath.create({
        data: {
          profileId: rahulUser.profile.id,
          title: 'Statistical Data Analyst Development Path',
          goal: 'Statistical Data Analyst → Advanced Statistical Data Analyst',
          isActive: true,
          progress: 15,
          items: {
            create: [
              { title: 'Python for Data Analysis', courseId: 'course-001', order: 1, status: 'COMPLETED', duration: '20 hours', difficulty: 'MEDIUM', skills: ['Python', 'Pandas', 'NumPy'], description: 'Foundation Python skills for data processing and statistical analysis.' },
              { title: 'SQL for Statistical Databases', courseId: 'course-002', order: 2, status: 'IN_PROGRESS', duration: '15 hours', difficulty: 'EASY', skills: ['SQL', 'Database Queries'], description: 'SQL skills for querying government statistical databases.' },
              { title: 'Data Visualization using Power BI', courseId: 'course-004', order: 3, status: 'RECOMMENDED', duration: '12 hours', difficulty: 'EASY', skills: ['Power BI', 'Dashboard'], description: 'Creating interactive statistical dashboards for reporting.' },
              { title: 'Survey Sampling Fundamentals', courseId: 'course-008', order: 4, status: 'RECOMMENDED', duration: '22 hours', difficulty: 'MEDIUM', skills: ['Sampling', 'Survey Design'], description: 'Statistical sampling methods for official surveys.' },
              { title: 'Introduction to AI for Official Statistics', courseId: 'course-003', order: 5, status: 'UPCOMING', duration: '25 hours', difficulty: 'MEDIUM', skills: ['AI/ML', 'Machine Learning'], description: 'AI/ML applications in the statistical ecosystem.' },
            ],
          },
        },
      });
      console.log('✅ Rahul learning path created');
    }

    // Rahul's certificates
    await prisma.certificate.createMany({
      data: [
        { profileId: rahulUser.profile.id, title: 'Foundations of Official Statistics', issuer: 'NSSTA', issuedAt: new Date('2022-08-15'), skills: ['Statistical Analysis', 'Survey Design'] },
        { profileId: rahulUser.profile.id, title: 'SQL for Data Analysis', issuer: 'iGOT Karmayogi', issuedAt: new Date('2023-03-20'), skills: ['SQL', 'Database'] },
        { profileId: rahulUser.profile.id, title: 'Cybersecurity Fundamentals', issuer: 'CERT-In / iGOT', issuedAt: new Date('2023-09-10'), skills: ['Cybersecurity'] },
      ],
      skipDuplicates: true,
    });

    // Initial notifications for Rahul
    await prisma.notification.createMany({
      data: [
        { userId: rahulUser.id, title: 'Welcome to StatIntel AI', message: 'Your AI-powered learning journey begins! Complete your competency assessment to get personalized recommendations.', type: 'info', isRead: false },
        { userId: rahulUser.id, title: 'New Quiz Available', message: 'Official Statistics Fundamentals quiz is now available. Test your knowledge and improve your competency score!', type: 'info', isRead: false },
        { userId: rahulUser.id, title: 'Learning Path Updated', message: 'Your personalized learning path has been updated based on your latest skill gap analysis.', type: 'success', isRead: true },
      ],
      skipDuplicates: true,
    });

    // Recommendations for Rahul
    await prisma.recommendation.createMany({
      data: [
        { profileId: rahulUser.profile.id, courseId: 'course-003', type: 'COURSE', matchPercentage: 92, reason: 'Addresses your AI/ML competency gap (1.8/5). Critical for Data Analyst role in the Data Analytics Division.', priority: 1 },
        { profileId: rahulUser.profile.id, courseId: 'course-001', type: 'COURSE', matchPercentage: 90, reason: 'Bridges your Python gap (2.3/5). Essential for data processing and automation tasks in your role.', priority: 2 },
        { profileId: rahulUser.profile.id, courseId: 'course-008', type: 'COURSE', matchPercentage: 88, reason: 'Covers Survey Design and Sampling—your two critical competency gaps (2.5/5 and 2.2/5).', priority: 3 },
        { profileId: rahulUser.profile.id, courseId: 'course-004', type: 'COURSE', matchPercentage: 85, reason: 'Improves your Data Visualization skills (2.8/5) for effective communication of statistical insights.', priority: 4 },
        { profileId: rahulUser.profile.id, nsstaProgrammeId: 'nssta-001', type: 'NSSTA', reason: 'Matches your Survey Design and Sampling competency gaps. Classroom training with field exercises.', priority: 1 },
        { profileId: rahulUser.profile.id, nsstaProgrammeId: 'nssta-002', type: 'NSSTA', reason: 'Hands-on Python training specifically designed for statistical data analysis.', priority: 2 },
        { profileId: rahulUser.profile.id, nsstaProgrammeId: 'nssta-004', type: 'NSSTA', reason: 'AI/ML training for official statistics applications, addressing your highest-priority gap.', priority: 3 },
      ],
      skipDuplicates: true,
    });
  }

  // ===== SAMPLE GENERATED QUESTIONS for Trainer demo =====
  const trainerProfile = trainerUser.profile;
  if (trainerProfile) {
    const sampleQuestions = await Promise.all([
      prisma.generatedQuestion.create({ data: { uploadedById: trainerUser.id, text: 'Which sampling method gives every member of the population an equal probability of selection?', optionA: 'Stratified Sampling', optionB: 'Simple Random Sampling', optionC: 'Cluster Sampling', optionD: 'Systematic Sampling', correctAnswer: 'B', explanation: 'Simple random sampling ensures each population element has an equal and known probability of being selected.', difficulty: 'MEDIUM', domain: 'Sampling', competencyId: compMap['STAT002']?.id, aiConfidence: 0.97, status: 'APPROVED' } }),
      prisma.generatedQuestion.create({ data: { uploadedById: trainerUser.id, text: 'What does the term "sampling frame" refer to in survey methodology?', optionA: 'The geographic boundary of the survey', optionB: 'The complete list of all sampling units', optionC: 'The statistical formula used', optionD: 'The time period of the survey', correctAnswer: 'B', explanation: 'A sampling frame is the complete list of all units in the population from which the sample is selected.', difficulty: 'MEDIUM', domain: 'Survey Design', competencyId: compMap['STAT001']?.id, aiConfidence: 0.95, status: 'NEEDS_REVIEW' } }),
      prisma.generatedQuestion.create({ data: { uploadedById: trainerUser.id, text: 'What is the purpose of stratification in sampling?', optionA: 'To reduce the sample size', optionB: 'To ensure representation and reduce variance', optionC: 'To speed up data collection', optionD: 'To eliminate non-sampling errors', correctAnswer: 'B', explanation: 'Stratified sampling divides the population into homogeneous groups and samples from each, ensuring better representation.', difficulty: 'MEDIUM', domain: 'Sampling', competencyId: compMap['STAT002']?.id, aiConfidence: 0.96, status: 'APPROVED' } }),
      prisma.generatedQuestion.create({ data: { uploadedById: trainerUser.id, text: 'What is cluster sampling?', optionA: 'Dividing population into groups and sampling all units from selected groups', optionB: 'Selecting every nth element', optionC: 'Sampling proportionally from different strata', optionD: 'Randomly selecting individuals without replacement', correctAnswer: 'A', explanation: 'Cluster sampling divides the population into clusters, randomly selects some clusters, and surveys all units within selected clusters.', difficulty: 'MEDIUM', domain: 'Sampling', competencyId: compMap['STAT002']?.id, aiConfidence: 0.94, status: 'AI_GENERATED' } }),
      prisma.generatedQuestion.create({ data: { uploadedById: trainerUser.id, text: 'What is non-response bias in surveys?', optionA: 'Errors due to incorrect recording', optionB: 'Systematic difference between respondents and non-respondents', optionC: 'Bias from the survey instrument', optionD: 'Errors in data processing', correctAnswer: 'B', explanation: 'Non-response bias occurs when people who respond differ systematically from those who do not, skewing results.', difficulty: 'HARD', domain: 'Survey Design', competencyId: compMap['STAT001']?.id, aiConfidence: 0.93, status: 'APPROVED' } }),
    ]);

    // Create a demo quiz
    const demoQuiz = await prisma.quiz.create({
      data: {
        id: 'quiz-001',
        title: 'Official Statistics Fundamentals',
        description: 'A comprehensive quiz covering sampling methods, survey design, and statistical concepts.',
        createdById: trainerUser.id,
        duration: 15,
        passingScore: 60,
        status: 'PUBLISHED',
        questions: {
          create: sampleQuestions.map((q, i) => ({
            generatedQuestionId: q.id,
            order: i + 1,
          })),
        },
        competencies: {
          create: [
            { competencyId: compMap['STAT001']?.id || competencies[0].id },
            { competencyId: compMap['STAT002']?.id || competencies[1].id },
          ],
        },
      },
    });
    console.log('✅ Demo quiz created');
  }

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📋 Demo Accounts:');
  console.log('  Employee: employee@statintel.demo / demo123 (Rahul Sharma)');
  console.log('  Trainer:  trainer@statintel.demo / demo123 (Priya Patel)');
  console.log('  Admin:    admin@statintel.demo / demo123 (Vikram Singh)');
  console.log('\n⚠️  This is PROTOTYPE SAMPLE DATA - not real government records.\n');
}

main()
  .catch(e => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
