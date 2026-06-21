import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthForm } from "@/components/auth/AuthForm";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — aatman" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <AuthForm
      mode="forgot"
      footer={
        <div className="text-center text-xs text-muted-foreground">
          remember it?{" "}
          <Link to="/login" className="text-foreground underline-offset-2 hover:underline">
            sign in
          </Link>
        </div>
      }
    />
  );
}
