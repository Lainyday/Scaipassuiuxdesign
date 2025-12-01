import { db, auth } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface ChatSession {
    id: string;
    title: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    userId: string;
    firstMessage?: string;
}

/**
 * Create a new chat session
 */
export async function createNewSession(): Promise<string> {
    if (!auth.currentUser) {
        throw new Error('User not authenticated');
    }

    const sessionRef = await addDoc(collection(db, 'sessions'), {
        title: '새 채팅',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId: auth.currentUser.uid,
        firstMessage: ''
    });

    return sessionRef.id;
}

/**
 * Get all sessions for the current user
 */
export function subscribeToSessions(callback: (sessions: ChatSession[]) => void): () => void {
    if (!auth.currentUser) {
        console.warn('User not authenticated');
        return () => { };
    }

    const q = query(
        collection(db, 'sessions'),
        orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const sessions = snapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            } as ChatSession))
            .filter(session => session.userId === auth.currentUser?.uid);

        callback(sessions);
    });

    return unsubscribe;
}

/**
 * Update session title and timestamp
 */
export async function updateSessionTitle(sessionId: string, title: string): Promise<void> {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
        title,
        updatedAt: serverTimestamp()
    });
}

/**
 * Update session's first message (for preview)
 */
export async function updateSessionFirstMessage(sessionId: string, firstMessage: string): Promise<void> {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
        firstMessage,
        updatedAt: serverTimestamp()
    });
}

/**
 * Generate a title from the first user message
 */
export function generateTitleFromMessage(message: string): string {
    // Take first 30 characters or up to first line break
    const title = message.split('\n')[0].substring(0, 30);
    return title.length < message.length ? title + '...' : title;
}
