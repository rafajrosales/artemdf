import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut as fbSignOut, 
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Designated administrator email for ArteMDF
export const PRIMARY_ADMIN_EMAIL = 'rafajrosales@gmail.com';

// Google OAuth scopes for Profile, Email, and Google Drive (Read-only)
export const GOOGLE_WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/drive.readonly',
];

// In-memory token caching per skill guidelines (never store in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
GOOGLE_WORKSPACE_SCOPES.forEach((scope) => googleProvider.addScope(scope));
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminEmail: string;
  accessToken: string | null;
  signInWithGoogle: () => Promise<boolean>;
  signOutUser: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
  getValidAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check if current user is the authorized administrator
  // Checks if the email matches rafajrosales@gmail.com (case insensitive)
  const isAdmin = Boolean(
    user?.email && user.email.toLowerCase().trim() === PRIMARY_ADMIN_EMAIL.toLowerCase()
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        cachedAccessToken = null;
        setAccessToken(null);
      } else if (cachedAccessToken) {
        setAccessToken(cachedAccessToken);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      setAuthError(null);
      isSigningIn = true;
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      if (credential?.accessToken) {
        cachedAccessToken = credential.accessToken;
        setAccessToken(credential.accessToken);
      }

      setUser(result.user);
      return true;
    } catch (err: any) {
      console.error('Error durante autenticación con Google:', err);
      // Helpful friendly message
      let msg = 'No se pudo completar la autenticación con Google.';
      if (err.code === 'auth/popup-closed-by-user') {
        msg = 'La ventana de inicio de sesión de Google se cerró antes de completar.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        msg = 'La solicitud de ventana emergente fue cancelada.';
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
      return false;
    } finally {
      isSigningIn = false;
    }
  };

  const signOutUser = async () => {
    try {
      await fbSignOut(auth);
      cachedAccessToken = null;
      setAccessToken(null);
      setUser(null);
      setAuthError(null);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  const clearAuthError = () => setAuthError(null);

  const getValidAccessToken = async (): Promise<string | null> => {
    return cachedAccessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        adminEmail: PRIMARY_ADMIN_EMAIL,
        accessToken,
        signInWithGoogle,
        signOutUser,
        authError,
        clearAuthError,
        getValidAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
