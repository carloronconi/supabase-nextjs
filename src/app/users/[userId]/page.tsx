import verifyLoggedUser from "@/app/auth/util/verify-logged-user";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AvatarPreview from "../avatar-preview";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  await verifyLoggedUser();
  const supabase = await createClient();
  const username = userId?.trim();

  if (!username) {
    notFound();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(`full_name, username, website, avatar_url`)
    .eq("username", username)
    .single();

  if (!profile) {
    notFound();
  }

  let avatarSrc: string | null = null;
  if (profile.avatar_url) {
    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(profile.avatar_url, 60 * 60);
    if (!error) {
      avatarSrc = data?.signedUrl ?? null;
    }
  }

  return (
    <section className="page-section">
      <div className="surface-card profile-card">
        <AvatarPreview
          src={avatarSrc}
          size={140}
          alt={profile.full_name || profile.username || "User avatar"}
        />
        <div className="profile-details">
          <p className="eyebrow">Profile</p>
          <h2>{profile.full_name || profile.username}</h2>
          <p>@{profile.username}</p>
          {profile.website ? (
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="website-chip"
            >
              {profile.website}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
