// Entry route: sends logged-in users to the dashboard, everyone else to the welcome screen.
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { getToken } from "../../lib/auth";

export default function Index() {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    getToken().then(setToken).catch(() => setToken(null));
  }, []);

  if (token === undefined) return null; // still reading the stored token

  return <Redirect href={token ? "/dashboard" : "/welcome"} />;
}
