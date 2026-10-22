"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import { AuthUser } from "@/lib/types";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isFirebaseReady: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemo: (customName?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_STORAGE_KEY = "remontada_demo_user";

function getInitialUser(): { user: AuthUser | null; isDone: boolean } {
  if (typeof window === "undefined") {
    return { user: null, isDone: false };
  }
  const savedDemoUser = localStorage.getItem(DEMO_USER_STORAGE_KEY);
  if (savedDemoUser) {
    try {
      const parsed = JSON.parse(savedDemoUser);
      return { user: parsed, isDone: true };
    } catch {
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    }
  }
  return { user: null, isDone: false };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getInitialUser().user);
  const [loading, setLoading] = useState<boolean>(() => !getInitialUser().isDone);
  const [isFirebaseReady] = useState<boolean>(() => isFirebaseConfigured());

  useEffect(() => {
    // Subscribe to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
          photoURL: fbUser.photoURL || null,
          isDemo: false,
        });
      } else {
        const currentDemo = typeof window !== "undefined" ? localStorage.getItem(DEMO_USER_STORAGE_KEY) : null;
        if (currentDemo) {
          try {
            setUser(JSON.parse(currentDemo));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || cred.user.email?.split("@")[0] || "User",
        photoURL: cred.user.photoURL,
        isDemo: false,
      });
    } catch (err: unknown) {
      setLoading(false);
      throw err;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name?: string) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name && cred.user) {
        await updateProfile(cred.user, { displayName: name });
      }
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: name || cred.user.email?.split("@")[0] || "User",
        photoURL: cred.user.photoURL,
        isDemo: false,
      });
    } catch (err: unknown) {
      setLoading(false);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
      setUser({
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || "Google User",
        photoURL: cred.user.photoURL,
        isDemo: false,
      });
    } catch (err: unknown) {
      setLoading(false);
      throw err;
    }
  };

  const loginAsDemo = (customName?: string) => {
    const demoUser: AuthUser = {
      uid: "demo-user-12345",
      email: "demo@remontada.io",
      displayName: customName || "Alex Rivera (Demo)",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isDemo: true,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
    }
    setUser(demoUser);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    }
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn("Firebase sign out warning", e);
    }
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseReady,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
