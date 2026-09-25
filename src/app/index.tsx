import { Redirect } from "expo-router";

import { useAuth } from "@/features/auth/AuthProvider";

export default function Index() {
  const { isReady, status } = useAuth();

  if (!isReady) {
    return null;
  }

  if (status === "signed_out") {
    return <Redirect href="/welcome" />;
  }

  if (status === "onboarding") {
    return <Redirect href="/onboarding/name" />;
  }

  return <Redirect href="/rooms" />;
}
