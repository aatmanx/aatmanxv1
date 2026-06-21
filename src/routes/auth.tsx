import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ location }) => {
    const next = new URLSearchParams(location.search).get("next") || "/dashboard";
    const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
    throw redirect({ to: "/login", search: { next: safeNext } });
  },
  component: () => null,
});
