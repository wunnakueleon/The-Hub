import { Navigate } from "react-router-dom";
import { ROUTES } from "../lib/constants";
import { useAuth } from "../features/auth/hooks/useAuth";
import { ProfileForm } from "../features/profile/components/ProfileForm";
import { SectionTitle } from "../components/ui";

export default function ProfilePage() {
  const { isAuthed, user } = useAuth();

  if (!isAuthed || !user) {
    return <Navigate to={ROUTES.login} replace state={{ from: ROUTES.profile }} />;
  }

  return (
    <div className="site-container max-w-[920px] py-12 pb-24">
      <SectionTitle
        eyebrow="Your account"
        title="Profile"
        subtitle="This is what other attendees see when they look at who's coming."
      />
      <ProfileForm user={user} />
    </div>
  );
}
