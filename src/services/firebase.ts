import { initializeApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAXZX2cU7cAw2MUv0BB8niwacoMnSkf944',
  authDomain: 'vitalpet-47764.firebaseapp.com',
  projectId: 'vitalpet-47764',
  storageBucket: 'vitalpet-47764.firebasestorage.app',
  messagingSenderId: '697021513628',
  appId: '1:697021513628:web:377f54802fee4d2b20d259',
};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

const auth: Auth = getAuth(app);

export { app, auth };
