import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { firebaseAuth } from '../services/firebase';
import { getUserById } from '../services/UserService';
import { User } from '../models/User';

type AuthContextType = {
    firebaseUser: FirebaseUser | null;
    supabaseUser: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUserFromDb: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubsrcribe = onAuthStateChanged(firebaseAuth, async (user) => {
            setFirebaseUser(user);
            if (user) {
                try {
                    const profile = await getUserById(user.uid);
                    setSupabaseUser(profile);
                } catch {
                    setSupabaseUser(null);
                }
            } else {
                setSupabaseUser(null);
            }
            setLoading(false);
        });
        return () => unsubsrcribe();
    }, []);

    const logout = async () => {
        await signOut(firebaseAuth);
        setFirebaseUser(null);
        setSupabaseUser(null);
    };

    const refreshUserFromDb = async () => {
        if (firebaseUser) {
            const updated = await getUserById(firebaseUser.uid);
            setSupabaseUser(updated);
        }
    };

    return (
        <AuthContext.Provider value={{ firebaseUser, supabaseUser, isAuthenticated: !!firebaseUser, loading, logout, refreshUserFromDb }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
