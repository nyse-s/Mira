import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCUqc9S_MU2XB_EtZFR9LKohyrtlHBgRuk',
    authDomain: 'com.mira',
    projectId: 'mira-5129f',
    storageBucket: 'mira-5129f.firebasestorage.app',
    messagingSenderId: '805834771609',
    appId: '1:805834771609:android:0c9c81b1811e94c476bc08',
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export { firebaseAuth };
