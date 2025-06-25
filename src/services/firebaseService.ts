import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Resume {
  id?: string;
  userId: string;
  title: string;
  content: string;
  jobDescription: string;
  analysisData: any;
  createdAt: Date;
  updatedAt: Date;
}

export const saveResume = async (resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) => {
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

export const getUserResumes = async (userId: string): Promise<Resume[]> => {
  try {
    const q = query(collection(db, 'resumes'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Resume[];
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw error;
  }
};

export const updateResume = async (resumeId: string, updates: Partial<Resume>) => {
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