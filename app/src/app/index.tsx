// Entry route: for now it only redirects to the welcome screen.
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/welcome" />;
}
