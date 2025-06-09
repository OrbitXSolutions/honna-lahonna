import AuthTemplate from "@/components/templates/auth-template";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthTemplate>{children}</AuthTemplate>
    </>
  );
}
