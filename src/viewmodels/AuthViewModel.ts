import { signUp, signIn, logout } from '../services/AuthService';
import { createUser } from '../services/UserService';
import { User } from '../models/User';

export const handleSignUp = async (name: string, email: string, password: string) => {
    try {
        const userCredential = await signUp(email, password);
        const { user } = userCredential;

        const userData: User = {
            id: user.uid,
            email: user.email ?? email,
            displayname: name,
            notificationsenabled: true,
        };

        const supabaseUser = await createUser(userData);

        if (!supabaseUser) {
            return { success: false, error: 'Failed to create user in Supabase.' };
        }

        return { success: true};
    } catch (error) {
        return { success: false, error };
    }
};

export const handleSignIn = async (email: string, password: string) => {
    try {
        await signIn(email, password);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};

export const handleLogout = async () => {
    await logout();
};
