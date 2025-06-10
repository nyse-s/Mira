import { useState } from 'react';
import { sendResetPasswordEmail, changeEmailWithVerification, logout } from '../services/AuthService';
import { updateUser } from '../services/UserService';
import { useAuth } from '../contexts/AuthContext';
import { uploadToSupabase, getSignedUrl } from '../services/storageService';

export const useUserManagementViewModel = () => {
    const { supabaseUser, refreshUserFromDb } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async ({
        username,
        avatarLocalUri,
    }: { username?: string; avatarLocalUri?: string }) => {
        if (!supabaseUser) { return; }
        setLoading(true);
        setError(null);

        let updates: any = {};
        try {
            if (username) {
                updates.displayname = username;
            }

            if (avatarLocalUri) {
                const extension = avatarLocalUri.split('.').pop() || 'jpg';
                const path = `${supabaseUser.id}_${Date.now()}.${extension}`;
                await uploadToSupabase('avatars', path, avatarLocalUri, `image/${extension}`);
                const signedUrl = await getSignedUrl('avatars', path);
                updates.avatarurl = signedUrl;
            }

            if (Object.keys(updates).length === 0) {
                throw new Error('No changes to update.');
            }

            const user = await updateUser(supabaseUser.id, updates);
            if (!user) {throw new Error('Failed to update profile.');}

            await refreshUserFromDb();

            return true;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleChangeEmail = async (newEmail: string) => {
        setLoading(true);
        try {
            await changeEmailWithVerification(newEmail);
            if (supabaseUser) {
                await updateUser(supabaseUser.id, {email: newEmail});
                await refreshUserFromDb();
            }
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (email: string) => {
        setLoading(true);
        try {
            await sendResetPasswordEmail(email);
            await logout();
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        updateProfile,
        handleChangeEmail,
        handlePasswordReset,
        setError,
    };
};
