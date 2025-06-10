import { useAuth } from '../contexts/AuthContext';
import { User } from '../models/User';

export const useProfileViewModel = () => {
    const { supabaseUser } = useAuth();

    const getProfileInfo = (): Pick<User, 'avatarurl' | 'displayname'> | null => {
        if (!supabaseUser) {return null;}
        return {
            avatarurl: supabaseUser.avatarurl || '',
            displayname: supabaseUser.displayname || '',
        };
    };
    return {
        getProfileInfo,
    };
};
