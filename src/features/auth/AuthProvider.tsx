import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import * as SecureStore from "expo-secure-store";

import { MOCK_MODE, MOCK_START_STATE } from "@/config/mock";

export type AuthStatus = "signed_out" | "onboarding" | "authenticated";

export interface AuthSession {
  accessToken: string;
  userId: string;
  onboardingComplete: boolean;
}

interface AuthContextValue {
  status: AuthStatus;
  isReady: boolean;
  isAuthenticated: boolean;
  session: AuthSession | null;
  setSession: (session: AuthSession) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  signOut: () => Promise<void>;
}

const SESSION_KEY = "1go.auth.session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function createMockSession(onboardingComplete: boolean): AuthSession {
  return {
    accessToken: "mock-access-token",
    userId: "mock-user-001",
    onboardingComplete,
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [session, setSessionState] = useState<AuthSession | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        /*
         * MOCK MODE
         *
         * During UI development, always start fresh from
         * MOCK_START_STATE on every app reload.
         *
         * This intentionally ignores any previously stored
         * SecureStore session.
         */
        if (MOCK_MODE) {
          const initialSession =
            MOCK_START_STATE === "signed_out"
              ? null
              : createMockSession(MOCK_START_STATE === "authenticated");

          if (mounted) {
            setSessionState(initialSession);
          }

          return;
        }

        /*
         * REAL AUTH MODE
         *
         * Once MOCK_MODE is false, restore the real persisted
         * authentication session from SecureStore.
         */
        const storedSession = await SecureStore.getItemAsync(SESSION_KEY);

        if (!storedSession) {
          if (mounted) {
            setSessionState(null);
          }

          return;
        }

        try {
          const parsed = JSON.parse(storedSession) as AuthSession;

          if (
            parsed &&
            typeof parsed.accessToken === "string" &&
            typeof parsed.userId === "string" &&
            typeof parsed.onboardingComplete === "boolean"
          ) {
            if (mounted) {
              setSessionState(parsed);
            }

            return;
          }
        } catch {
          await SecureStore.deleteItemAsync(SESSION_KEY);
        }

        if (mounted) {
          setSessionState(null);
        }
      } catch {
        if (!MOCK_MODE) {
          await SecureStore.deleteItemAsync(SESSION_KEY);
        }

        if (mounted) {
          setSessionState(null);
        }
      } finally {
        if (mounted) {
          setIsReady(true);
        }
      }
    }

    void initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Set a complete authentication session.
   *
   * In MOCK_MODE we keep the session in React state for the
   * current app run. In real mode it is persisted.
   */
  const setSession = useCallback(async (nextSession: AuthSession) => {
    if (!MOCK_MODE) {
      await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(nextSession));
    }

    setSessionState(nextSession);
  }, []);

  /*
   * Finish onboarding.
   *
   * This is what the Interests screen calls before navigating
   * to /rooms.
   */
  const completeOnboarding = useCallback(async () => {
    try {
      if (__DEV__) {
        console.log("[1Go Auth] completeOnboarding called.");
        console.log("[1Go Auth] Current session:", session);
        console.log("[1Go Auth] MOCK_MODE:", MOCK_MODE);
      }

      let updatedSession: AuthSession;

      /*
       * UI / MOCK MODE
       *
       * The app intentionally starts signed out during development,
       * so finishing onboarding needs to create the mock session.
       */
      if (!session) {
        if (!MOCK_MODE) {
          console.error(
            "[1Go Auth] Cannot complete onboarding: no active session.",
          );

          return;
        }

        updatedSession = createMockSession(true);

        if (__DEV__) {
          console.log("[1Go Auth] No session found in MOCK_MODE.");
          console.log("[1Go Auth] Creating mock authenticated session.");
        }
      } else {
        updatedSession = {
          ...session,
          onboardingComplete: true,
        };
      }

      /*
       * Only persist in real authentication mode.
       */
      if (!MOCK_MODE) {
        await SecureStore.setItemAsync(
          SESSION_KEY,
          JSON.stringify(updatedSession),
        );
      }

      setSessionState(updatedSession);

      if (__DEV__) {
        console.log("[1Go Auth] Onboarding completed successfully.");

        console.log("[1Go Auth] New session:", updatedSession);

        console.log("[1Go Auth] New status:", "authenticated");
      }
    } catch (error) {
      console.error("[1Go Auth] completeOnboarding failed:", error);

      throw error;
    }
  }, [session]);

  /*
   * Sign out.
   */
  const signOut = useCallback(async () => {
    if (!MOCK_MODE) {
      await SecureStore.deleteItemAsync(SESSION_KEY);
    }

    setSessionState(null);
  }, []);

  /*
   * Derive authentication status from the current session.
   */
  const status: AuthStatus = !session
    ? "signed_out"
    : session.onboardingComplete
      ? "authenticated"
      : "onboarding";

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      isReady,
      isAuthenticated: status === "authenticated",
      session,
      setSession,
      completeOnboarding,
      signOut,
    }),
    [status, isReady, session, setSession, completeOnboarding, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
