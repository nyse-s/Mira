import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
// import { firebaseAuth } from './firebase';

const SUPABASE_URL = 'https://bmqoevsenwoqllprjdma.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcW9ldnNlbndvcWxscHJqZG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDQ1MDksImV4cCI6MjA1ODY4MDUwOX0.gLvRFwd_51xULYkt5oBJ9pfyZBQSjHt1GzVGG8Z1Xyc';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: false,
        detectSessionInUrl: false,
    },
});

// firebaseAuth.onAuthStateChanged(async (user) => {
//     if (user) {
//         const token = await user.getIdToken(true);
//         const { error } = await supabaseClient.auth.setSession({
//             access_token: token,
//             refresh_token: '',
//         });
//         if (error) {
//             console.error('Supabase session error:', error.message);
//         }
//     } else {
//         await supabaseClient.auth.signOut();
//     }
// });
