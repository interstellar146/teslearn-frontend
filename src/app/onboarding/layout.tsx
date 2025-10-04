// This layout now simply passes through the children, as the new onboarding page has its own full-page design.
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

