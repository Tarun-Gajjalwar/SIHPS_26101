import {
  AIProvider,
  CompetencyAnalysisInput,
  CompetencyAnalysisResult,
  SkillGapInput,
  SkillGapResult,
  MCQInput,
  MCQResult,
  MCQQuestion,
  AssistantInput,
  RecommendationInput,
  RecommendationResult,
} from './types';

// Deterministic mock AI provider that uses actual data to generate realistic responses
export class MockAIProvider implements AIProvider {
  
  async analyzeCompetency(input: CompetencyAnalysisInput): Promise<CompetencyAnalysisResult> {
    const { scores, percentage, passed } = input;
    
    const domains = Object.entries(scores);
    const strongest = domains.sort((a, b) => b[1] - a[1])[0];
    const weakest = domains.sort((a, b) => a[1] - b[1])[0];
    
    const overallLevel = percentage >= 80 ? 'Advanced' 
      : percentage >= 60 ? 'Intermediate' 
      : percentage >= 40 ? 'Beginner'
      : 'Foundational';

    const strengths = domains
      .filter(([, score]) => score >= 3.5)
      .map(([domain]) => domain);
    
    const improvements = domains
      .filter(([, score]) => score < 3.0)
      .map(([domain]) => domain);

    return {
      summary: `Your overall competency is at ${overallLevel} level with a score of ${percentage}%. ${passed ? 'You have demonstrated solid foundational knowledge.' : 'There is significant room for improvement in key areas.'}`,
      strengths: strengths.length > 0 ? strengths : ['General knowledge foundation'],
      improvements: improvements.length > 0 ? improvements : ['Advanced applications', 'Practical implementation'],
      overallLevel,
      recommendation: strongest && weakest
        ? `Focus on improving your ${weakest[0]} skills while leveraging your strength in ${strongest[0]}. Consider enrolling in structured training programmes offered through iGOT Karmayogi.`
        : 'Focus on building a balanced competency profile across all domains.',
    };
  }

  async identifySkillGaps(input: SkillGapInput): Promise<SkillGapResult> {
    const { competencies, role, department } = input;
    
    const gaps = competencies
      .filter(c => c.requiredLevel - c.currentLevel > 0.3)
      .map(c => {
        const gap = parseFloat((c.requiredLevel - c.currentLevel).toFixed(1));
        const priority = gap >= 2.0 ? 1 : gap >= 1.0 ? 2 : 3;
        
        const reasonMap: Record<string, string> = {
          'Python': `Your current Python assessment score of ${c.currentLevel}/5 is below the ${role || 'required'} competency requirement of ${c.requiredLevel}/5 for data processing and automation tasks.`,
          'SQL': `SQL proficiency of ${c.currentLevel}/5 is insufficient for the data extraction and analysis tasks expected at the ${role || 'target'} level of ${c.requiredLevel}/5.`,
          'Survey Design': `Survey methodology competency (${c.currentLevel}/5) needs improvement to reach the standard of ${c.requiredLevel}/5 required for official statistical surveys.`,
          'Data Visualization': `Data visualization skills (${c.currentLevel}/5) need to reach ${c.requiredLevel}/5 to effectively communicate statistical insights to stakeholders.`,
          'AI/ML': `AI and Machine Learning competency (${c.currentLevel}/5) is emerging as a critical skill. The target level is ${c.requiredLevel}/5 for ${department || 'your department'}.`,
          'Sampling': `Statistical sampling competency (${c.currentLevel}/5) is below the required ${c.requiredLevel}/5 level for conducting official surveys and field studies.`,
        };
        
        const actionMap: Record<string, string> = {
          'Python': 'Enroll in "Python for Data Analysis" on iGOT Karmayogi platform (Beginner to Intermediate)',
          'SQL': 'Complete "SQL for Statistical Databases" to build practical database querying skills',
          'Survey Design': 'Attend NSSTA\'s "Advanced Survey Methodology" 5-day classroom programme',
          'Data Visualization': 'Complete "Data Visualization using Power BI" course on iGOT platform',
          'AI/ML': 'Begin with "Introduction to AI for Official Statistics" followed by practical applications',
          'Sampling': 'Enroll in NSSTA\'s "Survey Sampling Fundamentals" training programme',
        };

        return {
          competencyName: c.name,
          gap,
          priority,
          reason: reasonMap[c.name] || `Your ${c.name} competency (${c.currentLevel}/5) needs to reach the required level of ${c.requiredLevel}/5 for your ${role || 'current'} role.`,
          recommendedAction: actionMap[c.name] || `Complete relevant training in ${c.name} to bridge the identified competency gap.`,
        };
      })
      .sort((a, b) => a.priority - b.priority || b.gap - a.gap);

    const criticalGaps = gaps.filter(g => g.priority === 1).length;
    const moderateGaps = gaps.filter(g => g.priority === 2).length;

    return {
      gaps,
      summary: `AI analysis identified ${gaps.length} competency gaps for your ${role || 'current'} profile. ${criticalGaps > 0 ? `${criticalGaps} critical gaps require immediate attention.` : ''} ${moderateGaps > 0 ? `${moderateGaps} moderate gaps can be addressed through structured learning.` : ''}`,
    };
  }

  async generateMCQs(input: MCQInput): Promise<MCQResult> {
    const { count, domain, difficulty } = input;
    
    const questionBank: MCQQuestion[] = [
      {
        text: 'Which sampling method gives every member of the population an equal probability of selection?',
        optionA: 'Stratified Sampling',
        optionB: 'Simple Random Sampling',
        optionC: 'Cluster Sampling',
        optionD: 'Systematic Sampling',
        correctAnswer: 'B',
        explanation: 'Simple random sampling ensures each population element has an equal and known probability of being selected, making it the most fundamental probability sampling method.',
        difficulty: 'MEDIUM',
        domain: 'Sampling',
        aiConfidence: 0.97,
      },
      {
        text: 'What does the term "sampling frame" refer to in survey methodology?',
        optionA: 'The geographic boundary of the survey',
        optionB: 'The complete list of all sampling units from which the sample is drawn',
        optionC: 'The statistical formula used for sampling',
        optionD: 'The time period covered by the survey',
        correctAnswer: 'B',
        explanation: 'A sampling frame is the complete list or database of all units in the population from which the sample is selected. Its quality directly affects survey accuracy.',
        difficulty: 'MEDIUM',
        domain: 'Survey Design',
        aiConfidence: 0.95,
      },
      {
        text: 'In Python, which library is most commonly used for statistical data analysis and manipulation?',
        optionA: 'NumPy',
        optionB: 'Matplotlib',
        optionC: 'Pandas',
        optionD: 'Scikit-learn',
        correctAnswer: 'C',
        explanation: 'Pandas provides data structures (DataFrame and Series) and functions for data manipulation and analysis, making it the go-to library for statistical data analysis in Python.',
        difficulty: 'EASY',
        domain: 'Python',
        aiConfidence: 0.99,
      },
      {
        text: 'What is the purpose of stratification in sampling?',
        optionA: 'To reduce the sample size',
        optionB: 'To ensure representation of important subgroups and reduce variance',
        optionC: 'To speed up data collection',
        optionD: 'To eliminate non-sampling errors',
        correctAnswer: 'B',
        explanation: 'Stratified sampling divides the population into homogeneous subgroups (strata) and samples from each, ensuring better representation and often reducing variance compared to simple random sampling.',
        difficulty: 'MEDIUM',
        domain: 'Sampling',
        aiConfidence: 0.96,
      },
      {
        text: 'Which SQL clause is used to filter rows after grouping?',
        optionA: 'WHERE',
        optionB: 'FILTER',
        optionC: 'HAVING',
        optionD: 'ORDER BY',
        correctAnswer: 'C',
        explanation: 'The HAVING clause filters rows after the GROUP BY operation, allowing conditions on aggregated data. WHERE filters rows before grouping.',
        difficulty: 'MEDIUM',
        domain: 'SQL',
        aiConfidence: 0.98,
      },
      {
        text: 'What does GDP stand for in the context of national accounts?',
        optionA: 'General Domestic Production',
        optionB: 'Gross Domestic Product',
        optionC: 'Government Data Processing',
        optionD: 'Gross Development Program',
        correctAnswer: 'B',
        explanation: 'GDP (Gross Domestic Product) is the monetary value of all finished goods and services produced within a country\'s borders in a specific time period, a primary indicator of economic health.',
        difficulty: 'EASY',
        domain: 'Economic Statistics',
        aiConfidence: 0.99,
      },
      {
        text: 'Which measure of central tendency is least affected by outliers?',
        optionA: 'Mean',
        optionB: 'Mode',
        optionC: 'Median',
        optionD: 'Range',
        correctAnswer: 'C',
        explanation: 'The median divides a dataset into two equal halves and is not affected by extreme values (outliers), making it a robust measure for skewed distributions.',
        difficulty: 'EASY',
        domain: 'Statistics',
        aiConfidence: 0.97,
      },
      {
        text: 'In machine learning, what is the purpose of a training dataset?',
        optionA: 'To evaluate final model performance',
        optionB: 'To train the model by adjusting parameters based on the data',
        optionC: 'To validate hyperparameters',
        optionD: 'To generate new synthetic data',
        correctAnswer: 'B',
        explanation: 'A training dataset is used to fit (train) the machine learning model, allowing the algorithm to learn patterns and relationships by adjusting its parameters.',
        difficulty: 'EASY',
        domain: 'AI/ML',
        aiConfidence: 0.98,
      },
      {
        text: 'What is non-response bias in surveys?',
        optionA: 'Errors due to incorrect recording of data',
        optionB: 'Systematic difference between respondents and non-respondents that affects results',
        optionC: 'Bias introduced by the survey instrument',
        optionD: 'Errors in data processing',
        correctAnswer: 'B',
        explanation: 'Non-response bias occurs when people who respond to a survey differ systematically from those who do not, potentially skewing results away from the true population values.',
        difficulty: 'HARD',
        domain: 'Survey Design',
        aiConfidence: 0.94,
      },
      {
        text: 'Which chart type is best suited for showing the distribution of a continuous variable?',
        optionA: 'Bar Chart',
        optionB: 'Pie Chart',
        optionC: 'Histogram',
        optionD: 'Line Chart',
        correctAnswer: 'C',
        explanation: 'A histogram displays the frequency distribution of continuous data by grouping values into bins, showing the shape, spread, and central tendency of the distribution.',
        difficulty: 'EASY',
        domain: 'Data Visualization',
        aiConfidence: 0.96,
      },
      {
        text: 'In cybersecurity, what is phishing?',
        optionA: 'A type of network scanning technique',
        optionB: 'A social engineering attack that deceives users into revealing sensitive information',
        optionC: 'A method to encrypt government data',
        optionD: 'A firewall configuration technique',
        correctAnswer: 'B',
        explanation: 'Phishing is a cyber attack where attackers impersonate legitimate organizations via email, text, or websites to steal sensitive information like passwords and financial data.',
        difficulty: 'EASY',
        domain: 'Cybersecurity',
        aiConfidence: 0.99,
      },
      {
        text: 'What is the Index of Industrial Production (IIP) used to measure?',
        optionA: 'Agricultural output',
        optionB: 'Price levels in the economy',
        optionC: 'Short-term changes in industrial output',
        optionD: 'Employment in the services sector',
        correctAnswer: 'C',
        explanation: 'The IIP is an index that measures the change in volume of production of industrial products during a given period compared to a base period, covering mining, manufacturing, and electricity.',
        difficulty: 'MEDIUM',
        domain: 'Economic Statistics',
        aiConfidence: 0.95,
      },
      {
        text: 'Which Python function is used to read a CSV file into a DataFrame?',
        optionA: 'pd.read_excel()',
        optionB: 'pd.load_csv()',
        optionC: 'pd.import_csv()',
        optionD: 'pd.read_csv()',
        correctAnswer: 'D',
        explanation: 'The pd.read_csv() function from the Pandas library reads a CSV (Comma-Separated Values) file into a Pandas DataFrame for data analysis.',
        difficulty: 'EASY',
        domain: 'Python',
        aiConfidence: 0.99,
      },
      {
        text: 'What is the difference between population and sample in statistics?',
        optionA: 'Population is larger, sample is the analysis result',
        optionB: 'Population is the entire group; a sample is a subset selected for study',
        optionC: 'Population refers to people only; sample refers to items',
        optionD: 'There is no difference in statistical context',
        correctAnswer: 'B',
        explanation: 'A population includes all elements being studied, while a sample is a subset of the population selected for actual measurement. Statistical inference uses the sample to draw conclusions about the population.',
        difficulty: 'EASY',
        domain: 'Statistics',
        aiConfidence: 0.99,
      },
      {
        text: 'What does NSSO stand for?',
        optionA: 'National Statistics Survey Organization',
        optionB: 'National Sample Survey Office',
        optionC: 'National Statistical Standards Organization',
        optionD: 'National Survey and Statistics Office',
        correctAnswer: 'B',
        explanation: 'NSSO (National Sample Survey Office), now part of NSO (National Statistical Office), conducts large-scale sample surveys across India to collect socio-economic data.',
        difficulty: 'EASY',
        domain: 'Official Statistics',
        aiConfidence: 0.98,
      },
      {
        text: 'In data visualization, what is the primary advantage of using a heat map?',
        optionA: 'Showing trends over time',
        optionB: 'Displaying geographic distributions',
        optionC: 'Revealing patterns and correlations in large datasets through color intensity',
        optionD: 'Comparing individual data points',
        correctAnswer: 'C',
        explanation: 'Heat maps use color intensity to represent data values, making it easy to identify patterns, correlations, and outliers in large, complex datasets at a glance.',
        difficulty: 'MEDIUM',
        domain: 'Data Visualization',
        aiConfidence: 0.94,
      },
      {
        text: 'What is the Consumer Price Index (CPI) a measure of?',
        optionA: 'Industrial production levels',
        optionB: 'Government spending efficiency',
        optionC: 'Changes in the price level of goods and services purchased by households',
        optionD: 'National income distribution',
        correctAnswer: 'C',
        explanation: 'The CPI measures the average change over time in the prices paid by consumers for a representative basket of goods and services, serving as a key indicator of inflation.',
        difficulty: 'MEDIUM',
        domain: 'Economic Statistics',
        aiConfidence: 0.97,
      },
      {
        text: 'Which SQL JOIN returns all rows when there is a match in either the left or right table?',
        optionA: 'INNER JOIN',
        optionB: 'LEFT JOIN',
        optionC: 'RIGHT JOIN',
        optionD: 'FULL OUTER JOIN',
        correctAnswer: 'D',
        explanation: 'FULL OUTER JOIN returns all rows from both tables, with NULL values where there is no match in the other table, combining the results of LEFT and RIGHT JOINs.',
        difficulty: 'MEDIUM',
        domain: 'SQL',
        aiConfidence: 0.96,
      },
      {
        text: 'What is overfitting in machine learning?',
        optionA: 'When a model is too simple to capture data patterns',
        optionB: 'When a model performs well on training data but poorly on new data',
        optionC: 'When training takes too long to converge',
        optionD: 'When the dataset is too large',
        correctAnswer: 'B',
        explanation: 'Overfitting occurs when a model learns the training data too well, including its noise and random fluctuations, resulting in poor generalization to new, unseen data.',
        difficulty: 'MEDIUM',
        domain: 'AI/ML',
        aiConfidence: 0.97,
      },
      {
        text: 'What is a census in the context of official statistics?',
        optionA: 'A sample of 10% of the population',
        optionB: 'A complete enumeration of all units in the target population',
        optionC: 'A monthly economic survey',
        optionD: 'A targeted survey of specific demographics',
        correctAnswer: 'B',
        explanation: 'A census is a complete enumeration that collects data on every unit in the target population, providing 100% coverage as opposed to sampling methods.',
        difficulty: 'EASY',
        domain: 'Official Statistics',
        aiConfidence: 0.98,
      },
      {
        text: 'What does the acronym GIS stand for?',
        optionA: 'Global Information System',
        optionB: 'Geographic Information System',
        optionC: 'Government Intelligence Software',
        optionD: 'Geo-statistical Integration System',
        correctAnswer: 'B',
        explanation: 'GIS (Geographic Information System) captures, stores, analyzes, and manages spatial and geographic data, widely used in official statistics for regional data visualization and analysis.',
        difficulty: 'EASY',
        domain: 'Digital Governance',
        aiConfidence: 0.99,
      },
      {
        text: 'In Python, which function is used to handle missing values in a Pandas DataFrame by removing rows with NaN?',
        optionA: 'df.remove_na()',
        optionB: 'df.drop_null()',
        optionC: 'df.dropna()',
        optionD: 'df.clean()',
        correctAnswer: 'C',
        explanation: 'df.dropna() removes rows (or columns) containing NaN values from a Pandas DataFrame. It supports various parameters to control which rows/columns are dropped.',
        difficulty: 'EASY',
        domain: 'Python',
        aiConfidence: 0.98,
      },
      {
        text: 'What is the primary objective of data governance in official statistics?',
        optionA: 'To reduce the cost of data collection',
        optionB: 'To ensure data quality, security, availability, and compliance with standards',
        optionC: 'To automate all data processing tasks',
        optionD: 'To store data in cloud servers',
        correctAnswer: 'B',
        explanation: 'Data governance establishes policies, standards, and processes to ensure data quality, integrity, security, and compliance—critical for maintaining the credibility of official statistics.',
        difficulty: 'MEDIUM',
        domain: 'Digital Governance',
        aiConfidence: 0.95,
      },
      {
        text: 'What is cluster sampling?',
        optionA: 'Dividing population into groups and sampling all units from selected groups',
        optionB: 'Selecting every nth element from the population list',
        optionC: 'Sampling proportionally from different strata',
        optionD: 'Randomly selecting individuals without replacement',
        correctAnswer: 'A',
        explanation: 'Cluster sampling divides the population into clusters, randomly selects some clusters, and surveys all units within selected clusters—cost-effective when the population is geographically dispersed.',
        difficulty: 'MEDIUM',
        domain: 'Sampling',
        aiConfidence: 0.94,
      },
      {
        text: 'Which of the following best describes the concept of data integrity?',
        optionA: 'Data is stored in encrypted form',
        optionB: 'Data is accurate, consistent, and reliable throughout its lifecycle',
        optionC: 'Data is accessible to all users at all times',
        optionD: 'Data is backed up regularly',
        correctAnswer: 'B',
        explanation: 'Data integrity ensures that data remains accurate, complete, consistent, and reliable throughout its entire lifecycle, from creation to deletion—fundamental to official statistics.',
        difficulty: 'MEDIUM',
        domain: 'Digital Governance',
        aiConfidence: 0.96,
      },
    ];

    // Filter and select questions
    let filtered = questionBank;
    if (domain) {
      filtered = questionBank.filter(q => 
        q.domain.toLowerCase().includes(domain.toLowerCase())
      );
      if (filtered.length < count) filtered = questionBank;
    }
    if (difficulty) {
      const diffFiltered = filtered.filter(q => q.difficulty === difficulty.toUpperCase());
      if (diffFiltered.length >= count) filtered = diffFiltered;
    }

    // Shuffle and take required count
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    // Fill up if we don't have enough
    while (selected.length < count && selected.length < questionBank.length) {
      const remaining = questionBank.filter(q => !selected.includes(q));
      if (remaining.length === 0) break;
      selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
    }

    const topicsDetected = [...new Set(selected.map(q => q.domain))];

    return { questions: selected, topicsDetected };
  }

  async answerAssistant(input: AssistantInput): Promise<string> {
    const lastMessage = input.messages[input.messages.length - 1]?.content?.toLowerCase() || '';
    const ctx = input.userContext;

    // Context-aware responses based on user data
    if (lastMessage.includes('learn next') || lastMessage.includes('what should i')) {
      const topGap = ctx?.skillGaps?.sort((a, b) => b.gap - a.gap)[0];
      if (topGap) {
        return `Based on your current competency profile, I recommend focusing on **${topGap.competencyName}** next. You have a gap of ${topGap.gap.toFixed(1)} points from the required level.\n\n**Suggested actions:**\n1. 📚 Enroll in the corresponding iGOT Karmayogi course\n2. 🎯 Complete the NSSTA training programme in this area\n3. 📝 Take practice quizzes to reinforce your learning\n\nWould you like me to show you specific course recommendations?`;
      }
      return `Based on your profile as a **${ctx?.role || 'Statistical Officer'}**, I recommend:\n\n1. **Python for Data Analysis** - addresses your primary skill gap\n2. **SQL for Statistical Databases** - critical for data work\n3. **Survey Sampling Fundamentals** - essential for official statistics\n\nYour personalized learning path has been updated with these recommendations. Check the **Learning Path** section for details.`;
    }

    if (lastMessage.includes('skill gap') || lastMessage.includes('why do i have')) {
      const competencyName = ctx?.competencies?.find(c => 
        lastMessage.includes(c.name.toLowerCase())
      )?.name;
      
      if (competencyName) {
        const comp = ctx?.competencies?.find(c => c.name === competencyName);
        return `Your **${competencyName}** skill gap exists because your current level (${comp?.currentLevel}/5) is below the required competency level (${comp?.requiredLevel}/5) for your ${ctx?.role || 'role'}.\n\n**Why it matters:**\nThis competency is essential for data analysis tasks, report generation, and automated statistical workflows in the ${ctx?.department || 'department'}.\n\n**How to bridge it:**\n- Complete the relevant iGOT course (estimated 20 hours)\n- Practice with real datasets from your department\n- Attend NSSTA workshop sessions`;
      }
      return `Your skill gaps were identified through AI analysis of your competency assessment results compared to the required competency framework for your role and department.\n\nThe system identified gaps by comparing your current competency levels against the MoSPI competency framework for ${ctx?.role || 'Statistical Officers'}.\n\nWould you like me to explain a specific skill gap in detail?`;
    }

    if (lastMessage.includes('survey sampling') || lastMessage.includes('explain')) {
      if (lastMessage.includes('survey sampling')) {
        return `**Survey Sampling** is a statistical technique used to select a subset (sample) from a larger population to make inferences about the whole.\n\n**Key concepts:**\n\n🎯 **Probability Sampling**\n- Simple Random Sampling: Equal probability for all units\n- Stratified Sampling: Population divided into strata\n- Cluster Sampling: Groups selected as units\n- Systematic Sampling: Every nth element selected\n\n📊 **Key Terms**\n- **Sampling Frame**: List of all population units\n- **Sample Size**: Number of units selected\n- **Sampling Error**: Difference between sample and population values\n- **Non-response Bias**: When non-respondents differ from respondents\n\nIndia's NSO uses these methods for PLFS, HCES, and other major surveys. Would you like to take a practice quiz on this topic?`;
      }
      return `I can explain various topics in official statistics and data analysis. Try asking me about:\n- **Statistical methods** (sampling, regression, hypothesis testing)\n- **Python/SQL** for data analysis\n- **Data visualization** best practices\n- **AI/ML** concepts in statistics\n\nWhat would you like to learn about?`;
    }

    if (lastMessage.includes('recommend') || lastMessage.includes('training') || lastMessage.includes('course')) {
      const gaps = ctx?.skillGaps?.map(g => g.competencyName).join(', ') || 'Python, SQL, Survey Design';
      return `Based on your skill gaps in **${gaps}**, here are my top recommendations:\n\n**iGOT Karmayogi Courses:**\n1. 🐍 Python for Data Analysis (92% match) - 20 hours\n2. 📊 Data Visualization using Power BI (87% match) - 15 hours\n3. 🤖 Introduction to AI for Statistics (85% match) - 25 hours\n\n**NSSTA Training Programmes:**\n1. 📋 Advanced Survey Methodology - 5 days, Classroom\n2. 📈 Statistical Quality Management - 3 days, Blended\n3. 🗄️ SQL for Official Statistics - 2 days, Online\n\nShall I add these to your learning path?`;
    }

    if (lastMessage.includes('practice question') || lastMessage.includes('quiz') || lastMessage.includes('mcq')) {
      return `Here are 3 practice questions on Official Statistics:\n\n**Q1:** What does the acronym NSSO stand for?\n(A) National Statistics Survey Organization\n(B) National Sample Survey Office ✅\n(C) National Statistical Standards Organization\n(D) National Survey and Statistics Office\n\n**Q2:** Which sampling method gives every member an equal probability of selection?\n(A) Stratified Sampling\n(B) Simple Random Sampling ✅\n(C) Cluster Sampling\n(D) Systematic Sampling\n\n**Q3:** What is the Consumer Price Index (CPI) a measure of?\n(A) Industrial production\n(B) Government spending\n(C) Price changes for household goods ✅\n(D) National income\n\nWant more questions? Go to the **Assessments** section for a full competency evaluation!`;
    }

    if (lastMessage.includes('progress') || lastMessage.includes('performance')) {
      const compList = ctx?.competencies || [];
      const avgScore = compList.length > 0 ? compList.reduce((acc, c) => acc + c.currentLevel, 0) / compList.length : 3.2;
      return `📊 **Your Learning Progress Summary**\n\nHello ${ctx?.name || 'there'}! Here's your current status:\n\n**Competency Overview:**\n- Average Score: ${(avgScore || 3.2).toFixed(1)}/5\n- Active Skill Gaps: ${ctx?.skillGaps?.length || 6}\n- Role: ${ctx?.role || 'Statistical Data Analyst'}\n\n**Recommendations:**\n${ctx?.skillGaps?.slice(0, 3).map((g, i) => `${i + 1}. Bridge ${g.competencyName} gap (${g.gap.toFixed(1)} points)`).join('\n') || '1. Python for Data Analysis\n2. Survey Sampling Fundamentals\n3. Data Visualization'}\n\nKeep up the momentum! Your consistent learning will improve your competency scores.`;
    }

    // Default response
    return `Hello${ctx?.name ? ` ${ctx.name}` : ''}! I'm your **StatIntel AI Assistant** 🤖\n\nI'm here to help you with your learning journey. I can help you with:\n\n- 📊 **Skill Analysis** - Understand your competency gaps\n- 📚 **Course Recommendations** - Find the right learning resources\n- 🎯 **Learning Path** - Plan your development journey\n- 💡 **Topic Explanations** - Learn official statistics concepts\n- 📝 **Practice Questions** - Test your knowledge\n\nTry asking me:\n- "What should I learn next?"\n- "Explain survey sampling"\n- "Recommend training for Python"\n- "Create 5 practice questions"`;
  }

  async generateRecommendations(input: RecommendationInput): Promise<RecommendationResult> {
    const { skillGaps, role, department } = input;

    const courseMap: Record<string, { title: string; reason: string; matchPercentage: number }> = {
      'Python': {
        title: 'Python for Data Analysis',
        reason: `Addresses your Python competency gap. This course covers data manipulation, statistical analysis, and visualization using Python libraries essential for ${role || 'data roles'}.`,
        matchPercentage: 92,
      },
      'SQL': {
        title: 'SQL for Statistical Databases',
        reason: 'Bridges your SQL gap with practical exercises on government statistical databases and large dataset queries.',
        matchPercentage: 88,
      },
      'Survey Design': {
        title: 'Survey Design and Methodology',
        reason: 'Covers questionnaire design, pilot testing, and implementation aligned with NSO standards.',
        matchPercentage: 90,
      },
      'Data Visualization': {
        title: 'Data Visualization using Power BI',
        reason: 'Develops your data visualization skills for communicating statistical insights to policymakers.',
        matchPercentage: 85,
      },
      'AI/ML': {
        title: 'Introduction to AI for Official Statistics',
        reason: `Introduces AI/ML applications in official statistics—a critical emerging skill for ${department || 'statistical departments'}.`,
        matchPercentage: 87,
      },
      'Sampling': {
        title: 'Survey Sampling Fundamentals',
        reason: 'Comprehensive coverage of probability sampling methods used in major national surveys.',
        matchPercentage: 93,
      },
    };

    const programmeMap: Record<string, { title: string; reason: string }> = {
      'Survey Design': {
        title: 'Advanced Survey Methodology',
        reason: 'Matches your Survey Design and Sampling competency gaps with hands-on fieldwork training.',
      },
      'Sampling': {
        title: 'Survey Sampling Methods Workshop',
        reason: 'Focuses on sampling techniques used in official surveys, directly addressing your Sampling gap.',
      },
      'Python': {
        title: 'Statistical Computing with Python',
        reason: 'Classroom programme on Python for official statistics workflows.',
      },
      'Data Visualization': {
        title: 'Data Communication for Statistics',
        reason: 'Covers effective data visualization and communication for official statistics.',
      },
      'AI/ML': {
        title: 'AI Applications in Official Statistics',
        reason: 'Explores AI/ML use cases in the NSO ecosystem, addressing emerging skill requirements.',
      },
    };

    const courses = skillGaps
      .slice(0, 5)
      .map(gap => courseMap[gap.competencyName] || {
        title: `${gap.competencyName} Fundamentals`,
        reason: `Addresses your ${gap.competencyName} competency gap of ${gap.gap.toFixed(1)} points.`,
        matchPercentage: 80,
      })
      .map((c, i) => ({ ...c, priority: i + 1 }));

    const programmes = skillGaps
      .slice(0, 3)
      .map(gap => programmeMap[gap.competencyName] || {
        title: `${gap.competencyName} Training Programme`,
        reason: `NSSTA programme targeting your ${gap.competencyName} skill gap.`,
      })
      .map((p, i) => ({ ...p, priority: i + 1 }));

    return { courses, programmes };
  }
}
