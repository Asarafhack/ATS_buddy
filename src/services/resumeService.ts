import { collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { ResumeData } from '../types/resume';

export const saveResume = async (resume: Omit<ResumeData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'resumes'), {
      ...resume,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving resume:', error);
    throw error;
  }
};

export const getUserResumes = async (userId: string): Promise<ResumeData[]> => {
  try {
    const q = query(collection(db, 'resumes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as ResumeData[];
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw error;
  }
};

export const updateResume = async (resumeId: string, updates: Partial<ResumeData>): Promise<void> => {
  try {
    const resumeRef = doc(db, 'resumes', resumeId);
    await updateDoc(resumeRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
};

export const deleteResume = async (resumeId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'resumes', resumeId));
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw error;
  }
};