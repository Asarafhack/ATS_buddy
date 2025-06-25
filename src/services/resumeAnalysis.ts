// Mock ATS analysis service - In a real app, this would call an AI API
export const analyzeResume = async (resumeText: string, jobDescription: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Extract keywords from job description (simplified)
  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);
  
  const missingKeywords = jobKeywords.filter(keyword => 
    !resumeKeywords.some(rk => rk.toLowerCase().includes(keyword.toLowerCase()))
  );

  // Calculate ATS score
  const atsScore = Math.max(20, Math.min(95, 
    Math.round(((jobKeywords.length - missingKeywords.length) / jobKeywords.length) * 100)
  ));

  return {
    missingKeywords: missingKeywords.slice(0, 12),
    rewrittenBullets: generateImprovedBullets(resumeText),
    professionalSummary: generateProfessionalSummary(jobDescription),
    resumeStructure: [
      'Professional Summary',
      'Core Competencies',
      'Professional Experience',
      'Technical Skills',
      'Education',
      'Certifications',
      'Awards & Achievements'
    ],
    finalResume: generateFinalResume(resumeText, jobDescription),
    recommendations: [
      'Add quantifiable metrics to your achievements (e.g., "increased sales by 25%")',
      'Include industry-specific certifications relevant to the role',
      'Optimize your LinkedIn profile to match your resume keywords'
    ],
    atsScore
  };
};

const extractKeywords = (text: string): string[] => {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must']);
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index)
    .slice(0, 20);
};

const generateImprovedBullets = (resumeText: string) => {
  const bullets = resumeText
    .split('\n')
    .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
    .slice(0, 3);

  return bullets.map(bullet => ({
    original: bullet.trim(),
    improved: improveBulletPoint(bullet.trim())
  }));
};

const improveBulletPoint = (bullet: string): string => {
  const cleaned = bullet.replace(/^[•\-\*]\s*/, '');
  
  // Add action verbs and quantifiable results
  const actionVerbs = ['Spearheaded', 'Orchestrated', 'Optimized', 'Delivered', 'Achieved', 'Implemented'];
  const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
  
  if (!cleaned.match(/\d+%|\d+\$|\d+/)) {
    return `${randomVerb} ${cleaned.toLowerCase()}, resulting in 25% improved efficiency and enhanced team productivity`;
  }
  
  return `${randomVerb} ${cleaned.toLowerCase()}, exceeding targets and delivering measurable business impact`;
};

const generateProfessionalSummary = (jobDescription: string): string => {
  const skills = extractKeywords(jobDescription).slice(0, 5);
  
  return `Results-driven professional with proven expertise in ${skills.slice(0, 3).join(', ')} and ${skills.slice(3).join(', ')}. Demonstrated track record of delivering exceptional results through strategic planning, cross-functional collaboration, and innovative problem-solving. Seeking to leverage comprehensive skill set and passion for excellence to drive meaningful impact in a dynamic, growth-oriented organization.`;
};

const generateFinalResume = (resumeText: string, jobDescription: string): string => {
  const keywords = extractKeywords(jobDescription);
  const summary = generateProfessionalSummary(jobDescription);
  
  return `PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
• ${keywords.slice(0, 8).join(' • ')}

PROFESSIONAL EXPERIENCE
[Your experience sections here with improved bullet points]

TECHNICAL SKILLS
• ${keywords.filter(k => k.includes('tech') || k.includes('software') || k.includes('system')).join(' • ')}

EDUCATION
[Your education details]

CERTIFICATIONS
[Relevant certifications]

Note: This is a template structure. Please replace placeholders with your actual experience and details.`;
};