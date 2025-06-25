import { ResumeData, ATSAnalysis } from '../types/resume';

const COMMON_ATS_KEYWORDS = [
  'leadership', 'management', 'communication', 'teamwork', 'problem-solving',
  'analytical', 'strategic', 'innovative', 'results-driven', 'collaborative',
  'project management', 'data analysis', 'customer service', 'sales',
  'marketing', 'technical', 'software', 'programming', 'development'
];

const TECHNICAL_KEYWORDS = [
  'javascript', 'python', 'java', 'react', 'node.js', 'sql', 'aws',
  'docker', 'kubernetes', 'git', 'agile', 'scrum', 'ci/cd', 'api',
  'database', 'cloud', 'machine learning', 'ai', 'data science'
];

export const analyzeResumeATS = async (resume: ResumeData, jobDescription: string): Promise<ATSAnalysis> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const resumeText = extractResumeText(resume).toLowerCase();
  const jobDescLower = jobDescription.toLowerCase();

  // Extract keywords from job description
  const jobKeywords = extractKeywordsFromText(jobDescLower);
  const resumeKeywords = extractKeywordsFromText(resumeText);

  // Find missing keywords
  const missingKeywords = jobKeywords.filter(keyword => 
    !resumeKeywords.some(rk => rk.includes(keyword) || keyword.includes(rk))
  );

  // Calculate ATS score
  const matchedKeywords = jobKeywords.length - missingKeywords.length;
  const keywordScore = (matchedKeywords / Math.max(jobKeywords.length, 1)) * 100;
  
  // Additional scoring factors
  const hasQuantifiableResults = /\d+%|\$\d+|\d+\+/.test(resumeText);
  const hasActionVerbs = checkActionVerbs(resumeText);
  const hasRelevantSkills = checkRelevantSkills(resume, jobDescLower);
  
  let finalScore = keywordScore;
  if (hasQuantifiableResults) finalScore += 10;
  if (hasActionVerbs) finalScore += 10;
  if (hasRelevantSkills) finalScore += 10;
  
  finalScore = Math.min(95, Math.max(25, Math.round(finalScore)));

  const suggestions = generateSuggestions(resume, jobDescription, missingKeywords);
  const strengths = identifyStrengths(resume, resumeText);
  const improvements = generateImprovements(resume, missingKeywords);

  return {
    score: finalScore,
    missingKeywords: missingKeywords.slice(0, 15),
    suggestions,
    strengths,
    improvements
  };
};

const extractResumeText = (resume: ResumeData): string => {
  const parts = [
    resume.professionalSummary,
    ...resume.experience.flatMap(exp => exp.description),
    ...resume.skills.map(skill => skill.name),
    ...resume.projects.map(proj => proj.description),
    ...resume.certifications.map(cert => cert.name)
  ];
  
  return parts.join(' ');
};

const extractKeywordsFromText = (text: string): string[] => {
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
    'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 
    'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'
  ]);

  return text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index)
    .slice(0, 30);
};

const checkActionVerbs = (text: string): boolean => {
  const actionVerbs = [
    'achieved', 'managed', 'led', 'developed', 'implemented', 'created',
    'improved', 'increased', 'reduced', 'optimized', 'delivered', 'executed'
  ];
  
  return actionVerbs.some(verb => text.includes(verb));
};

const checkRelevantSkills = (resume: ResumeData, jobDesc: string): boolean => {
  const resumeSkills = resume.skills.map(skill => skill.name.toLowerCase());
  return resumeSkills.some(skill => jobDesc.includes(skill));
};

const generateSuggestions = (resume: ResumeData, jobDesc: string, missingKeywords: string[]): string[] => {
  const suggestions = [];
  
  if (missingKeywords.length > 10) {
    suggestions.push('Add more relevant keywords from the job description to your experience and skills sections');
  }
  
  if (resume.experience.length === 0) {
    suggestions.push('Add professional experience with quantifiable achievements');
  }
  
  if (resume.skills.length < 5) {
    suggestions.push('Include more technical and soft skills relevant to the position');
  }
  
  if (!resume.professionalSummary || resume.professionalSummary.length < 100) {
    suggestions.push('Write a compelling professional summary that highlights your key qualifications');
  }
  
  suggestions.push('Use action verbs to start your bullet points (e.g., "Achieved", "Managed", "Led")');
  suggestions.push('Include quantifiable results and metrics in your experience descriptions');
  
  return suggestions;
};

const identifyStrengths = (resume: ResumeData, resumeText: string): string[] => {
  const strengths = [];
  
  if (resume.experience.length >= 3) {
    strengths.push('Strong professional experience background');
  }
  
  if (resume.skills.length >= 8) {
    strengths.push('Comprehensive skill set');
  }
  
  if (resume.certifications.length > 0) {
    strengths.push('Professional certifications demonstrate commitment to growth');
  }
  
  if (resume.projects.length > 0) {
    strengths.push('Project experience shows practical application of skills');
  }
  
  if (/\d+%|\$\d+|\d+\+/.test(resumeText)) {
    strengths.push('Quantifiable achievements and results');
  }
  
  return strengths;
};

const generateImprovements = (resume: ResumeData, missingKeywords: string[]): string[] => {
  const improvements = [];
  
  if (missingKeywords.length > 0) {
    improvements.push(`Incorporate these missing keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
  }
  
  if (resume.experience.some(exp => exp.description.length < 2)) {
    improvements.push('Expand experience descriptions with more detailed accomplishments');
  }
  
  if (!resume.personalInfo.linkedin) {
    improvements.push('Add LinkedIn profile URL to increase professional credibility');
  }
  
  improvements.push('Tailor your professional summary to match the specific job requirements');
  improvements.push('Use industry-specific terminology and buzzwords from the job posting');
  
  return improvements;
};