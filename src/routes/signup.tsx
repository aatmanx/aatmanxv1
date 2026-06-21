import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  beforeLoad: ({ location }) => {
    const next = new URLSearchParams(location.search).get("next") || "/dashboard";
    const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
    // Sign up flow ALWAYS starts with the questionnaire; account creation
    // happens at the end of that flow.
    throw redirect({ to: "/questionnaire", search: { next: safeNext } });
  },
  component: () => null,
});
